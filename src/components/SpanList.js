import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class SpanList extends Component {
  renderSpan = (traceStart, span) => {
    const length = (span.end - span.start) + 1;
    const offset = (span.start - traceStart);
    return (
      <TableRow key={span.id}>
        <TableRowColumn>
          {span.programName}
        </TableRowColumn>
        <TableRowColumn>
          {span.hostname}
        </TableRowColumn>
        <TableRowColumn>
          <div style={{backgroundColor: "blue", height: "10px", width: (length * 10) + 'px', marginLeft: (offset * 10) + 'px'}} />
        </TableRowColumn>
        <TableRowColumn>
          {length}{'s'}
        </TableRowColumn>
      </TableRow>
    );
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
            <TableHeaderColumn>Service</TableHeaderColumn>
            <TableHeaderColumn>Hostname</TableHeaderColumn>
            <TableHeaderColumn>Timeline</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.trace.spans.map((s) => {
            return this.renderSpan(this.props.trace.start, s);
          })}
        </TableBody>
      </Table>
    );
  }
}
