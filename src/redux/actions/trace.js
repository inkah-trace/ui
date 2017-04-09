export const FETCH_TRACES = 'FETCH_TRACES';
export const UPDATE_TRACES = 'UPDATE_TRACES';
export const FETCH_TRACE = 'FETCH_TRACE';
export const UPDATE_TRACE = 'UPDATE_TRACE';

export function fetchTraces() {
  return {
    type: FETCH_TRACES,
    meta: {
      endpoint: '/trace',
      success: updateTraces,
    },
  };
}

function updateTraces(traces) {
  return {
    type: UPDATE_TRACES,
    payload: {
      traces: traces,
    }
  };
}

export function fetchTrace(id) {
  return {
    type: FETCH_TRACE,
    meta: {
      endpoint: '/trace/' + id,
      success: updateTrace,
    },
  };
}

function updateTrace(trace) {
  return {
    type: UPDATE_TRACE,
    payload: {
      trace: trace,
    }
  };
}
