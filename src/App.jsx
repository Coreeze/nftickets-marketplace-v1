import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout } from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
import TextField from "@mui/material/TextField";
import logo from "./logov5.png";
import UnstyledInput from "components/SearchBar";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    background: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    padding: "1.25rem",
    margin: "10px 0px",
    // boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout
      style={{
        height: "100vh",
        overflow: "auto",
        background:
          "linear-gradient(0deg, rgba(55,0,68,1) 0%, rgba(14,0,68,1) 100%)",
      }}
    >
      <Router>
        <Header style={styles.header}>
          <Logo />
          <UnstyledInput />
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              width: "1080px",
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              background: "#0E0044",
              borderBottom: "0px",
              // color: "white",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")}>
              <NavLink to="/NFTMarketPlace" style={{ color: "white" }}>
                Explore Events
              </NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance" style={{ color: "white" }}>
                Your Tickets
              </NavLink>
            </Menu.Item>
            <Menu.Item key="transactions">
              <NavLink to="/Transactions" style={{ color: "white" }}>
                Your Transactions
              </NavLink>
            </Menu.Item>
          </Menu>
          <Account />
          <div style={styles.headerRight}>
            {/* <Chains /> */}
            {/* <NativeBalance /> */}
            {/* <Account /> */}
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
      <Footer
        style={{
          justifyContent: "end",
          textAlign: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text style={{ display: "block", color: "white" }}>
          Powered by NFTickets
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex", marginLeft: "1rem", marginRight: "1rem" }}>
    <img src={logo} alt="nologo" width="150px" height="70px" />
  </div>
);

export default App;
