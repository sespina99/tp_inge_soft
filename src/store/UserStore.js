import { UserApi, Credentials, User, UserEdit, Email, EmailConfirmation } from '../API/user.js';
import { CurrentUserApi } from '../API/currentUser.js'
import { Weightings, Weighting } from '../API/weightings.js'


const UserStore = {

    async validateUser(username, contrasena){
        if (username === undefined || contrasena === undefined)
            return false;

        try {
            const credentials = new Credentials(username, contrasena);
            await UserApi.login(credentials);
            return -1;  //-1 es éxito
        } catch (error) {
            console.log(error);
            return error.code;  //Sino, devuelvo el código de error
        }
    },
    async logoutUser() {
        await UserApi.logout();
    },

    async verifyUser(email,codigo){
        try {
            const verificationObj = new EmailConfirmation(email, codigo);
            await UserApi.verifyUser(verificationObj);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async resendVerification(email){
        try {
            const emailObject = new Email(email);
            await UserApi.resendVerification(emailObject);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async addUser(username, fullname, password, gender, birthdate, email, objective) {
        try {
            const user = new User(username, fullname, password, gender, birthdate, email, objective);
            await UserApi.addUser(user);
            return true;
        } catch (error) {
            return false;
        }
    },

    async editCurrentUser(username, fullname, gender, birthdate, email, objective) {
        try {
            const user = new UserEdit(username, fullname, gender, birthdate, email, objective);
            await CurrentUserApi.editCurrentUser(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getCurrentToken(){
        return CurrentUserApi.getCurrentToken();
    },

    getCurrentUser() {
        return CurrentUserApi.getCurrentUser();
    },

    async updateCurrentUser() {
        try {
            await CurrentUserApi.updateCurrentUser();
        } catch (error) {
            console.log(error);
        }
    },

    //Siempre trabajamos sobre el 'weighting' 1 pues no ofrecemos un historial

    async getWeighting(){
        return await Weightings.getWeighting();
    },

    async editWeighting(weight, height){
        try {
            const weighting = new Weighting(weight, height);
            await Weightings.editWeighting(weighting);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

export default UserStore;