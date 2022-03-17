import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, AuthState } from "../interfaces/auth";
import authApi from "../api/auth";

export const userLogin = createAsyncThunk(
  'user/login', 
  async(params: any, thunkApi) => {
    const response = await authApi.userLogin(params)
    if (response.status == true) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async(_, thunkApi) => {
    const response = await authApi.refreshToken()
    if (response.status == true) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response)
    }
  }
)

export const userLogOut = createAsyncThunk(
  'user/logout',
  async(_, thunkApi) => {
    const response = await authApi.userLogout()
    if (response.status == true) {
      return true
    } else {
      return thunkApi.rejectWithValue(response)
    }
  }
)

const initialState: AuthState = {
  isLogged: false,
  isLoading: false,
  userInfo: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.errorMessage = null
      state.isLoading = false
      state.isLogged = false
      state.userInfo = null
      return state
    },
    login: (state) => {
      console.log('login here')
      const userData: UserInfo = {
        id: 74,
        email: "danny@main.com",
        full_name: "Danny",
        image: 'https://corecmms.com/system/admin/photos/images/000/000/727/original/yonggui.jpg',
        auth_token: 'sdadasd',
        role: 4
      }
      state.isLogged = true
      state.userInfo = userData
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true
    }),
    builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      console.log(state)
      console.log(action)
      state.isLoading = false
      state.isLogged = true
      state.userInfo = action.payload
      localStorage.setItem('user_token', action.payload.auth_token)
    }),
    builder.addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
      console.log(state)
      console.log(action)
      console.log('failed')
      state.isLoading = false
      state.errorMessage = action.payload.message
    }),
    builder.addCase(refreshToken.pending, (state, _) => {
      state.isLoading = true 
    }),
    builder.addCase(refreshToken.fulfilled, (state, {payload}: PayloadAction<UserInfo>) => {
      state.isLoading = false
      state.isLogged = true
      state.userInfo = payload
      localStorage.setItem('user_token', payload.auth_token)
    }),
    builder.addCase(refreshToken.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
      localStorage.removeItem('user_token')
    }),
    builder.addCase(userLogOut.pending, (state, _) => {
      state.isLoading = true
    }),
    builder.addCase(userLogOut.fulfilled, (state, _) => {
      state.errorMessage = null
      state.isLoading = false
      state.isLogged = false
      state.userInfo = null
      localStorage.removeItem('user_token')
    }),
    builder.addCase(userLogOut.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })
  }
})

// Action creators are generated for each case reducer function
export const { login, clearState } = authSlice.actions

export default authSlice.reducer