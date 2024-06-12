import { useEffect, useState } from "react";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function BalanceCard() {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/accounts/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance.toFixed(2));
      });
  }, []);

  return (
    <div className="font-semibold flex items-center gap-4 mt-10 mx-10">
      Your balance: Rs {balance}
    </div>
  );
}
