import { useSDK } from "@metamask/sdk-react";
import { AccountAtom } from "../../store/account";
import { useAtom } from "jotai";

export function ConnectButton(): JSX.Element {
  const [, setAccount] = useAtom(AccountAtom);

  const { sdk, connected } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`Failed to connect..`, err);
    }
  };

  return (
    <button style={{ padding: 10, margin: 10 }} onClick={connect}>
      {connected ? "Connected" : "Connect"}
    </button>
  );
}
