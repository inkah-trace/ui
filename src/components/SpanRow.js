import React, { Component } from 'react';

export class SpanRow extends Component {
  findEndEvent = (i, event_type) => {
    let endEvent;
    for (var j=i; j < this.props.events.length; j++) {
      const e2 = this.props.events[j];
      if (e2.eventType === event_type) {
        return endEvent = e2;
      }
    }
  }

  render() {


    return (
      <g>
        {
          this.props.events.map((e, i) => {
            console.log(e.spanId, e.eventType);
            if (e.eventType === 0) { // SPAN_BEGIN
              const endEvent = this.findEndEvent(i, 1);
              const duration = endEvent.timestamp - e.timestamp;
              const offset = e.timestamp - this.props.traceStartTimestamp;
              return (
                <rect x={10 * offset} y={25 * this.props.id} width={10 * duration} height="10" stroke="blue" fill="blue" strokeWidth="0" />
              )
            } else if (e.eventType === 2) { // REQUEST_BEGIN
              const endEvent = this.findEndEvent(i, 3);
              const duration = endEvent.timestamp - e.timestamp;
              const offset = e.timestamp - this.props.traceStartTimestamp;
              return (
                <rect x={10 * offset} y={25 * this.props.id} width={10 * duration} height="10" stroke="blue" fill="green" strokeWidth="0" />
              )
            }
          })
        }
      </g>
    );
  }
};

export default SpanRow;
