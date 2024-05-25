import { useAtom } from "jotai";
import { AccountAtom } from "../../store/account";

export function Account(): JSX.Element {
  const [account] = useAtom(AccountAtom);

  return <div>{account && `Connected account: ${account}`}</div>;
}
