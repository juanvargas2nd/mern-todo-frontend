import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskServices from "../../services/taskServices";

export const getTask = createAsyncThunk("task/getTask", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskServices.getTasks(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.data.response.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postTask = createAsyncThunk(
  "task/postTask",
  async (task, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskServices.createTask(task, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.data.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "task/deleteTask",
  async (task, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskServices.deleteTask(task, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.data.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (task, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskServices.updateTask(task, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.data.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  toggleModal: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    reset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.toggleModal = false;
    },
    openModal: (state, action) => {
      state.toggleModal = true;
    },
    closeModal: (state, action) => {
      state.toggleModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(postTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTasks.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = state.tasks.filter(task => task._id !== action.payload)
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        const updatedTask = { ...state.tasks[index], isCompleted: !state.tasks[index].isCompleted };
        state.tasks[index] = updatedTask
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  },
});

export const { reset, openModal, closeModal } = taskSlice.actions;
export default taskSlice.reducer;
