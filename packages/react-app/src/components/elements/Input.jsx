const Input = ({
  id,
  label,
  placeholder,
  name,
  type,
  value,
  onChange,
  required,
  className,
}) => {
  if (required === undefined) required = false;
  const base =
    "shadow-sm mt-1 py-1 px-2 border-2 block w-full sm:text-sm border-gray-300 rounded-md";
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`${base}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
