function Button({ children, className = "", ...props }) {
  return (
    <button {...props} className={`px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
