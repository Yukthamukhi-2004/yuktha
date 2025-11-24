import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }

  login() {
    // For a real app, you would implement a login API call here.
    this.isLoggedIn = true;
    this.user = { name: "User" }; // Or fill out actual user details if you have them
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
  }
}

export const authStore = new AuthStore();
