/* eslint-disable react/prop-types */
export default function SearchBar({ setFilter }) {
  return (
    <div className="mt-10 mx-10">
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <input
          onChange={(e) => setFilter(e.target.value)}
          className="p-4 mt-4 border border-gray-200 foucs: outline-none w-full rounded shadow-xl"
          type="search"
          name=""
          id=""
          placeholder="Search for Users...."
        />
      </div>
    </div>
  );
}
