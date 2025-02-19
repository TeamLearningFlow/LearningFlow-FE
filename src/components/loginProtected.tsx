import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../components/context/AuthContext';

const LoginProtected = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      router.replace('/login');
    }
  }, [auth, router]);

  return <>{children}</>;
};

export default LoginProtected;
