import { Connection, clusterApiUrl, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export default function PremiumNFTMintingTier() {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const treasuryWallet = new PublicKey("TREASURY_WALLET_ADDRESS");

  async function handleMint(price) {
    if (!publicKey) {
      alert("Connect wallet dulu!");
      return;
    }
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryWallet,
          lamports: price * 1e9,
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      alert(`Mint NFT berhasil! Dev menerima ${price} SOL`);
    } catch (err) {
      console.error(err);
      alert("Mint gagal. Pastikan saldo SOL cukup.");
    }
  }

  return (
    <section className="px-6 py-12 text-center">
      <h3 className="text-2xl font-bold mb-6">Premium NFT Minting</h3>
      <div className="space-x-4">
        <button onClick={() => handleMint(0.3)} className="bg-purple-600 px-4 py-2 rounded text-white">Mint Standard (0.3 SOL)</button>
        <button onClick={() => handleMint(0.5)} className="bg-blue-600 px-4 py-2 rounded text-white">Mint Rare (0.5 SOL)</button>
        <button onClick={() => handleMint(1)} className="bg-yellow-600 px-4 py-2 rounded text-white">Mint Legendary (1 SOL)</button>
      </div>
    </section>
  );
}
