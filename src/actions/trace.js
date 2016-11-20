export const FETCH_TRACE_LIST = 'FETCH_TRACE_LIST';
export const UPDATE_TRACE_LIST = 'UPDATE_TRACE_LIST';
export const SELECT_TRACE = 'SELECT_TRACE'

export function fetchTraceList() {
  const query = `
  {
    traces {
      id
      start
      end
      spans {
        id
        programName
        hostname
        start
        end
      }
    }
  }
  `;

  return {
    type: FETCH_TRACE_LIST,
    meta: {
      query: query,
      success: setTraceList,
    }
  };
}

function setTraceList(traces) {
  return {
    type: UPDATE_TRACE_LIST,
    payload: {
      traces: traces.traces,
    }
  };
}

export function selectTrace(traceId) {
  return {
    type: SELECT_TRACE,
    payload: {
      traceId: traceId,
    }
  };
}
