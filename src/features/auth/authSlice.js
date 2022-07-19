import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authServices from '../../services/authService'

export const registerUser = createAsyncThunk('auth/registerUser', async (user, thunkAPI) => {
    try {
        return await authServices.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async(user, thunkAPI) => {
    try {
        return await authServices.login(user)
    } catch (error) {
        const message = (error.message && error.response && error.response.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logoutUser = createAsyncThunk('auth/logout', async() => {
    return authServices.logout()
})

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        reset:(state, action) => {
            state.user = null
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ''
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.user = null
            state.message = action.payload
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.user = null
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer