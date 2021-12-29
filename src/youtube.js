import axios from 'axios';
const KEY = 'AIzaSyC3ACRC3Tr52nOkNdLgNUEO69K7MAjNSpQ'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: KEY
    }
})