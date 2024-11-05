// components/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLoginState from "../hooks/useLoginState";

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { loginState } = useLoginState();

    useEffect(() => {
      // Redirect to login if user is not authenticated
      if (!loginState.loggedIn) {
        router.push("/login");
      }
    }, [loginState, router]);

    return loginState ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
