import React, { Component } from 'react';

export class StandardLayout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default StandardLayout;
