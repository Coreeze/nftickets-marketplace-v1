import { width } from "@mui/system";
import React, { useState, useEffect } from "react";

const WhoAreWe = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  return (
    <>
      <div style={styles.container}>
        <div style={styles.first}>
          <div
            style={{
              fontFamily: "DrukWideCy",
              fontSize: "125px",
              color: "rgb(95, 42, 210)",
            }}
          >
            01
          </div>
          <div
            style={{
              fontFamily: "DrukWideCy",
              fontSize: "25px",
              color: "rgb(95, 42, 210)",
              // alignSelf: "center",
            }}
          >
            What is NFTickets?
          </div>
          <div
            style={{
              // marginTop: "50px",
              fontFamily: "AuthenticSans90",
              fontSize: "15px",
            }}
          >
            Our long term vision is to fuse blockchain with mass market events.
            We aim to enhance the feeling of belonging beyond the event itself,
            into a persisting virtual environment. As life becomes increasingly
            virtual, our sense of belonging shifts from geolocation- to
            identity-based (virtual) communities. Big events are expressions of
            one's identity, mirroring one's personality.
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}></div>
      <div style={styles.container}>
        <div style={styles.first}>
          <div
            style={{
              fontFamily: "DrukWideCy",
              fontSize: "125px",
              color: "rgb(95, 42, 210)",
            }}
          >
            02
          </div>
          <div
            style={{
              //   marginTop: "50px",
              fontFamily: "DrukWideCy",
              fontSize: "25px",
              color: "rgb(95, 42, 210)",
              // alignSelf: "center",
            }}
          >
            Why NFTickets?
          </div>
          <div
            style={{
              // marginTop: "50px",
              fontFamily: "AuthenticSans90",
              fontSize: "15px",
            }}
          >
            Primary sellers and event organizers have no incentive to stop
            scalping and fans literally pay the price. As organizers have as the
            main source of revenue only the first sale, there are little
            incentives for mitigating scalping.
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}></div>
      <div style={styles.container}>
        <div style={styles.first}>
          <div
            style={{
              fontFamily: "DrukWideCy",
              fontSize: "125px",
              color: "rgb(95, 42, 210)",
            }}
          >
            03
          </div>
          <div
            style={{
              fontFamily: "DrukWideCy",
              fontSize: "25px",
              color: "rgb(95, 42, 210)",
            }}
          >
            Infinite Possibility
          </div>
          <div
            style={{
              fontFamily: "AuthenticSans90",
              fontSize: "15px",
            }}
          >
            Fee Transparency
          </div>
          <div
            style={{
              fontFamily: "AuthenticSans90",
              fontSize: "15px",
            }}
          >
            Fan Engagement
          </div>
          <div
            style={{
              fontFamily: "AuthenticSans90",
              fontSize: "15px",
            }}
          >
            Free of Scalping
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    // justifyContent: "center",
    borderRadius: "10px",
    width: "72%",

    // marginTop: "20px",
    marginBottom: "20px",
    margin: "0 auto",
    paddingBottom: "40px",

    flexWrap: "wrap",
    WebkitBoxPack: "start",
    // justifyContent: "flex-start",
    gap: "10px",
    boxShadow: "13px 13px 20px #9E9E9E",
    backgroundColor: "white",
    color: "rgb(4, 24, 54)",
    fontFamily: "AuthenticSans90, sans-serif",
  },
  first: {
    flexDirection: "column",
    padding: "0px 150px",
  },
};

export default WhoAreWe;
