import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Box from '@mui/material/Box';
import WifiIcon from '@mui/icons-material/Wifi';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera'; // Use LinkedCamera icon

interface Props {
  onConnect: () => void;
  connecting: boolean;
  bluetoothUnavailable: boolean;
}

export default function Greeter({ onConnect, connecting, bluetoothUnavailable }: Props) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        padding: '24px',
        margin: 'auto',
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}
    >
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

      <CardContent>
        {bluetoothUnavailable ? (
          <Box sx={{ textAlign: 'center', padding: '16px', color: 'red' }}>
            <Typography variant="body1">
              Platform does not support WebBluetooth.{' '}
              <Link
                href="https://github.com/alunis/gopro-wifi-enabler/wiki/Platform-support"
                underline="hover"
              >
                More
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={onConnect}
              sx={{
                margin: 'auto',
                backgroundColor: '#1976d2',
                padding: '16px 24px',
                '&:hover': {
                  backgroundColor: '#115293',
                },
                textTransform: 'none', // Keep the button text normal
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>
                Connect
              </Typography>
              <LinkedCameraIcon sx={{ fontSize: '32px', color: 'white' }} /> {/* Icon inside the button */}
            </Button>
          </Box>
        )}
      </CardContent>

      {connecting && <LinearProgress />}
    </Card>
  );
}
