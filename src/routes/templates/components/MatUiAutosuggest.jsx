import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import './MatUiAutosuggest.css';

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

const styles = theme => ({
  container: {
    // flexGrow: 1,
    position: 'relative',
    width: 400,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  menuItem: {
    height: 'inherit',
  }
});

class MatUiAutosuggest extends React.Component {
  state = {
    value: '',
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({value: newValue});
  };

  renderInput = (inputProps) => {
    const { classes, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
    );
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    // const matches = match(suggestion.label, query);
    // const parts = parse(suggestion.label, matches);

    return (
      <MenuItem
        selected={isHighlighted}
        component="div"
        className={this.props.classes.menuItem}
      >
        {this.props.renderMenuItem(suggestion)}
      </MenuItem>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={this.props.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.props.onSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={this.props.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          classes,
          placeholder: this.props.placeholder,
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

MatUiAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  // value: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]),
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  handleSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  renderMenuItem: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(MatUiAutosuggest);
