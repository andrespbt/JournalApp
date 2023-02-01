import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async dispatch => {
    dispatch(checkingCredentials(email, password));
  };
};

export const startGoogleSignIn = () => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = user => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage, displayName, email } = await loginWithEmailPassword(user);

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogOut = () => {
  return async dispatch => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
