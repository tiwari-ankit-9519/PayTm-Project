import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UsersCard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/bulk?filter=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [filter]);

  return (
    <>
      <SearchBar setFilter={setFilter} />
      <div className="flex flex-col gap-2 p-5 mx-10 border border-gray-200 mt-10 rounded shadow-xl min-h-96">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center border border-gray-200 font-medium p-4 rounded justify-between"
          >
            <div className="flex items-center gap-5">
              <span className="flex justify-center font-bold items-center rounded-full h-10 w-10 bg-gray-200">
                {user.firstName.slice(0, 1)}
              </span>
              {user.firstName} {user.lastName}
            </div>
            <button
              onClick={() => {
                navigate(`/transfer?id=${user._id}&name=${user.firstName}`);
              }}
              className="px-4 py-2 bg-gray-800 rounded-lg text-white"
            >
              Send Money
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
