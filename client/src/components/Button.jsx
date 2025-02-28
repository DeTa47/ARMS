export default function Button({ text, onClick, classes, disabled, countdown }) {
    return (
      <button
        onClick={!disabled?onClick:undefined}
        disabled={disabled}
        className={`bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer ${classes} ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} `}
      >
        {disabled ? `Wait ${countdown}s` : text}
      </button>
    );
  }
  