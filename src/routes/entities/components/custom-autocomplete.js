import React from 'react';
import scrollIntoView from 'dom-scroll-into-view'
import { TextField } from 'material-ui';

let _debugStates = []

export default  React.createClass({

  propTypes: {
    initialValue: React.PropTypes.any,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    shouldItemRender: React.PropTypes.func,
    renderItem: React.PropTypes.func.isRequired,
    menuStyle: React.PropTypes.object,
    inputProps: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      inputProps: {},
      onChange () {},
      onSelect (value, item) {},
      renderMenu (items, value, style) {
        return <div style={{...style, ...this.menuStyle}} children={items}/>
      },
      shouldItemRender () { return true },
      menuStyle: {
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '90%',
        position: 'fixed',
        overflow: 'auto',
        maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
        zIndex: '1'
      }
    }
  },

  getInitialState () {
    return {
      value: this.props.initialValue || '',
      isOpen: false,
      highlightedIndex: null,
    }
  },

  componentWillMount () {
    this._ignoreBlur = false
    this._performAutoCompleteOnUpdate = false
    this._performAutoCompleteOnKeyUp = false
  },

  componentWillReceiveProps () {
    this._performAutoCompleteOnUpdate = true
  },

  componentDidUpdate (prevProps, prevState) {
    if (this.state.isOpen === true && prevState.isOpen === false)
      this.setMenuPositions()

    if (this.state.isOpen && this._performAutoCompleteOnUpdate) {
      this._performAutoCompleteOnUpdate = false
      this.maybeAutoCompleteText()
    }

    this.maybeScrollItemIntoView()
  },

  maybeScrollItemIntoView () {
    if (this.state.isOpen === true && this.state.highlightedIndex !== null) {
      var itemNode = this.refs[`item-${this.state.highlightedIndex}`]
      var menuNode = this.refs.menu
      scrollIntoView(itemNode, menuNode, { onlyScrollIfNeeded: true })
    }
  },

  handleKeyDown (event) {
    if (this.keyDownHandlers[event.key])
      this.keyDownHandlers[event.key].call(this, event)
    else {
      this.setState({
        highlightedIndex: null,
        isOpen: true
      })
    }
  },

  handleChange (event) {
    this._performAutoCompleteOnKeyUp = true
    this.setState({
      value: event.target.value,
    }, () => {
      this.props.onChange(event, this.state.value)
    })
  },

  handleKeyUp () {
    if (this._performAutoCompleteOnKeyUp) {
      this._performAutoCompleteOnKeyUp = false
      this.maybeAutoCompleteText()
    }
  },

  keyDownHandlers: {
    ArrowDown (event) {
      event.preventDefault()
      var { highlightedIndex } = this.state
      var index = (
        highlightedIndex === null ||
        highlightedIndex === this.getFilteredItems().length - 1
      ) ?  0 : highlightedIndex + 1
      this._performAutoCompleteOnKeyUp = true
      this.setState({
        highlightedIndex: index,
        isOpen: true,
      })
    },

    ArrowUp (event) {
      event.preventDefault()
      var { highlightedIndex } = this.state
      var index = (
        highlightedIndex === 0 ||
        highlightedIndex === null
      ) ? this.getFilteredItems().length - 1 : highlightedIndex - 1
      this._performAutoCompleteOnKeyUp = true
      this.setState({
        highlightedIndex: index,
        isOpen: true,
      })
    },

    Enter (event) {
      if (this.state.isOpen === false) {
        // already selected this, do nothing
        return
      }
      else if (this.state.highlightedIndex == null) {
        // hit enter after focus but before typing anything so no autocomplete attempt yet
        this.setState({
          isOpen: false
        }, () => {
          this.refs.input.select()
        })
      }
      else {
        var item = this.getFilteredItems()[this.state.highlightedIndex]
        this.setState({
          value: this.props.getItemValue(item),
          isOpen: false,
          highlightedIndex: null
        }, () => {
          //this.refs.input.focus() // TODO: file issue
          this.refs.input.setSelectionRange(
            this.state.value.length,
            this.state.value.length
          )
          this.props.onSelect(this.state.value, item)
        })
      }
    },

    Escape (event) {
      this.setState({
        highlightedIndex: null,
        isOpen: false
      })
    }
  },

  getFilteredItems () {
    let items = this.props.items

    if (this.props.shouldItemRender) {
      items = items.filter((item) => (
        this.props.shouldItemRender(item, this.state.value)
      ))
    }

    if (this.props.sortItems) {
      items.sort((a, b) => (
        this.props.sortItems(a, b, this.state.value)
      ))
    }

    return items
  },

  maybeAutoCompleteText () {
    if (this.state.value === '')
      return
    var { highlightedIndex } = this.state
    var items = this.getFilteredItems()
    if (items.length === 0)
      return
    var matchedItem = highlightedIndex !== null ?
      items[highlightedIndex] : items[0]
    var itemValue = this.props.getItemValue(matchedItem)
    var itemValueDoesMatch = (itemValue.toLowerCase().indexOf(
      this.state.value.toLowerCase()
    ) === 0)
    if (itemValueDoesMatch) {
      var node = this.refs.input
      var setSelection = () => {
        node.value = itemValue
        node.setSelectionRange(this.state.value.length, itemValue.length)
      }
      if (highlightedIndex === null)
        this.setState({ highlightedIndex: 0 }, setSelection)
      else
        setSelection()
    }
  },

  setMenuPositions () {
    var node = this.refs.input
    var rect = node.getBoundingClientRect()
    var computedStyle = getComputedStyle(node)
    var marginBottom = parseInt(computedStyle.marginBottom, 10)
    var marginLeft = parseInt(computedStyle.marginLeft, 10)
    var marginRight = parseInt(computedStyle.marginRight, 10)
    this.setState({
      menuTop: rect.bottom + marginBottom,
      menuLeft: rect.left + marginLeft,
      menuWidth: rect.width + marginLeft + marginRight
    })
  },

  highlightItemFromMouse (index) {
    this.setState({ highlightedIndex: index })
  },

  selectItemFromMouse (item) {
    this.setState({
      value: this.props.getItemValue(item),
      isOpen: false,
      highlightedIndex: null
    }, () => {
      this.props.onSelect(this.state.value, item)
      this.refs.input.focus()
      this.setIgnoreBlur(false)
    })
  },

  setIgnoreBlur (ignore) {
    this._ignoreBlur = ignore
  },

  renderMenu () {
    var renderedItems = this.getFilteredItems().map((item, index) => {
      var element = this.props.renderItem(
        item,
        this.state.highlightedIndex === index,
        {cursor: 'default'}
      )
      return React.cloneElement(element, {
        onMouseDown: () => this.setIgnoreBlur(true),
        onMouseEnter: () => this.highlightItemFromMouse(index),
        onClick: () => this.selectItemFromMouse(item),
        ref: `item-${index}`,
      })
    })
    var style = {
      left: this.state.menuLeft,
      top: this.state.menuTop,
      minWidth: this.state.menuWidth,
    }
    var menu = this.props.renderMenu(renderedItems, this.getFilteredItems(), this.state.value, style)
    return React.cloneElement(menu, { ref: 'menu' })
  },

  handleInputBlur () {
    if (this._ignoreBlur)
      return
    this.setState({
      isOpen: false,
      highlightedIndex: null
    })
  },

  handleInputFocus () {
    if (this._ignoreBlur)
      return
    this.setState({ isOpen: true })
  },

  handleInputClick () {
    if (this.state.isOpen === false)
      this.setState({ isOpen: true })
  },

  render () {
    if (this.props.debug) { // you don't like it, you love it
      _debugStates.push({
        id: _debugStates.length,
        state: this.state
      })
    }
    let materialUiStyles = {
      container: {
        fontSize: "16px",
        lineHeight: "24px",
        width: "256px",
        height: "72px",
        display: "inline-block",
        position: "relative",
        backgroundColor: "transparent",
        fontFamily: "Roboto, sans-serif",
        transition: "height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
      },
      input: {
        WebkitTapHighlightColor: "rgba(0,0,0,0)",
        padding: "0",
        position: "relative",
        width: "100%",
        height: "100%",
        border: "none",
        outline: "none",
        backgroundColor: "rgba(0,0,0,0)",
        color: "rgba(0, 0, 0, 0.87)",
        font: "inherit",
        boxSizing: "border-box",
        marginTop: "14px"
      },
      bottomBorder: {
        top: {
          border: "none",
          borderBottom: "solid 1px",
          borderColor: "#e0e0e0",
          bottom: "8px",
          boxSizing: "content-box",
          margin: "0",
          position: "absolute",
          width: "100%"
        },
        bottom: {
          borderStyle: "none none solid",
          borderBottomWidth: "2px",
          borderColor: "rgb(0, 188, 212)",
          bottom: "8px",
          boxSizing: "content-box",
          margin: "0px",
          position: "absolute",
          width: "100%",
          transform: "scaleX(0)",
          transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
        }
      }
    }
    return (
      <div style={ materialUiStyles.container }>
        <input
          {...this.props.inputProps}
          role="combobox"
          aria-autocomplete="both"
          ref="input"
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={(event) => this.handleChange(event)}
          onKeyDown={(event) => this.handleKeyDown(event)}
          onKeyUp={(event) => this.handleKeyUp(event)}
          onClick={this.handleInputClick}
          value={this.state.value}
          style = { materialUiStyles.input }
        />
        <div>
          <hr style= { materialUiStyles.bottomBorder.top }/>
          <hr style= { materialUiStyles.bottomBorder.bottom }/>
        </div>
        {this.state.isOpen && this.renderMenu()}
        {this.props.debug && (
          <pre style={{marginLeft: 300}}>
            {JSON.stringify(_debugStates.slice(_debugStates.length - 5, _debugStates.length), null, 2)}
          </pre>
        )}
      </div>
    )
  }
})

// export default Autocomplete