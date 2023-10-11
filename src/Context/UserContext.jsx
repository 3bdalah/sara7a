import { createContext, useState } from "react";

export const TokenUser = createContext();
// eslint-disable-next-line react/prop-types
function TokenUserProvider({ children }) {
  const [token, setToken] = useState(null);

  return (
    <TokenUser.Provider value={{ token, setToken }}>
      {children}
    </TokenUser.Provider>
  );
}

export default TokenUserProvider;
