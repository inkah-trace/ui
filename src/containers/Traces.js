import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as traceActions from '../redux/actions/trace';

const mapStateToProps = (state) => ({
  traces: state.traces.traces,
  activeTrace: state.traces.activeTrace,
});

const mapDispatchToProps = (dispatch) => {
  return {
    traceActions: bindActionCreators(traceActions, dispatch),
  };
};

export class Traces extends Component {
  componentDidMount = () => {
    this.props.traceActions.fetchTraces();
  }

  render() {
    if (this.props.traces) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Trace ID</th>
                <th>Hostname</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.traces.map((t) => {
                  return (
                    <tr>
                      <td>
                        <Link to={"/trace/" + t.traceId}>
                          {t.traceId}
                        </Link>
                      </td>
                      <td>{t.hostname}</td>
                      <td>{t.timestamp}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Traces);
