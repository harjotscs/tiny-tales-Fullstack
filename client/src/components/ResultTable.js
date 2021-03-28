const { default: TableRow } = require("./TableRow");

const ResultTable = (props) => {
  if (!props.location.response) {
    let customStyles = {
      color: "#fff",
      fontSize: "22px",
      fontFamily: "Pacifico, cursive",
      textShadow: "4px 3px #000",
    };
    return (
      <div className="form">
        <p style={customStyles}>You must enter atleast one roll number</p>
      </div>
    );
  }
  const { data } = props.location.response;

  return (
    <div className="table-wrapper">
      <h1 className="title">Result</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Roll Number</th>
            <th>Result</th>
          </tr>
          {data.map((result) => {
            return (
              <TableRow
                key={result.rollnumber}
                rollnumber={result.rollnumber}
                result={result.status}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
