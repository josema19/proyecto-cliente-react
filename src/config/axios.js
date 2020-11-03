// Importar librerías
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BANCKEND_URL,
});

export default axiosClient;