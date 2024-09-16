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
  Collapse,
  Box,
} from "@mui/material";
import { Wifi, Bluetooth, PermMedia, ContentCopy, Folder } from "@mui/icons-material";
import WifiIcon from '@mui/icons-material/Wifi';

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
      {/* Title */}
      <CardContent>
      <Box
        sx={{
          textAlign: 'center',
          padding: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '16px',
          position: 'relative',
        }}
      >
        {/* Centered Wifi Icon above title */}
        <WifiIcon sx={{ fontSize: '40px', color: '#1976d2', marginBottom: '8px' }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '24px',
            userSelect: 'none',
          }}
        >
          GoPro WiFi Enabler
        </Typography>
      </Box>

        {/* WiFi toggle */}
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

        {/* Collapse for WiFi-enabled content */}
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
            Camera WebDAV Server:{" "}
            <Link href="http://10.5.5.9:8080/videos/DCIM">http://10.5.5.9:8080/videos/DCIM</Link>
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
          {/* Browse Media Button (visible only when WiFi is enabled) */}
          <Collapse in={wifiEnabled} timeout="auto" unmountOnExit>



          </Collapse>

          {/* Disconnect Bluetooth (always visible) */}
          <Button
            type="button"
            onClick={onDisconnect}
            variant="outlined"
            fullWidth
            startIcon={<Bluetooth />}
          >
            Disconnect Bluetooth
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CameraDisplay;
