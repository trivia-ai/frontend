import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  SignUpPage, 
  SignInPage, 
  CourseListPage, 
  TopicsListPage, 
  TopicPage, 
  QuizPage
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
            <Route path="/" element={<CourseListPage />} />
            <Route path="/course/:courseId" element={<TopicsListPage />} />
            <Route path="/course/:courseId/topic/:topicId" element={<TopicPage />} />
            <Route path="/course/:courseId/topic/:topicId/quiz/:quizId" element={<QuizPage />} />
            <Route
                path="*"
                element={<Navigate to="/signin" replace />}
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;