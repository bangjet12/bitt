import { useState } from "react";

export default function GovernanceVoting() {
  const [proposals, setProposals] = useState([
    { id: 1, title: "Upgrade Staking Reward", votesYes: 0, votesNo: 0 },
    { id: 2, title: "Launch NFT Marketplace", votesYes: 0, votesNo: 0 },
  ]);

  const votingFee = 0.05;

  function handleVote(proposalId, choice) {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId
          ? {
              ...p,
              votesYes: choice === "yes" ? p.votesYes + 1 : p.votesYes,
              votesNo: choice === "no" ? p.votesNo + 1 : p.votesNo,
            }
          : p
      )
    );
    alert(`Vote berhasil!\nAnda membayar fee ${votingFee} SOL.\nFee masuk ke treasury dev.`);
  }

  return (
    <section className="px-6 py-12 text-center">
      <h3 className="text-2xl font-bold mb-6">Governance Voting</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proposals
