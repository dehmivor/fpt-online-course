import PropTypes from "prop-types";

function Table({ columns, data }) {
  return (
    <div className="p-2 overflow-x-auto">
      <table className="w-full overflow-hidden border-collapse rounded-[20px] shadow-lg">
        <thead className="tracking-wider text-left bg-gray-100">
          <tr className="text-lg text-gray-600 transition-colors color-primary background-primary hover:bg-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors even:bg-gray-50 hover:bg-gray-200"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 tracking-wider">
                  {col.renderCell
                    ? col.renderCell(row[col.key], row)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      renderCell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
