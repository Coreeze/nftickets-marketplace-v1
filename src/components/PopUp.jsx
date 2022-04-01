import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./styles.css";

const PopUp = () => (
  <Popup open={true} modal nested>
    {(close) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> IMPORTANT </div>
        <div className="content">
          All NFTickets you see here are deployed on the blockchain already.
        </div>
        <div className="content">
          This MVP is still a WiP and presents a part of our current vision.
          Thanks for visiting!
        </div>
        <div className="content">
          For any questions, contact us at: lentacris@gmail.com
        </div>
      </div>
    )}
  </Popup>
);

export default PopUp;
