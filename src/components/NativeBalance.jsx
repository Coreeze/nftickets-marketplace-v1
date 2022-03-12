import { useNativeBalance } from "hooks/useNativeBalance";
import { n4 } from "helpers/formatters";

function NativeBalance(props) {
  const { balance, nativeName } = useNativeBalance(props);

  return (
    <div style={{ whiteSpace: "nowrap", fontSize: 20 }}>{`Balance: ${n4.format(
      balance.formatted
    )} ${nativeName}`}</div>
  );
}

export default NativeBalance;
