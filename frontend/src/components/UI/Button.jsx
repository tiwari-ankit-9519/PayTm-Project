/* eslint-disable react/prop-types */

export default function Button({ label, handleSubmit }) {
  return (
    <button
      onClick={handleSubmit}
      className="mt-6 border p-2 bg-gray-800 text-white rounded-lg"
    >
      {label}
    </button>
  );
}
