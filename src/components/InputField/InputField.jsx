const InputField = ({
  register,
  error,
  label,
  name,
  options,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full md:w-1/4 gap-1">
      <label className="capitalize text-[12px] text-gray-500" htmlFor={name}>
        {label}
      </label>

      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-[12px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
        >
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <>
          <input
            key={name}
            className="text-[14px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
            type={type}
            id={name}
            {...register(name)}
          />
          {error?.message ? (
            <span className="text-[10px] text-red-600">{error.message}</span>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default InputField;
