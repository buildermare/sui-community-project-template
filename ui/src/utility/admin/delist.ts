import { Transaction } from "@mysten/sui/transactions";

export const delist = (
  packageId: string,
  listHeroId: string,
  adminCapId: string,
) => {
  const tx = new Transaction();

  // Add moveCall to delist a hero (Admin only)
  tx.moveCall({
    target: `${packageId}::marketplace::delist`,
    typeArguments: [],
    arguments: [tx.object(adminCapId), tx.object(listHeroId)],
  });

  return tx;
};
