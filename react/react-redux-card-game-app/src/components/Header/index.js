import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fillCards, resetGame } from "../../redux/CardsSlice";

function Header() {
  const dispatch = useDispatch();
  const [btnStatus, setBtnStatus] = useState("start");

  const { total, score } = useSelector((state) => state.cards);

  const handleStart = () => {
    if (btnStatus === "start") {
      dispatch(resetGame());
      dispatch(fillCards());
      setBtnStatus("playing");
    } else if (btnStatus === "playing") {
      if (window.confirm("Reset The Game")) {
        dispatch(resetGame());
        setBtnStatus("start");
      }
    }
  };
  useEffect(() => {
    total.closed === 0 && setBtnStatus("start");
  }, [total]);

  return (
    <div className="w-full bg-yellow-100 my-5 p-2 font-serif font-bold">
      {/* Header Title */}
      <h2 className="text-center font-extrabold tracking-light text-green-600">
        match the cards
      </h2>
      {/* Header content */}
      <div className="w-full flex flex-row items-center justify-center mt-2">
        <div className="w-full grid grid-cols-3 gap-4">
          {/* column-1 */}
          <div className="flex flex-col items-start justify-center w-full">
            <span className="w-full uppercase text-red-600">your score : {score}</span>
            <span className="w-full uppercase">notes :</span>
            <span className="w-full text-xs">
              * Your starting score is{" "}
              <strong className="text-blue-600">200</strong>
            </span>
            <span className="w-full text-xs">
              * Each correct gives{" "}
              <strong className="text-green-500">50</strong> points,
            </span>
            <span className="w-full text-xs">
              * Each wrong takes <strong className="text-red-600">10</strong>{" "}
              points
            </span>
          </div>

          {/* column-2 */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 uppercase tracking-widest text-xl"
              onClick={() => handleStart()}
            >
              {btnStatus === "start"
                ? "start game"
                : total.closed === 0
                ? "start game"
                : "reset game"}
            </button>
          </div>

          {/* column-3 */}
          <div className="w-full flex flex-col items-start justify-center">
            <span className=" uppercase tracking-widest">
              total cards : {total.all}
            </span>
            <span className=" uppercase tracking-widest">
              total opened : {total.opened}
            </span>
            <span className=" uppercase tracking-widest">
              total closed : {total.closed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
