import { makeAutoObservable } from 'mobx';

type UserDataParameters = {
  isSignIn: boolean;
  email: string | null;
  name: string | null;
  id: string | null;
};

class UserState {
  userStateData: UserDataParameters = {
    isSignIn: false,
    email: null,
    name: null,
    id: null,
  };

  constructor() {
    makeAutoObservable(this);
    if (
      localStorage.email !== undefined &&
      localStorage.name !== undefined &&
      localStorage.id !== undefined
    ) {
      this.userStateData.isSignIn = true;
      this.userStateData.email = localStorage.getItem('email');
      this.userStateData.name = localStorage.getItem('name');
      this.userStateData.id = localStorage.getItem('id');
    }
  }

  setStateUser(email: string, name: string, id: string) {
    !!email && localStorage.setItem('email', email);
    !!name && localStorage.setItem('name', name);
    !!id && localStorage.setItem('id', id);
    this.userStateData.isSignIn = true;
    this.userStateData.email = email;
    this.userStateData.name = name;
    this.userStateData.id = id;
  }

  removeStateUser() {
    localStorage.clear();
    this.userStateData.isSignIn = false;
    this.userStateData.email = null;
    this.userStateData.name = null;
    this.userStateData.id = null;
  }
}

export default new UserState();
