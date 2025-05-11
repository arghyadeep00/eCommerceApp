import { createContext } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const backendUrl = "http://localhost:3001";
  const contextValue = {
    backendUrl,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
