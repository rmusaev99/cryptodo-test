import { useSDK } from "@metamask/sdk-react";
import { ConnectButton } from "./components/connectButton/ConnectButton";
import { ChainStats } from "./components/chainStats/ChainStats";
import { Account } from "./components/account/Account";

export function App() {
  const { connected } = useSDK();

  return (
    <div>
      <ConnectButton />

      {connected && (
        <div>
          <Account />
          <ChainStats />
        </div>
      )}
    </div>
  );
}
