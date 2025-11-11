import { Transaction } from "@mysten/sui/transactions";

export const buyHero = (packageId: string, listHeroId: string, priceInSui: string) => {
  const tx = new Transaction();
  
  // TODO: Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
  // Convert SUI (human) to MIST (on-chain smallest unit)
  // Note: using Number() here; for large values consider BigInt string inputs
  const priceInMist = BigInt(Math.round(Number(priceInSui) * 1_000_000_000));
  // Split coin for exact payment from gas coin
  // tx.splitCoins accepts expressions, so wrap priceInMist in tx.pure.u64
  const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(priceInMist)]);

  // Add moveCall to buy a hero
  // Function: `${packageId}::marketplace::buy_hero`
  // Arguments: listHeroId (object), paymentCoin (coin)
  tx.moveCall({
    target: `${packageId}::marketplace::buy_hero`,
    typeArguments: [],
    arguments: [
      tx.object(listHeroId),
      paymentCoin,
    ],
  });
    
  return tx;
};
