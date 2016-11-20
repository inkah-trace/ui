import * as actions from '../actions/trace';

const traceInitialState = {
  traces: [],
  selectedTrace: null,
};

const traceReducer = (state = traceInitialState, action) => {
  switch (action.type) {
    case actions.UPDATE_TRACE_LIST:
      return {
        ...state,
        traces: action.payload.traces,
      };
    case actions.SELECT_TRACE:
      return {
        ...state,
        selectedTrace: action.payload.traceId,
      };
    default:
      return state;
  }
};

export default traceReducer;
