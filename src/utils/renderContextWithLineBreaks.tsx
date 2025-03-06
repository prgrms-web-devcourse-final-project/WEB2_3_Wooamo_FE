import React from "react";

const renderContextWithLineBreaks = (context: string) => {
  return context.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

export default renderContextWithLineBreaks;
