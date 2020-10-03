export interface User {
  _id: string;
  username: string;
  profilePath: string;
  bio: string;
}

export interface UserState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  user: User | null;
}

export enum UserGetters {
  getUser = "getUser"
}

export enum UserMutations {
  fetching = "fetching",
  success = "success",
  error = "error",
  setUser = "setUser"
}

export enum UserActions {
  fetchUser = "fetchUser",
  setFetching = "setFetching",
  setSuccess = "setSuccess",
  setError = "setError",
  updateProfile = "updateProfile"
}
