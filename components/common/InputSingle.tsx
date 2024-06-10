import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface Props {
  icon?: React.ReactNode;
  iconPos?: "start" | "end";
  className?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSingle: React.FC<Props> = ({ icon, iconPos = "end", onChange, ...rest }) => {
  return (
    <TextField
      {...rest}
      onChange={onChange}
      InputProps={{
        [iconPos + "Adornment"]: icon && <InputAdornment position={iconPos}>{icon}</InputAdornment>,
      }}
    />
  );
};

export default InputSingle;
