interface Web3State {
    networkId: number | null;
    account: string | null;
    contract: any;
  }
  

  type Web3Action =
  | { type: "SET_ACCOUNT"; payload: string }
  | { type: "SET_NETWORK_ID"; payload: number }
  | { type: "SET_CONTRACT"; payload: any };
  
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
      case "SET_CONTRACT":
        return {
          ...state,
          contract: action.payload,
        }; 
      default:
        return state;
    }
  };
  