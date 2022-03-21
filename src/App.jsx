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
import UnstyledInput from "components/SearchBar";
import WhoAreWe from "components/WhoAreWe";
import FooterComponent from "components/FooterComponent";
import BottomBanner from "components/BottomBanner";
const { Header, Footer } = Layout;

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
        overflowX: "hidden",
        background:
          "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(150, 150,150,1) 100%)",
        scrollbarWidth: "none",
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
              background: "rgba(179, 179,179,0)",
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
            <Menu.Item key="/">
              <NavLink to="/faq" style={{ color: "white" }}>
                FAQ
              </NavLink>
            </Menu.Item>
          </Menu>
          <Account setInputValue={setInputValue} />
          <div style={styles.headerRight}>
            {/* <Chains /> */}
            {/* <NativeBalance /> */}
            {/* <Account /> */}
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
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
      {inputValue === "explore" && (
        <>
          <div style={styles.mainTitle}>OWN THE MOMENT</div>
          <WhoAreWe />
        </>
      )}
      {console.log("inputValue ", inputValue)}
      <FooterComponent />
      <BottomBanner />
    </Layout>
  );
};

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "AuthenticSans90, sans-serif",
    color: "#041836",
    // marginTop: "70px",
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
    fontFamily: "AuthenticSans90, sans-serif",
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
  mainTitle: {
    color: "black",
    fontFamily: "DrukWideCy",
    alignSelf: "center",
    margin: "20px 30px",
    fontSize: "40px",
  },
};

export const Logo = () => (
  <div
    style={{
      display: "flex",
      margin: "0rem 0px",
      fontFamily: "DrukWideCy",
      fontSize: "1.3rem",
      color: "#5f2ad2",
    }}
  >
    {/* <img src={logo} alt="nologo" width="150px" height="70px" /> */}
    NFTickets
  </div>
);

export default App;
