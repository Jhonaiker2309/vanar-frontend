interface Web3State {
    networkId: number | null;
    account: string | null;
  }
  

  type Web3Action =
  | { type: "SET_ACCOUNT"; payload: string }
  | { type: "SET_NETWORK_ID"; payload: number };
  
  export const Web3Reducer = (state: Web3State, action: Web3Action): Web3State => {
    switch (action.type) {
      case "SET_NETWORK_ID":
        return {
          ...state,
          networkId: action.payload,
        };
      case "SET_ACCOUNT":
        return {
          ...state,
          account: action.payload,
        };
      default:
        return state;
    }
  };
  