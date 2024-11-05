import { atom, useAtom } from "jotai";

export interface LoginState {
  token: string;
  loggedIn: boolean;
  email: string;
}

const loginStateAtom = atom({
  token: "",
  loggedIn: false,
  email: "",
});

export default function useLoginState() {
  const [loginState, setLoginState] = useAtom(loginStateAtom);

  const updateLoginState = (newLoginState: LoginState) => {
    setLoginState(newLoginState);
  };

  return { loginState, updateLoginState };
}
