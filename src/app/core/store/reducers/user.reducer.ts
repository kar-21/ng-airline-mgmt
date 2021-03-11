import { initialUserState, UserState } from "../states/user.state";
import { UserAction, EUserAction } from "../actions/user.action";

export const UserReducer = (
  state = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case EUserAction.SaveUserInfo:
      return {
        ...state,
        userName: action.payload.userName,
        role: action.payload.role,
      };
    case EUserAction.GetUserInfoSuccess:
      return {
        ...state,
        fullName: action.payload.fullName,
        emailId: action.payload.emailId,
        photoURL: action.payload.photoURL,
      };
    default:
      return { ...state };
  }
};
