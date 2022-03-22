import { createContext, useState } from "react";

const myStoreContext = createContext({
  user: {},
  setUser: () => {},

  whishList: {},
  setWhishList: () => {},

  cart: {},
  setCart: () => {},
});

export function MyStoreContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [whishList, setWhishList] = useState({});
  const [cart, setCart] = useState(0);
  const context = { user, setUser, whishList, setWhishList, cart, setCart };
  return (
    <myStoreContext.Provider value={context}>
      {children}
    </myStoreContext.Provider>
  );
}

export default myStoreContext;
