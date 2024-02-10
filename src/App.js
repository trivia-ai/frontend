import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  SignUp as SignUpPage, 
  SignIn as SignInPage, 
  Courses as CoursesPage, 
  Course as CoursePage, 
  CourseTopic as CourseTopicPage, 
  Quiz as QuizPage
} from './pages'
import { Layout } from './components'

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
          color: '#aaa', 
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
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/" element={<CoursesPage />} />
            <Route path="/course/:name" element={<CoursePage />} />
            <Route path="/course/:course/topic/:topic" element={<CourseTopicPage />} />
            <Route path="/course/:course/topic/:topic/quiz/:quizid" element={<QuizPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;