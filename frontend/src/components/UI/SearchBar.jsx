export default function SearchBar() {
  return (
    <div className="mt-10 mx-10 shadow-xl">
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <input
          className="p-4 mt-4 border border-gray-800 foucs: outline-none w-full"
          type="search"
          name=""
          id=""
          placeholder="Search for Users...."
        />
      </div>
    </div>
  );
}
