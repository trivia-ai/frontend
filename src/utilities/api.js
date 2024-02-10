import axios from 'axios';

const apiBaseURL = 'https://us-central1-coms4115-401223.cloudfunctions.net/';
const mlBaseURL = 'https://us-central1-plt-gcp-401119.cloudfunctions.net/';

const api = axios.create({
    baseURL: apiBaseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const mlApi = axios.create({
    baseURL: mlBaseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiEndpoints = {
    signup: '/function-9',
    login: '/function-10',

    addSubject: '/function-6',
    getSubjects: '/function-2',

    getTopics: '/function-3',

    getUserData: '/function-1',
    getQuizzes: '/function-4',
    getParticularQuiz: '/function-5',
    addNewAttempt: '/function-7',
    getUserPerformance: '/function-8',
};

const mlApiEndpoints = {
    generateQuiz: '/Generate_Quiz',
    transcribeVideo: '/TranscribeVideo',
}

const client = {
    // functions for API endpoints
    signup: (data) => api.post(apiEndpoints.signup, data),
    login: (data) => api.post(apiEndpoints.login, data),

    addSubject: (data) => api.post(apiEndpoints.addSubject, data),
    getSubjects: (data) => api.post(apiEndpoints.getSubjects, data),

    getTopics: (data) => api.post(apiEndpoints.getTopics, data),


    getUserData: (data) => api.post(apiEndpoints.getUserData, data),
    getQuizzes: (data) => api.post(apiEndpoints.getQuizzes, data),
    getParticularQuiz: (data) => api.post(apiEndpoints.getParticularQuiz, data),
    addNewAttempt: (data) => api.post(apiEndpoints.addNewAttempt, data),
    getUserPerformance: (data) => api.post(apiEndpoints.getUserPerformance, data),

    // functions for ML endpoints
    generateQuiz: (data) => mlApi.post(mlApiEndpoints.generateQuiz, data),
    transcribeVideo: (data) => mlApi.post(mlApiEndpoints.transcribeVideo, data),
};
  

export default client;