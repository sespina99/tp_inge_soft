// import { Api } from './api.js';
// import { UserApi } from './user.js';
//
// export { CurrentUserApi};
//
// class CurrentUserApi {
//
//     static currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     static currentToken = sessionStorage.getItem('token');
//
//     static get url() {
//         return `${UserApi.url}/current`;
//     }
//
//     static getCurrentToken(){
//         return this.currentToken;
//     }
//
//     static async editCurrentUser(user, controller) {
//         try{
//             return await Api.put(`${CurrentUserApi.url}`, true, user, controller);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
//
//     static getCurrentUser(){
//         return this.currentUser;
//     }
//
//     static async updateCurrentUser(controller){
//         const result = await Api.get(`${CurrentUserApi.url}`, true, controller);
//         sessionStorage.removeItem('currentUser');
//         sessionStorage.setItem('currentUser', JSON.stringify(result));
//         this.currentUser = result;
//
//         this.currentToken = sessionStorage.getItem('token');
//     }
//
// }
