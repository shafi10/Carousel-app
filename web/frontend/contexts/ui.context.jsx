import React from "react";

const initialState = {
  shop: {},
  toast: {
    active: false,
    message: "",
  },
};

export const UIContext = React.createContext(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state, action) {
  switch (action.type) {
    case "SET_SHOP": {
      return {
        ...state,
        shop: action.payload,
      };
    }

    case "TOGGLE_TOAST": {
      return {
        ...state,
        toast: {
          ...state.toast,
          active: action.payload.active,
          message: action.payload.message,
        },
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setShop = (payload) => dispatch({ type: "SET_SHOP", payload });
  const setToggleToast = (payload) =>
    dispatch({ type: "TOGGLE_TOAST", payload });

  const value = React.useMemo(
    () => ({
      ...state,
      setShop,
      setToggleToast,
    }),
    [state]
  );
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
