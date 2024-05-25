import { useState, useEffect, useContext, useMemo } from "react";
import { Contract } from "ethers/contract";
import { formatUnits } from "ethers/utils";
import { useSDK } from "@metamask/sdk-react";
import { Web3Context } from "../../providers/web3Provider";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const TOKEN_DECIMALS = Number(import.meta.env.VITE_TOKEN_DECIMALS);
const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export function ChainStats(): JSX.Element {
  const { chainId } = useSDK();
  const { provider } = useContext(Web3Context);
  const [totalSupply, setTotalSupply] = useState<string>();

  const contract = useMemo(() => {
    if (!provider || !CONTRACT_ADDRESS) return null;

    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }, [provider]);

  const fetchTotalSupply = async () => {
    if (!contract) return;

    try {
      const totalSupplyRaw = await contract.totalSupply();
      const totalSupply = formatUnits(totalSupplyRaw, TOKEN_DECIMALS);
      setTotalSupply(totalSupply);
    } catch (err) {
      console.error(`Failed to fetch totalSupply..`, err);
    }
  };

  useEffect(() => {
    fetchTotalSupply();
  }, [contract]);

  return (
    <div>
      {chainId && `Chain: ${chainId}`}
      <br />
      {totalSupply !== undefined && `Chain Total Supply: ${totalSupply}`}
    </div>
  );
}
