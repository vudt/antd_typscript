export interface UserInfo {
  id: number,
  email: string,
  full_name: string,
  image: string,
  auth_token: string,
  role: number
}

export interface AuthState {
  isLogged: boolean,
  isLoading: boolean,
  userInfo: UserInfo,
  errorMessage: string
}