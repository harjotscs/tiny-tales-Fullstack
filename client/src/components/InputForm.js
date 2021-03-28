import React, { useState } from "react";
import axios from "axios";
const InputForm = (props) => {
  const [inputText, setInputText] = useState("");
  const [Toggle, setToggle] = useState(true);

  const handleChange = (event) => {
    if (event.currentTarget.value.includes(" ")) {
      event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
    }
    const newValue = event.target.value;
    setInputText(newValue);
  };
  let customStyles = {
    color: "#fff",
    fontSize: "22px",
    fontFamily: "Pacifico, cursive",
    textShadow: "3px 4px #03012c",
  };

  const getResult = async () => {
    let apiUrl = "http://localhost:3080/api/results";
    // console.log("here");
    if (inputText.length === 0) return;
    setToggle(false);
    if (process.env.NODE_ENV === "production") {
      apiUrl = "https://harjot-assignment.herokuapp.com/api/results";
    }
    const response = await axios.get(apiUrl, {
      params: {
        rollnumbers: inputText,
      },
    });
    props.history.push({ pathname: "/results", response });
  };

  return (
    <div className="form">
      {Toggle ? (
        <React.Fragment>
          <h1>Enter Roll Numbers</h1>
          <br />
          <br />
          <input
            className="form-control"
            type="text"
            placeholder="Enter Roll Numbers"
            onChange={handleChange}
            value={inputText}
          />
          <h4>
            Multiple Roll Numbers need to be sepreated using "," like 2,3,4
          </h4>
          <button
            className="btn"
            onClick={() => {
              getResult(inputText);
            }}
          >
            <span>Get Results</span>
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
          <p style={customStyles}>
            Please Wait Your Request Is Being Processed
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default InputForm;
