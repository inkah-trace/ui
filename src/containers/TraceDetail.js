import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as traceActions from '../actions/trace';
import SpanList from '../components/SpanList';

const mapStateToProps = (state) => ({
  traces: state.trace.traces,

});

const mapDispatchToProps = (dispatch) => {
  return {
    traceActions: bindActionCreators(traceActions, dispatch),
  };
};

class TraceDetail extends Component {
  componentDidMount = () => {
    this.props.traceActions.selectTrace(this.props.params.id);
  }

  render() {
    const selectedTrace = this.props.traces.find((t) => {
      return t.id === this.props.params.id;
    });

    return (
      <div>
        <SpanList
          trace={selectedTrace}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraceDetail);
