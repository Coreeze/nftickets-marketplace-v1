import Text from "antd/lib/typography/Text";
import { Menu, Layout } from "antd";
const { Header, Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        justifyContent: "end",
        textAlign: "center",
        backgroundColor: "#5f2ad2",
        color: "white",
        fontFamily: "Century Gothic",
        padding: "35px 0px",
        marginTop: "50px",

        /* The code that you need to copy */
        // position: "absolute",
        left: "0px",
        right: "0px",
        bottom: "0px",
      }}
    >
      <Text
        style={{
          display: "block",
          fontFamily: "DrukWideCy",
          fontSize: "72px",
          //   color: "#efc0ff",
        }}
      >
        NFTickets
      </Text>
      <Text
        style={{
          display: "block",
          fontFamily: "AuthenticSans90",
          padding: "0px 400px 10px",
          fontWeight: "900",
          fontSize: "12px",
          color: "#efc0ff",
        }}
      >
        2022
      </Text>
      <Text
        style={{
          display: "block",
          color: "black",
          fontFamily: "AuthenticSans90",
          padding: "0px 400px",
          fontWeight: "900",
          fontSize: "12px",
        }}
      >
        BELONGING IS THE MOST IMPORTANT THING IN LIFE. OUR AIM IS TO EMPOWER AND
        FREE FANS, ARTISTS AND EVENT ORGANIZERS BY UNLOCKING THE CONTROL OF THE
        TICKETMARKET. FANS SHOULD NOT PAY 1000% INCREASED PRICES. ARTISTIS
        SHOULD NOT BE AT THE MERCY OF ORGANIZERS. ORGANIZERS SHOULD MAKE ENOUGH
        MONEY BY PROVIDING A GOOD SERVICE ALONE. THIS IS NFTICKETS.
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "20px 0px",
        }}
      >
        <a href="/" style={{ color: "black", fontFamily: "AuthenticSans90" }}>
          DISCORD
        </a>
        <a href="/" style={{ color: "black", fontFamily: "AuthenticSans90" }}>
          TWITTER
        </a>
        <a href="/" style={{ color: "black", fontFamily: "AuthenticSans90" }}>
          INSTAGRAM
        </a>
        <a href="/" style={{ color: "black", fontFamily: "AuthenticSans90" }}>
          EMAIL
        </a>
        {/* <a href="/" style={{ color: "black", fontFamily: "AuthenticSans90" }}>
          FAQ
        </a> */}
      </div>
      <Text
        style={{
          display: "block",
          color: "black",
          fontFamily: "AuthenticSans90",
        }}
      >
        Powered by NFTickets
      </Text>
    </Footer>
  );
};

export default FooterComponent;
