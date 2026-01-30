import { useState } from "react";

export default function StakingPool() {
  const [stakers, setStakers] = useState([
    { wallet: "User1Wallet", staked: 100, reward: 0 },
    { wallet: "User2Wallet", staked: 200, reward: 0 },
  ]);

  const feeRate = 0.05;
  const rewardRate = 0.1;

  function distributeRewards() {
    let devTotalFee = 0;
    const updated = stakers.map((s) => {
      const totalReward = s.staked * rewardRate;
      const devFee = totalReward * feeRate;
      const userReward = totalReward - devFee;
      devTotalFee += devFee;
      return { ...s, reward: s.reward + userReward };
    });
    setStakers(updated);
    alert(`Reward dibagikan!\nDeveloper mendapat fee ${devTotalFee.toFixed(2)} SOL`);
  }

  return (
    <section className="px-6 py-12 text-center">
      <h3 className="text-2xl font-bold mb-6">Staking Pool Management</h3>
      <button onClick={distributeRewards} className="bg-yellow-500 px-6 py-2 rounded text-white hover:bg-yellow-600">
        Distribute Rewards
      </button>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {stakers.map((s, idx) => (
          <div key={idx} className="bg-gray-800 p-6 rounded shadow">
            <h4 className="text-lg font-semibold mb-2">{s.wallet}</h4>
            <p className="text-gray-400">Staked: {s.staked} NSOL</p>
            <p className="text-green-300">Reward: {s.reward.toFixed(2)} SOL</p>
          </div>
        ))}
      </div>
    </section>
  );
}
