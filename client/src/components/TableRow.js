import React from "react";
const TableRow = (props) => {
  const { rollnumber, result } = props;
  return (
    <tr>
      <td>{rollnumber}</td>
      <td>{result}</td>
    </tr>
  );
};

export default TableRow;
