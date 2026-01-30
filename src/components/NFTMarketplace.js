import { Connection, clusterApiUrl, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export default function NFTMarketplace() {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const treasuryWallet = new PublicKey("TREASURY_WALLET_ADDRESS");
  const feeRate = 0.05;

  const nfts = [
    { id: 1, name: "NFT Rumah", price: 2, owner: "SELLER_WALLET_ADDRESS" },
    { id: 2, name: "NFT Seni", price: 1.5, owner: "SELLER_WALLET_ADDRESS" },
  ];

  async function handleBuy(nft) {
    if (!publicKey) {
      alert("Connect wallet dulu!");
      return;
    }
    const fee = nft.price * feeRate;
    const sellerAmount = nft.price - fee;

    try {
      const txSeller = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(nft.owner),
          lamports: sellerAmount * 1e9,
        })
      );
      await sendTransaction(txSeller, connection);

      const txFee = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryWallet,
          lamports: fee * 1e9,
        })
      );
      await sendTransaction(txFee, connection);

      alert(`Transaksi sukses!\nSeller menerima ${sellerAmount} SOL\nDev menerima fee ${fee} SOL`);
    } catch (err) {
      console.error(err);
      alert("Transaksi gagal.");
    }
  }

  return (
    <section className="px-6 py-12 text-center">
      <h3 className="text-2xl font-bold mb-6">NFT Marketplace</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-gray-800 p-6 rounded shadow">
            <h4 className="text-lg font-semibold mb-2">{nft.name}</h4>
            <p className="text-gray-400">Harga: {nft.price} SOL</p>
            <button onClick={() => handleBuy(nft)} className="bg-green-500 px-6 py-2 rounded text-white hover:bg-green-600 mt-4">
              Beli NFT
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
