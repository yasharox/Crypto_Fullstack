import axios from "axios";

export const API_BASE_URL ="http://localhost:8088";

// export const API_BASE_URL ="https://crypto-server-springboot-production.up.railway.app";

// https://crypto-server-springboot-production.up.railway.app/
// crypto-server-springboot-production.up.railway.app

const api = axios.create({

    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }

})



export default api;