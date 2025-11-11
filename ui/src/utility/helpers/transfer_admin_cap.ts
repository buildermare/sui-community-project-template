import { Transaction } from "@mysten/sui/transactions";

export const transferAdminCap = (adminCapId: string, to: string) => {
  const tx = new Transaction();
  
  // Transfer admin capability object to recipient address
  tx.transferObjects([tx.object(adminCapId)], to);
  
  return tx;
};
