import React from 'react';
import {
  RaisedButton,
  Card, CardHeader, CardText, CardMedia, TextField, Toolbar, ToolbarTitle, ToolbarGroup
} from 'material-ui';

export default React.createClass({

  render: function () {

    let styles = {
      container: {
        width: "90%",
        marginLeft: "5%"
      },
      header: {
        fontSize: "20px",
        margin: "10px"
      }
    }

    return (
      <div style = { styles.container }>
        <Card>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text = "Introduction" />
            </ToolbarGroup>
          </Toolbar>
          <CardText>
            <TextField multiLine = { true } floatingLabelText = { "Introduction" } fullWidth = { true }/>
          </CardText>
        </Card>
        <Card>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text = "AEX Chromatograpy Module" />
            </ToolbarGroup>
          </Toolbar>
          <div style = { { padding: "20px" } }>
            <Card>
              <CardHeader title = "General Information" />
              <CardText>
                <TextField floatingLabelText = { "Alias" }/><br/>
                <TextField floatingLabelText = { "Date Run" }/><br/>
                <TextField floatingLabelText = { "System" }/><br/>
                <TextField floatingLabelText = { "Column" }/><br/>
              </CardText>
            </Card>
          </div>
          <div style = { { padding: "20px" } }>
            <Card>
              <CardHeader title = "Buffer Information" />
              <CardMedia>
                  <table style = {{ margin: "20px" }}>
                    <thead>
                    <tr>
                      <th>Purpose</th>
                      <th>Barcode</th>
                      <th>Alias</th>
                      <th>pH</th>
                      <th>Conductivity (mS/cm)</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Eq/Wash</td>
                        <td><TextField name = "barcode1"/></td>
                        <td>20mM Tris pH 7.8</td>
                        <td>7.78</td>
                        <td>2.123</td>
                      </tr>
                      <tr>
                        <td>Strip 1</td>
                        <td><TextField name = "barcode2"/></td>
                        <td>2M NaCl</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>Strip 2</td>
                        <td><TextField name = "barcode3"/></td>
                        <td>1N NaOH</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                    </tbody>
                  </table>
              </CardMedia>
            </Card>
          </div>
        </Card>
      </div>
    )
  }
})
