import BalanceCard from "./UI/BalanceCard";
import SearchBar from "./UI/SearchBar";
import UsersCard from "./UI/UsersCard";

export default function Dashboard() {
  return (
    <div>
      <BalanceCard balance="10000" />
      <SearchBar />
      <UsersCard />
    </div>
  );
}
