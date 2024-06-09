/* eslint-disable react/prop-types */
export default function BalanceCard({ balance }) {
  return (
    <div className="font-semibold flex items-center gap-4 mt-10 mx-10">
      Your balance: Rs {balance}
    </div>
  );
}
