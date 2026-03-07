import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/api'

interface AuthState {
  user: any | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean 
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'api/auth/login',
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', data)

      localStorage.setItem('token', response.data.token)

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      )
    }
  }
)

export const register = createAsyncThunk(
  'api/auth/register',
  async (
    data: {name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await api.post('/auth/register', data)

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registered Failed'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token')
        state.user = null
        state.token = null
        state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending , (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled , (state , action) => {
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected , (state , action: any) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(register.pending , (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(register.rejected , (state , action: any) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logOut } = authSlice.actions
export default authSlice.reducer