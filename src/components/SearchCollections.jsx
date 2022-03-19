import { Select } from "antd";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getCollectionsByChain } from "helpers/collections";

function SearchCollections({ setInputValue }) {
  const { Option } = Select;
  const { chainId } = useMoralisDapp();
  const NFTCollections = getCollectionsByChain(chainId);

  function onChange(value) {
    setInputValue(value);
  }

  return (
    <Select
      showSearch
      style={{
        width: "100%",
        marginLeft: "20px",
        background: "#0E0044",
        borderRadius: "10px",
        // height: "53px",
        padding: "0px 10px",
      }}
      placeholder="Find the next best event"
      optionFilterProp="children"
      onChange={onChange}
    >
      {NFTCollections &&
        NFTCollections.map((collection, i) => (
          <Option value={collection.addrs} key={i}>
            {collection.name}
          </Option>
        ))}
    </Select>
  );
}
export default SearchCollections;
