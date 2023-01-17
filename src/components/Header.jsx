import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const time = useSelector((state) => state.typing.time);

  return (
    <div className="d-flex shadow-lg justify-content-center bg-dark text-light p-3 mt-3">
      <div className="shadow px-3 border py-1 rounded">
        <b>{time}</b>
      </div>
    </div>
  );
}

export default React.memo(Header);
