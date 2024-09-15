import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import { SiGithub } from '@icons-pack/react-simple-icons';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';

import './index.css';

interface Props {
    onConnect: () => void;
    connecting: boolean;
    bluetoothUnavailable: boolean;
}

export default function Greeter({ onConnect, connecting, bluetoothUnavailable } : Props) {
    return (
<Card style={{maxWidth: '400px'}}>
<CardHeader
        title="GoPro WiFi Enabler"
      />
<CardActions>
   { bluetoothUnavailable ? 
     <div className="error">Plattform does not support WebBluetooth. <Link href="https://github.com/alunis/gopro-wifi-enabler/wiki/Platform-support">More</Link></div> :
     <Button variant="contained" onClick={onConnect} style={{margin: 'auto'}}>Connect to camera</Button>
   }     
</CardActions>
{ connecting &&
  <LinearProgress />
}
</Card>
    )
}