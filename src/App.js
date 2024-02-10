import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components'
import { SignUp, SignIn, Courses, Topics } from './pages'

const theme = createTheme({
  palette: {
    primary: {
      main: '#24232A',
    },
    secondary: {
      main: '#5A5960',
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#aaa',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#aaa', // Set label color to #fff
        },
      },
    },
  }

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/course/:name" element={<Topics />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;