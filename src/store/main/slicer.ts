import { createSlice, current } from '@reduxjs/toolkit';
import { AppDispatch, api } from "..";

const initialState = {
  authed: false,
  userName: '',
  organizations: [],
  contacts: [],
  request: {
    status: 0,
    error: null
  }
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, { payload }) =>  {
      state.authed = true;
      state.userName = payload;
      state.request.status = 2;
    },
    setOrganizations: (state, { payload }) => {
      state.organizations = [payload];
      state.request.status = 2;
    },
    setContact: (state, { payload }) =>  {
      state.contacts = [payload];
      state.request.status = 2;
    },
    pending: (state) => {
      state.request.status = 1;
    },
    loaded: (state) => {
      state.request.status = 2;
    },
    failure: (state) => {
      state.request.status = 3;
    },
    clearState: (state) => {
      state.authed = false;
      state.userName = '';
      state.organizations = [];
      state.contacts = [];
      state.request.status = 0;
      state.request.error = null;
    }
  }
});

const { setUser, setOrganizations, setContact, pending, loaded, failure, clearState } = mainSlice.actions
export default mainSlice.reducer

export const initUser = (name:string) => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.getUser();
    //console.log(res);
    if(!!res) dispatch(setUser(name));
    else dispatch(loaded());
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const initOrganizations = () => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.getOrganization();
    //console.log(res);
    if(!!res) dispatch(setOrganizations(res));
    else dispatch(loaded());
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const updateOrganizations = (obj:Object) => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.patchOrganization(obj);
    //console.log(res);
    if(!!res) dispatch(setOrganizations(res));
    else dispatch(loaded());
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const delOrganization = () => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.deleteOrganization();
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const initContact = (id:number) => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.getContact(id);
    //console.log(res);
    if(!!res) dispatch(setContact(res));
    else dispatch(loaded());
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const updateContact = (id:number, obj:Object) => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.patchContact(id, obj);
    //console.log(res);
    if(!!res) dispatch(setContact(res));
    else dispatch(loaded());
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const delImage = (name:string) => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await api.deletePhoto(name);
    dispatch(loaded());
  }catch(err) {
    //console.log(err);
    dispatch(failure());
  }
}

export const clear = () => async (dispatch:AppDispatch) => {
  dispatch(clearState());
}
