import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Inkah"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
