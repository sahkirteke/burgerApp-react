import axios from 'axios';

 const instance = axios.create({
    baseURL :'https://react-my-burger-48d76-default-rtdb.firebaseio.com/'
});
export default instance;