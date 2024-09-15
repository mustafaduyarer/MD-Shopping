import axios from "../config/AxiosConfig";


class LoginPageService {

    login() {
        return new Promise((resolve: any, reject: any) => {
            axios.get('/users')
        })
    }
}

export default new LoginPageService();
