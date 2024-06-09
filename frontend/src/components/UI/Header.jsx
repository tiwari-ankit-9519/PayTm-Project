// eslint-disable-next-line react/prop-types
export default function Header({ user }) {
  return (
    <div className="flex justify-between px-10 py-2 bg-white items-center border shadow-xl">
      <h1>Paytm App</h1>
      <p className="flex items-center justify-center gap-4 font-medium">
        Hello
        <span className="rounded-full bg-white w-10 h-10 flex items-center justify-center">
          {user}
        </span>
      </p>
    </div>
  );
}
