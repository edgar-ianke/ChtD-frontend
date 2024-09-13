import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { TEditProfile, TSignIn, TSignUp, TUserState } from "../../types/types";
import { editProfileApi, getUserInfo, loginUser, registerUser } from "../../utils/api";

const initState: TUserState = {
  editProfileVisible: false,
  logedIn: null,
  info: {
    id: null,
    createdAt: null,
    username: null,
    email: null,
    about: null,
    avatar: null,
  },
};

export const signup = createAsyncThunk("user/signup", async (signUpData: TSignUp) => {
  await registerUser(signUpData);
  return await getUserInfo();
});

export const signin = createAsyncThunk("user/signin", async (signInData: TSignIn) => {
  await loginUser(signInData);
  return await getUserInfo();
});

export const auth = createAsyncThunk("user/auth", async () => {
  if (localStorage.getItem("access_token")) {
    return await getUserInfo();
  } else {
    return Promise.reject();
  }
});

export const editProfile = createAsyncThunk("user/editProfile", async (data: TEditProfile) => {
  return await editProfileApi(data);
});

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.logedIn = false;
      state.info = initState.info;
    },
    setEditVisible: (state) => {
      state.editProfileVisible = true;
    },
    closeEditModal: (state) => {
      state.editProfileVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.logedIn = true;
      state.info = { ...state.info, ...payload };
    });
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.logedIn = true;
      state.info = { ...state.info, ...payload };
    });
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.logedIn = true;
      state.info = { ...state.info, ...payload };
    });
    builder.addCase(auth.rejected, (state) => {
      state.logedIn = false;
    });
    builder.addCase(editProfile.fulfilled, (state, { payload }) => {
      state.info = { ...state.info, ...payload };
    });
  },
});
export const { setEditVisible, closeEditModal, logout } = userSlice.actions;
export default userSlice.reducer;
