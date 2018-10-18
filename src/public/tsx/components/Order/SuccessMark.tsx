import * as React from "react";

const SuccessMark = (props) => {
  const {time, visible} = props;

  return (
    visible ?
    <img src="./assets/images/icons/check-mark-circle.svg" width="50" height="50" />
    : null
  );
};

export default SuccessMark;
