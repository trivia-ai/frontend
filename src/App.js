import { Layout } from './components'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#02343F',
      secondary: '#F0EDCC',
    },
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>HI</Layout>
    </ThemeProvider>
  );
}

export default App;
