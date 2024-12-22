const InputField = ({
  register,
  error,
  label,
  name,
  options,
  type = "text",
  defaultValue,
}) => {
  return (
    <div className="flex flex-col w-full md:w-1/4 gap-1">
      <label className="capitalize text-[12px] text-gray-500" htmlFor={name}>
        {label}
      </label>

      {type === "select" ? (
        <select
          className="text-[12px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
          defaultValue={options[0]}
          {...register(name)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <>
          <input
            key={name}
            className="text-[14px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
            type={type}
            id={name}
            defaultValue={defaultValue ? defaultValue : null}
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
