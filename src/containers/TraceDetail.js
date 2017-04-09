import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as traceActions from '../redux/actions/trace';
import SpanRow from '../components/SpanRow';

const mapStateToProps = (state) => ({
  trace: state.traces.activeTrace,
});

const mapDispatchToProps = (dispatch) => {
  return {
    traceActions: bindActionCreators(traceActions, dispatch),
  };
};

export class TraceDetail extends Component {
  componentDidMount = () => {
    this.props.traceActions.fetchTrace(this.props.params.id);
  }

  render() {
    if (this.props.trace) {
      return (
        <div>
          <div style={{display: 'inline-block', width: '25%', verticalAlign: 'top', lineHeight: '25px'}}>
            {this.props.trace.spans.map((s, i) => <div>{s.hostname}</div>)}
          </div>
          <div style={{display: 'inline-block', width: '75%'}}>
            <svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
              {this.props.trace.spans.map((s, i) => <SpanRow id={i} events={s.events} traceStartTimestamp={this.props.trace.startTimestamp} />)}
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TraceDetail);
