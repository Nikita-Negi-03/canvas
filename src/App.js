import {Box, Container, CssBaseline} from '@mui/material';
import './App.css';
import CanvasBackground from './CanvasBackground';
import SignaturePad from './SignaturePad';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ height: '100vh' }} >
          <CanvasBackground />
        </Box>
      </Container>
    </div>
  );
}

export default App;
