import { useState } from "react";

import "./App.css";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { ContentCopy } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";

enum Platform {
  Linux = "linux",
  Mac = "mac",
  Windows = "windows",
}

interface Props {
  wifiAp: string;
  wifiPw: string;
}

const commandLineForPlattform = (
  wifiAp: string,
  wifiPw: string
): string => {
      return `WIFI:S:${wifiAp};T:WPA;P:${wifiPw};;
`;
  }

const WifiJoin = ({ wifiAp, wifiPw }: Props) => {
  const [platform, setPlatform] = useState(Platform.Mac);

  return (
    <>
        <Button type="button" onClick={() => window.open(commandLineForPlattform(wifiAp, wifiPw))} variant="outlined">
          Connect
        </Button>
    </>
  );
};

export default WifiJoin;
