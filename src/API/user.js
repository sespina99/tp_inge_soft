import { Api } from './api.js';

import {BuilderApi} from "@/API/builder";

export { UserApi, Credentials , User, UserEdit, Email, EmailConfirmation};

class UserApi {
    static get url() {
        return `${Api.baseUrl}/user`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        sessionStorage.setItem('token', result.token);
        Api.token = result.token;
        //aca se haria el builder
        if(result.token !== undefined) {
            await BuilderApi.createMaster();
            await BuilderApi.createMyExercises();
            await BuilderApi.createFirstRoutines();
        }

    }

    static async addUser(user, controller) {
        return await Api.post(`${UserApi.url}`, false, user, controller);
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('currentUser');
    }

    static async resendVerification(email,controller){
        return await Api.post(`${UserApi.url}/resend_verification`, false, email, controller);
    }

    static async verifyUser(email_confirmation,controller){
        return await Api.post(`${UserApi.url}/verify_email`, false, email_confirmation, controller);
    }

}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class EmailConfirmation {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}

class Email {
    constructor(email) {
        this.email = email;
    }
}

class User {
    constructor(username, fullname, password, gender, birthdate, email, objective) {
        this.username = username;
        this.fullName = fullname;
        this.password = password;
        this.gender = gender;
        this.birthdate = birthdate;
        this.email = email;
        this.phone = objective;
        this.avatarUrl = '';
    }
}

class UserEdit {
    constructor(username, fullname, gender, birthdate, email, objective) {
        this.username = username;
        this.fullName = fullname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.email = email;
        this.phone = objective;
        this.avatarUrl = '';
    }
}
