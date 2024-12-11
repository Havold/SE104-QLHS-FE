import React from "react";

const Table = ({ columns, renderRows, data }) => {
  return (
    <table className="mt-2 w-full">
      <thead>
        <tr className="text-[14px] text-left text-gray-500">
          {columns.map((col) => (
            <th
              className={"font-semibold p-2 " + col.className}
              key={col.accessor}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  );
};

export default Table;
