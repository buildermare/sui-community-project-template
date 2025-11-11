import { Transaction } from "@mysten/sui/transactions";

export const listHero = (
  packageId: string,
  heroId: string,
  priceInSui: string,
) => {
  const tx = new Transaction();

  // Convert SUI to MIST
  const priceInMist = BigInt(Math.round(Number(priceInSui) * 1_000_000_000));

  // Add moveCall to list a hero for sale
  tx.moveCall({
    target: `${packageId}::marketplace::list_hero`,
    typeArguments: [],
    arguments: [tx.object(heroId), tx.pure.u64(priceInMist)],
  });

  return tx;
};
