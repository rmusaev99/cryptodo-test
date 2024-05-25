import { PropsWithChildren, useMemo } from "react";
import { BrowserProvider, getDefaultProvider } from "ethers";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { Web3Context } from ".";

export function Web3Provider({ children }: PropsWithChildren): JSX.Element {
  const provider = useMemo(() => {
    if (!window.ethereum) {
      return getDefaultProvider();
    }
    return new BrowserProvider(window.ethereum);
  }, []);

  return (
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
        logging: {
          developerMode: true,
        },
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Demo React App",
          url: window.location.host,
        },
      }}
    >
      <Web3Context.Provider value={{ provider }}>
        {children}
      </Web3Context.Provider>
    </MetaMaskProvider>
  );
}
