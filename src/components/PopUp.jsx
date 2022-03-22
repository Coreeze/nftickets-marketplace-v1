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
          To enjoy the current MVP there 2 important pre-requisites:
        </div>
        <div className="content">
          1. Install the MetaMask browser extension and then add the Polygon
          Testnet called Mumbai manually. Follow{" "}
          <a href="https://blog.polysynth.com/how-to-connect-polygon-testnet-to-metamask-wallet-472bca410d64">
            this link
          </a>{" "}
          to manually add Mumbai to MetaMask and then authenticate.
        </div>
        <div className="content">
          2. Please use a chromium based browser - i.e. Chrome, Edge, Brave and
          have the MetaMask extension installed.
        </div>
        <div className="content">
          These requirements are only needed for this version of the MVP. We
          will automate the wallet creation for users, feature needed to reach
          mass market.
        </div>
      </div>
    )}
  </Popup>
);

export default PopUp;
