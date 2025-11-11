import { Transaction } from "@mysten/sui/transactions";

export const battle = (packageId: string, heroId: string, arenaId: string) => {
  const tx = new Transaction();
  
  // Add moveCall to start a battle
  tx.moveCall({
    target: `${packageId}::arena::battle`,
    typeArguments: [],
    arguments: [tx.object(heroId), tx.object(arenaId)],
  });
  
  return tx;
};
