import { initialUserState, UserState } from "../states/user.state";
import { UserAction, EUserAction } from "../actions/user.action";

export const UserReducer = (
  state = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case EUserAction.SaveUserInfo:
      console.log("store >>", {
        ...state,
        userName: action.payload.userName,
        role: action.payload.role,
      });
      return {
        ...state,
        userName: action.payload.userName,
        role: action.payload.role,
      };
    default:
      return { ...state };
  }
};
