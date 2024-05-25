import { Provider } from "ethers/providers";
import { createContext } from "react";

type Web3Context = {
  provider?: Provider | null;
};

export const Web3Context = createContext<Web3Context>({});
