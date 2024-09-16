import React, { useEffect } from "react";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Typography,
  Collapse, // For animation
} from "@mui/material";
import { Wifi, Bluetooth, PermMedia, ContentCopy } from "@mui/icons-material";

interface Props {
  wifiApActive: boolean;
  wifiAp: string;
  wifiPw: string;
  onWifiEnabledChange: (enable: boolean) => void;
  onDisconnect: () => void;
}

const CameraDisplay = ({
  wifiAp,
  wifiApActive,
  wifiPw,
  onWifiEnabledChange,
  onDisconnect,
}: Props) => {
  const [wifiEnabled, setWifiEnabled] = React.useState(wifiApActive);

  useEffect(() => {
    setWifiEnabled(wifiApActive); // Sync state when props change
  }, [wifiApActive]);

  const handleWifiToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = event.target.checked;
    setWifiEnabled(isEnabled);
    onWifiEnabledChange(isEnabled); // Propagate to parent
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: { xs: "100%", sm: 400 }, // 100% on mobile, 400px on larger screens
        maxWidth: 500,
        margin: { xs: "0 auto", sm: "auto" }, // Centered on larger screens
      }}
    >
      <CardContent>
        <FormGroup>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Wifi />
            <FormControlLabel
              control={
                <Switch
                  checked={wifiEnabled}
                  onChange={handleWifiToggle}
                />
              }
              label="WiFi Enabled"
              labelPlacement="start"
            />
          </div>
        </FormGroup>

        {/* Collapse component for smooth animation */}
        <Collapse in={wifiEnabled} timeout="auto" unmountOnExit>
          <TextField
            label="SSID"
            variant="standard"
            value={wifiAp}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => navigator.clipboard.writeText(wifiAp)}
                  >
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Password"
            variant="standard"
            value={wifiPw}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => navigator.clipboard.writeText(wifiPw)}
                  >
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="dense"
            fullWidth
          />
          <Typography variant="body1" style={{ marginTop: "16px" }}>
            Camera WebServer:{" "}
            <Link href="http://10.5.5.9:8080">10.5.5.9:8080</Link>
          </Typography>
        </Collapse>
      </CardContent>

      <CardActions disableSpacing>
        <div
          style={{
            display: "flex",
            flexDirection: wifiEnabled ? "row" : "column",
            gap: "6px",
            width: "100%",
          }}
        >
          {/* Use Collapse to animate the Browse Media button */}
          <Collapse in={wifiEnabled} timeout="auto" unmountOnExit>
            <Button
              type="button"
              onClick={() =>
                window.open("http://10.5.5.9:8080/gopro/media/list")
              }
              variant="outlined"
              fullWidth={!wifiEnabled}
              startIcon={<PermMedia />} // Add Media Icon
            >
              Browse Media
            </Button>
          </Collapse>

          <Button
            type="button"
            onClick={onDisconnect}
            variant="outlined"
            fullWidth // Always fullWidth for Disconnect Bluetooth
            startIcon={<Bluetooth />} // Add Bluetooth Icon
          >
            Disconnect Bluetooth
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CameraDisplay;
