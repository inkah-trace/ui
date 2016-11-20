import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as traceActions from '../actions/trace';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const mapStateToProps = (state) => ({
  traces: state.trace.traces,
});

const mapDispatchToProps = (dispatch) => {
  return {
    traceActions: bindActionCreators(traceActions, dispatch),
  };
};

class TraceList extends Component {
  componentDidMount = () => {
    this.props.traceActions.fetchTraceList();
  }

  render() {
    return (
      <Table
        selectable={false}
        multiSelectable={false}
        >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          >
          <TableRow>
            <TableHeaderColumn>Trace</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.traces.map((t) => {
            return (
              <TableRow key={t.id}>
                <TableRowColumn>
                  <Link to={{
                    pathname: `/trace/${t.id}`,
                    }}>
                    {t.id}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  {t.end - t.start}{'s'}
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraceList);
