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
          You need to install MetaMask and add the Polygon testnet Mumbai.
          Follow{" "}
          <a href="https://blog.polysynth.com/how-to-connect-polygon-testnet-to-metamask-wallet-472bca410d64">
            this link
          </a>{" "}
          for details. The MVP is not yet fully functional otherwise.
        </div>
      </div>
    )}
  </Popup>
);

export default PopUp;
