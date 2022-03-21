import { useNativeBalance } from "hooks/useNativeBalance";
import { n4 } from "helpers/formatters";
import { PolygonLogo } from "./Chains/Logos";

function NativeBalance(props) {
  const { balance, nativeName } = useNativeBalance(props);

  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <PolygonLogo />
      <div
        style={{
          paddingLeft: "8px",
          whiteSpace: "nowrap",
          fontSize: 20,
        }}
      >
        {`Balance: ${n4.format(balance.formatted)} ${nativeName}`}
      </div>
    </div>
  );
}

export default NativeBalance;
