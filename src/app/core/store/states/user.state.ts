export interface UserState {
  userName: string;
  fullName: string;
  emailId: string;
  role: string;
  photoURL: string;
}

export const initialUserState: UserState = {
  userName: null,
  fullName: null,
  emailId: null,
  role: null,
  photoURL: null,
};
