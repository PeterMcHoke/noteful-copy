import React, { Component } from 'react';

export default class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(err) {
        console.log(err);
        return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return (
          <h4 style={{color: "red"}}>Could not display this information.</h4>
        );
      }
      return this.props.children;
    }
}
