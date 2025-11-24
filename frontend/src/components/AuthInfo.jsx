import React from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";

const AuthInfo = observer(() => (
  <div>
    {authStore.isLoggedIn ? (
      <div>
        Welcome, {authStore.user?.name}
        <button onClick={() => authStore.logout()}>Logout</button>
      </div>
    ) : (
      <button onClick={() => authStore.login()}>Login</button>
    )}
  </div>
));

export default AuthInfo;
