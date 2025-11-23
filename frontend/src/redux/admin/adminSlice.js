import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const getToken = () => localStorage.getItem("userToken") || "";

export const fetchUsers = createAsyncThunk('admin/fetechUsers', async (_, { rejectedWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/users`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectedWithValue(error.response.data);
    }
});

export const createUser = createAsyncThunk('admin/createUser', async (userData, { rejectedWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/users`, userData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectedWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, username, email, role }, { rejectedWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/users/${id}`, { username, email, role }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data.user;
    } catch (error) {
        return rejectedWithValue(error.response.data);
    }
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, { rejectedWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return id;
    } catch (error) {
        return rejectedWithValue(error.response.data);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch users";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const userIndex = state.users.findIndex(user => user._id === updatedUser._id);
                if (userIndex !== -1) {
                    state.users[userIndex] = updatedUser;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add user";
            });
    }
});
export default adminSlice.reducer;