import React, { useState, useEffect } from "react";
import { getNativeByChain } from "helpers/networks";
import { getCollectionsByChain } from "helpers/collections";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from "react-moralis";
import { Card, Image, Tooltip, Modal, Badge, Alert, Spin } from "antd";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import {
  FileSearchOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import { css } from "@emotion/react";
import "./styles.css";
import CircleLoader from "react-spinners/ClipLoader";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PopUp from "./PopUp";

const { Meta } = Card;

function NFTTokenIds({ inputValue, setInputValue }) {
  const fallbackImg =
    "data:image/png;base64,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";
  const [loading, setLoading] = useState(false);
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(
    inputValue,
    setLoading
  );
  console.log("inputValue: ", inputValue);
  console.log("NFTTokenIds: ", NFTTokenIds);
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const nativeName = getNativeByChain(chainId);
  const contractABIJson = JSON.parse(contractABI);
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("CreatedNFTickets");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  const purchaseItemFunction = "createMarketSale";
  const NFTCollections = getCollectionsByChain("0x13881");

  let [color, setColor] = useState("#ffffff");

  async function purchase() {
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: (error) => {
        setLoading(false);
        failPurchase();
      },
    });
  }

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
    console.log(nft.image);
    setVisibility(true);
  };

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFTicket`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFTicket`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("CreatedNFTickets");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  const getMarketItem = (nft) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    return result;
  };
  // console.log("NFTTokenIds: ", NFTTokenIds);

  function separateEvents(NFTTokenIds) {
    let events = [];
  }

  return (
    <>
      <CircleLoader
        color={color}
        loading={loading && inputValue !== "explore"}
        css={"display: block;margin: 0 auto;border-color: white;"}
        size={150}
      />
      <div>
        {contractABIJson.noContractDeployed && (
          <>
            <Alert
              message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
              type="error"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}
        {inputValue !== "explore" && totalNFTs !== undefined && (
          <>
            {chainId !== "0x13881" && <PopUp />}
            {!fetchSuccess && (
              <>
                <Alert
                  message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
                  type="warning"
                />
                <div style={{ marginBottom: "10px" }}></div>
              </>
            )}
            <div style={styles.banner}>
              <div style={styles.text}>
                <div style={styles.subText}>20 MAR 2022</div>
                <div>{`${NFTTokenIds[0]?.name}`}</div>
                <div style={styles.subText}>by Mega Parties Spain</div>
                <div style={{ paddingTop: "2rem" }}></div>
                <div style={styles.subText}>IN</div>
                <div>Ibizza, Spain</div>
                <div style={styles.subText}>
                  Event capacity: {`${totalNFTs}`}
                </div>
              </div>
              <Image
                preview={false}
                src={NFTTokenIds[0]?.metadata.eventImage || "error"}
                fallback={fallbackImg}
                alt=""
                style={styles.logo}
              />
            </div>
          </>
        )}

        <Carousel
          emulateTouch={true}
          width={"100vw"}
          // infiniteLoop
          // autoPlay
          interval={3000}
          centerMode
          showStatus={false}
          swipeScrollTolerance={10}
          selectedItem={1}
          showThumbs={false}
        >
          {inputValue === "explore" &&
            NFTCollections?.map((nft, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  justifyContent: "center",
                  display: "inline-flex",
                }}
              >
                <Image
                  preview={false}
                  src={nft?.image || "error"}
                  fallback={fallbackImg}
                  alt=""
                  style={{
                    height: "70vh",
                    width: "70vw",
                    borderRadius: "10px",
                    filter: "contrast(1.1) brightness(0.85)",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    // bottom: "0px",
                    right: "0px",
                    // background: "rgb(0, 0, 0)",
                    background: "rgba(0, 0, 0, 0.2)" /* Black see-through */,
                    color: "#f1f1f1",
                    width: "100%",
                    height: "100%",
                    // color: "white",
                    fontSize: "20px",
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "AuthenticSans90",
                      fontSize: "12px",
                      color: "#ffffff",
                    }}
                  >
                    EVENT
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "DrukWideCy",
                      fontSize: "28px",
                    }}
                  >
                    {nft.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "AuthenticSans90",
                      fontSize: "12px",
                      color: "#ffffff",
                    }}
                  >
                    WHERE
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "DrukWideCy",
                      fontSize: "28px",
                    }}
                  >
                    {nft.location}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "AuthenticSans90",
                        fontSize: "12px",
                        color: "#ffffff",
                      }}
                    >
                      WHEN
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "DrukWideCy",
                        fontSize: "28px",
                      }}
                    >
                      {nft.date}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "AuthenticSans90",
                        fontSize: "12px",
                        color: "#ffffff",
                      }}
                    >
                      EVENT SIZE
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "DrukWideCy",
                        fontSize: "28px",
                      }}
                    >
                      {nft.eventSize}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "AuthenticSans90",
                        fontSize: "8px",
                        color: "#ffffff",
                      }}
                    >
                      ISSUER
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "DrukWideCy",
                        fontSize: "12px",
                        // paddingBottom: "10px",
                      }}
                    >
                      {nft.issuer}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "AuthenticSans90",
                        fontSize: "8px",
                        color: "#ffffff",
                      }}
                    >
                      ADDR
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontFamily: "DrukWideCy",
                        fontSize: "12px",
                      }}
                    >
                      {nft.addrs.substring(0, 5) +
                        "..." +
                        nft.addrs.substring(39, 42)}
                    </div>
                  </div>
                  <div
                    onClick={() => setInputValue(nft?.addrs)}
                    style={{
                      backgroundColor: "white",
                      color: "#5f2ad2",
                      padding: "20px",
                      marginTop: "200px",
                      borderRadius: "15px",
                      display: "inline-flex",
                      fontFamily: "DrukWideCy",
                      cursor: "pointer",
                    }}
                  >
                    BUY NOW
                  </div>
                </div>
              </div>
              // </div>
            ))}
        </Carousel>
        <div style={styles.NFTs}>
          {/* {inputValue !== "explore" && (
            <Image
              preview={false}
              src={NFTTokenIds[0]?.image || "error"}
              fallback={fallbackImg}
              alt=""
              style={styles.ticket}
            />
          )} */}
          {inputValue !== "explore" &&
            NFTTokenIds.slice(0, 20).map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Tooltip title="View On Blockexplorer">
                    <FileSearchOutlined
                      onClick={() =>
                        window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )
                      }
                    />
                  </Tooltip>,
                  <Tooltip title="Buy NFTicket">
                    <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                  </Tooltip>,
                ]}
                style={{ width: 240, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview={false}
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{ height: "100%" }}
                  />
                }
                key={index}
              >
                {getMarketItem(nft) && (
                  <Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>
                )}
                <Meta title={nft.name} description={`#${nft.token_id}`} />
              </Card>
            ))}
        </div>
        {getMarketItem(nftToBuy) ? (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => purchase()}
            okText="Buy"
          >
            {console.log(loading)}
            <CircleLoader
              color={color}
              loading={loading}
              css={"display: block; margin: 0 auto; border-color: red;"}
              size={150}
            />
          </Modal>
        ) : (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => setVisibility(false)}
          >
            <img
              alt={""}
              src={nftToBuy?.image}
              style={{
                width: "250px",
                margin: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
            <Alert
              message="This NFTicket is currently not for sale"
              type="warning"
            />
          </Modal>
        )}
      </div>
    </>
  );
}

const styles = {
  NFTs: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
    boxShadow: "13px 13px 20px #9E9E9E",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  banner: {
    backgroundColor: "white",
    boxShadow: "13px 13px 20px #9E9E9E",
    display: "flex",
    justifyContent: "space-evenly",
    // alignItems: "center",
    margin: "0 auto",
    // width: "800px",
    borderRadius: "10px",
    marginBottom: "40px",
    paddingBottom: "20px",
    padding: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "415px",
    width: "415px",
    borderRadius: "10px",
    // border: "solid 4px white",
  },
  ticket: {
    // height: "415px",
    // width: "415px",
    borderRadius: "10px",
    // border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontFamily: "DrukWideCy",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    // paddingRight: "20px",
    marginRight: "20px",
  },
  normalText: {
    // color: "#041836",
    fontSize: "22px",
    fontWeight: "bold",
    fontFamily: "AuthenticSans90",
    // paddingTop: "7rem",
  },
  subText: {
    fontSize: "15px",
    color: "#7c7c7c",
    fontWeight: "normal",
    fontFamily: "AuthenticSans90",
  },
};

export default NFTTokenIds;
