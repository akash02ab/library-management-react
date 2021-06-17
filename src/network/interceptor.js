import axios from "axios";
import { createBrowserHistory } from 'history';

export default function networkInterceptor() {
    const history = createBrowserHistory();

    axios.interceptors.request.use(
        function (req) {
            let email = localStorage.getItem("email");
            let refresh_token = localStorage.getItem("refresh_token");
            let access_token = localStorage.getItem("access_token");
            // console.log(email, refresh_token)
            if (!refresh_token) {
                console.log("Token not found");
                history.replace("/signin");
                
            } else {
                req.body = {
                    email: email,
                    token: access_token
                };
            }
            return req;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        async function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const originalRequest = error.config;
            console.log("interceptor response", error)

            let {status} = error.response;
            if(status === 403 && localStorage.getItem('access_token') && !originalRequest._retry) {
                originalRequest._retry = true;
                await getAndSaveNewToken();
                return axios(originalRequest);
            }
            else if(status === 401) {
                history.replace('/signin');
            }
            return Promise.reject(error);
        }
    );
}


async function getAndSaveNewToken() {
    try {
        let result = await axios.post("/auth/token", {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.setItem("access_token", result.data.access_token);
    }catch(err) {
        console.log(err);
    }
}