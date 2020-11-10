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
      console.log(">> store", { ...state, airlineList: action.payload });
      return { ...state, airlineList: action.payload };
    case EPassangerAction.GetPassangersListOfFlightSuccess:
      console.log(">> store", {
        ...state,
        passangerList: {
          ...state.passangerList,
          [action.payload.flightNumber]: action.payload.data,
        },
      });
      return {
        ...state,
        passangerList: {
          ...state.passangerList,
          [action.payload.flightNumber]: action.payload.data,
        },
      };
    default:
      console.log(">>store", { ...state });
      return { ...state };
  }
};
