export default function Input({ label, type, name, value, onChange, placeholder, classes }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className={"block text-sm font-medium text-gray-700 "+classes}>
          {label}
          
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
  