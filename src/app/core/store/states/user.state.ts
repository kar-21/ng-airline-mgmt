export interface UserState {
  userName: string;
  role: string;
}

export const initialUserState: UserState = {
  userName: null,
  role: null,
};
