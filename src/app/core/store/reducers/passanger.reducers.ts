import {
  EPassangerAction,
  PassangerActions,
} from "../actions/passanger.action";
import {
  initialPassangerState,
  PassangerState,
} from "../states/passanger.state";

export const PassangerReducer = (
  state = initialPassangerState,
  action: PassangerActions
): PassangerState => {
  switch (action.type) {
    case EPassangerAction.GetAirlineListSuccess:
      return { ...state, airlineList: action.payload };
    case EPassangerAction.GetPassangersListOfFlightSuccess:
      return {
        ...state,
        passangerList: {
          ...state.passangerList,
          [action.payload.flightNumber]: action.payload.data,
        },
      };
    default:
      return { ...state };
  }
};
