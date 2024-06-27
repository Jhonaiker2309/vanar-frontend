interface Web3State {
    networkId: number | null;
    account: string | null;
    contract: any;
    mintError: string | null;
    rouletteContract: any;
  }
  

  type Web3Action =
  | { type: "SET_ACCOUNT"; payload: string }
  | { type: "SET_NETWORK_ID"; payload: number }
  | { type: "SET_CONTRACT"; payload: any }
  | { type: "SET_MINT_ERROR"; payload: string }
  | { type: "SET_ROULETTE_CONTRACT"; payload: any }
  
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
        case "SET_ROULETTE_CONTRACT":
          return {
            ...state,
            rouletteContract: action.payload,
          };         
        case "SET_MINT_ERROR":
          return {
            ...state,
            mintError: action.payload,
          };         
      default:
        return state;
    }
  };
  