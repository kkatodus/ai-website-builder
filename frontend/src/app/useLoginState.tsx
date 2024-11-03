import { atom, useAtom } from "jotai";

export interface LoginState {
  token: string;
  loggedIn: boolean;
}

const loginStateAtom = atom({
  token: "",
  loggedIn: false,
});

export default function useLoginState() {
  const [loginState, setLoginState] = useAtom(loginStateAtom);

  const updateLoginState = (newLoginState: LoginState) => {
    setLoginState(newLoginState);
  };

  return { loginState, updateLoginState };
}
