const InputField = ({ label, name, options, type = "text" }) => {
  return (
    <div className="flex flex-col w-full md:w-1/4 gap-1">
      <label className="capitalize text-[12px] text-gray-500" htmlFor={name}>
        {label}
      </label>

      {type === "select" ? (
        <select className="text-[12px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md">
          {options.map(option => 
            <option value={option}>{option}</option>
          )}
        </select>
      ) : (
        <input
          className="text-[14px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
          type={type}
          id={name}
          name={name}
        />
      )}
    </div>
  );
};

export default InputField;
