import { Transaction } from "@mysten/sui/transactions";

export const changePrice = (packageId: string, listHeroId: string, newPriceInSui: string, adminCapId: string) => {
  const tx = new Transaction();
  
  // Convert SUI to MIST and call change_the_price
  const newPriceInMist = BigInt(Math.round(Number(newPriceInSui) * 1_000_000_000));

  tx.moveCall({
    target: `${packageId}::marketplace::change_the_price`,
    typeArguments: [],
    arguments: [tx.object(adminCapId), tx.object(listHeroId), tx.pure.u64(newPriceInMist)],
  });
  
  return tx;
};
