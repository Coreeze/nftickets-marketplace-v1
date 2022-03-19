import * as React from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  () => `
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background: transparent;
  padding: 12px;
  color: white;
  border: 0;

  &:focus {
    outline: 0;
  }

  '& ::placeholder': {
    font-size: 0.875rem;
  font-weight: 400;
  color: white;
 }
`
);

const StyledRootElement = styled("root")(
  ({ theme }) => `
    z-index: 3;
    height: 50px;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    padding: 1.2rem;
    margin: 1.2rem;
    border-radius: 1rem;
    box-shadow: rgb(255 255 255 / 34%) 0px 2px 4px;

    &:focus {
        outline: 3px solid ${
          theme.palette.mode === "dark" ? blue[600] : blue[100]
        };
      }
  `
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{
        Input: StyledInputElement,
        Root: StyledRootElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function UnstyledInput() {
  return (
    <CustomInput
      aria-label="Demo input"
      placeholder="Search the Latest Events..."
    />
  );
}
