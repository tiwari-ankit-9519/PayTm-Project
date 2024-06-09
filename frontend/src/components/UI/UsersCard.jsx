export default function UsersCard() {
  return (
    <div className="flex flex-col justify-between p-5 mx-10 border border-gray-200 mt-10 rounded gap-4 shadow-xl min-h-96">
      <div className="flex items-center gap-5 border border-gray-200 font-medium p-4 rounded justify-between">
        <div className="flex items-center gap-5">
          <span className="flex justify-center font-bold items-center rounded-full h-10 w-10 bg-gray-200">
            A
          </span>
          Ankit
        </div>
        <button className="px-4 py-2 bg-gray-800 rounded-lg text-white">
          Send Money
        </button>
      </div>
    </div>
  );
}
