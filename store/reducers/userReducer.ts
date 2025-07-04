"use client";
import { createSlice } from "@reduxjs/toolkit";

export type userState = {
  accessToken: string | null;
  user: any;
  navigationBar: boolean;
  singleRecipient: any;
  signUpPayload: object | any;
  isRegistered: boolean;
  condominuimID: string;
  role: string | null;
  condomninuimDetail: any;
  reloadName: boolean;
  admin: any;
  singleCondominuim: any;
  adminSetting: any;
  isProof: boolean;
  userId: string | null;
  userHome: any
};

const initialState: userState = {
  accessToken: "",
  user: null,
  navigationBar: false,
  singleRecipient: null,
  signUpPayload: null,
  isRegistered: false,
  condominuimID: '',
  role: null,
  condomninuimDetail: null,
  reloadName: false,
  admin: null,
  singleCondominuim: null,
  adminSetting: null,
  isProof: false,
  userId: null,
  userHome: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => initialState,
    saveUserData: (state, action) => {
      state.user = action.payload;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setNavigatiponbar: (state, action) => {
      state.navigationBar = action.payload;
    },
    saveSingleRecipient: (state, action) => {
      state.singleRecipient = action.payload
    },
    saveSignUpPayload: (state, action) => {
      state.signUpPayload = action.payload
    },
    saveIsRegistered: (state, action) => {
      state.isRegistered = action.payload
    },
    saveIsCondominuim: (state, action) => {
      state.condominuimID = action.payload
    },
    saveUserRole: (state, action) => {
      state.role = action.payload
    },
    saveCondomninuim: (state, action) => {
      state.condomninuimDetail = action.payload
    },
    saveReload: (state, action) => {
      state.reloadName = action.payload
    },
    saveAdmin: (state, action) => {
      state.admin = action.payload
    },
    saveSingleCondominuim: (state, action) => {
      state.singleCondominuim = action.payload
    },
    saveAdminSetting: (state, action) => {
      state.adminSetting = action.payload
    },
    saveIsProof: (state, action) => {
      state.isProof = action.payload
    },
    saveUserId: (state, action) => {
      state.userId = action.payload
    },
    saveUserHomePage: (state, action) => {
      state.userHome = action.payload
    }
  },
});

export const {
  saveAccessToken,
  resetUserState,
  saveUserData,
  setNavigatiponbar,
  saveSingleRecipient,
  saveSignUpPayload,
  saveIsRegistered,
  saveIsCondominuim,
  saveUserRole,
  saveCondomninuim,
  saveReload,
  saveAdmin,
  saveSingleCondominuim,
  saveAdminSetting,
  saveIsProof,
  saveUserId,
  saveUserHomePage
} = userSlice.actions;

export default userSlice.reducer;
