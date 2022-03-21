import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "./Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "./Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import NativeBalance from "components/NativeBalance";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Account({ setInputValue }) {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!isAuthenticated) {
    return (
      <div
        style={styles.account}
        onClick={() => authenticate({ signingMessage: "Hello World!" })}
      >
        <p style={styles.text}>Authenticate</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {/* {getEllipsisTxt(walletAddress, 6)} */}
          MyAccount
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "AuthenticSans90",
        }}
        width="400px"
      >
        My Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <NativeBalance />
          {/* <div onClick={() => setInputValue("tickets")}>TEST</div> */}
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              paddingTop: "20px",
            }}
          >
            <Link
              to="/nftBalance"
              onClick={() => {
                setInputValue("tickets");
                setIsModalVisible(false);
              }}
              style={{
                color: "white",
                fontSize: "20px",
                backgroundColor: "#5f2ad2",
                textAlign: "center",
                padding: "10px",
                margin: "5px 0px",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
            >
              My Tickets <FaArrowAltCircleRight />
            </Link>
            <Link
              to="/Transactions"
              onClick={() => {
                // setInputValue("tickets");
                setIsModalVisible(false);
              }}
              style={{
                color: "white",
                fontSize: "20px",
                backgroundColor: "#5f2ad2",
                textAlign: "center",
                padding: "10px",
                margin: "5px 0px",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
            >
              My Transactions <FaArrowAltCircleRight />
            </Link>
          </div>
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined
                style={{ marginRight: "5px", fontFamily: "AuthenticSans90" }}
              />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "1rem",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "rgb(59 55 96)",
            border: "0px",
            height: "50px",
            fontFamily: "AuthenticSans90",
          }}
          onClick={() => {
            logout();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

const styles = {
  account: {
    height: "50px",
    padding: "0 35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "1rem",
    backgroundColor: "#5f2ad2",
    cursor: "pointer",
  },
  text: {
    color: "white",
    fontSize: "1.05rem",
    fontWeight: "500",
  },
};

export default Account;
