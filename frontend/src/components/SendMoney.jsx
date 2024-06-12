import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col border border-gray-200 p-4 w-1/4">
        <h1 className="text-center mb-5 text-3xl">Send Money</h1>
        <div className="flex items-center gap-5">
          <span className="flex justify-center font-bold items-center rounded-full h-10 w-10 bg-green-400">
            {name[0]}
          </span>
          {name}
        </div>
        <input
          className="mt-5 p-2 border border-gray-200 focus: outline-none "
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
          name=""
          id=""
          placeholder="Enter the amount..."
        />
        <button
          className="bg-green-400 p-2 mt-5"
          onClick={() => {
            axios.post(
              "http://localhost:4000/api/v1/accounts/transfer",
              {
                to: id,
                amount,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
