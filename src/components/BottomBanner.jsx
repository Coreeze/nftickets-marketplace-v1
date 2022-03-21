import Text from "antd/lib/typography/Text";
import { Menu, Layout } from "antd";
const { Header, Footer } = Layout;

const BottomBanner = () => {
  return (
    <Footer
      style={{
        justifyContent: "end",
        textAlign: "center",
        backgroundColor: "#5f2ad2",
        color: "white",
        fontFamily: "Century Gothic",
        padding: "5px",

        /* The code that you need to copy */
        position: "absolute",
        left: "0px",
        right: "0px",
        bottom: "0px",
      }}
    >
      <Text
        style={{
          display: "block",
          color: "white",
          fontFamily: "AuthenticSans90",
        }}
      >
        Thanks for the visit! NFTickets has not launched yet and is still a work
        in progress🚀
      </Text>
    </Footer>
  );
};

export default BottomBanner;
