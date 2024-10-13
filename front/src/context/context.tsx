import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: {
     children: React.ReactNode;
}) => {
     const [token, setToken] = useState(() => JSON.parse(localStorage.getItem('token') as string));

     useEffect(() => {
          const storedToken = JSON.parse(localStorage.getItem('token') as string);
          setToken(storedToken);
     }, []);

     return (
          <AuthContext.Provider value={token}>
               {children}
          </AuthContext.Provider>
     );
};

export const useAuth = () => {
     return useContext(AuthContext);
};
