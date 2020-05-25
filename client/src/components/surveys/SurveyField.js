// SurveyField contains logic to render a single lable and text input
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // ({input }) tells react to look into the props.input object returned from React
  // console.log(props.input);

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
      {/* ...input says to give the input tag access to all the props passed into input */}
    </div>
  );
};
