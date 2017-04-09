import * as actions from '../actions/trace';

const traceInitialState = {
  traces: null,
  activeTrace: null,
};

const traceReducer = (state = traceInitialState, action) => {
  switch (action.type) {
    case actions.UPDATE_TRACES:
      return {
        ...state,
        traces: action.payload.traces,
      }
    case actions.UPDATE_TRACE:
      let trace = {
        spans: {},
        startTimestamp: null,
        endTimestamp: null,
      }
      action.payload.trace.map((e) => {
        if (e.spanId in trace.spans) {
          trace.spans[e.spanId].push(e);
        } else {
          trace.spans[e.spanId] = [e];
        }

        if (!trace.startTimestamp || e.timestamp < trace.startTimestamp) {
          trace.startTimestamp = e.timestamp;
        }

        if (!trace.endTimestamp || e.timestamp > trace.endTimestamp) {
          trace.endTimestamp = e.timestamp;
        }
      })

      let spansList = []
      for (var k in trace.spans) {
        let startTimestamp = null;
        let endTimestamp = null
        trace.spans[k].map((e) => {
          if (!startTimestamp || e.timestamp < startTimestamp) {
            startTimestamp = e.timestamp;
          }

          if (!endTimestamp || e.timestamp > endTimestamp) {
            endTimestamp = e.timestamp;
          }
        })

        const orderedEvents = trace.spans[k].sort((a, b) => a.timestamp - b.timestamp);

        spansList.push({
          spanId: k,
          startTimestamp: startTimestamp,
          endTimestamp: endTimestamp,
          events: orderedEvents,
        })
      }

      trace.spans = spansList;

      return {
        ...state,
        activeTrace: trace,
      }
    default:
      return state;
  }
};

export default traceReducer;
