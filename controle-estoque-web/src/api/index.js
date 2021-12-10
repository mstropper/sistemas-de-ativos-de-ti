import axios from "axios";

const Api = {
    Route() {
        return axios.create({
            validateStatus: function (status) {
                return (
                    status !== 204 && status !== 401 && status !== 400 && status !== 406
                );
            },
            baseURL: "http://stockcontrol-env.eba-59dfuxhp.us-east-1.elasticbeanstalk.com/",
            //baseURL: "http://localhost:3003/",
            timeout: 120000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
    },
}

export default Api;