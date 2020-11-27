// import { Api } from './api.js';
// import {CurrentUserApi} from "@/API/currentUser";
// import {ExerciseApi} from "@/API/exercise";
//
// export { RoutineApi, FullRoutine, Cycle, CycleWithExercises};
//
// class RoutineApi {
//     static masterId = 1;
//
//     static get url() {
//         return `${Api.baseUrl}/routines`;
//     }
//
//     static get urlCycle(){
//         return 'cycles'
//     }
//
//     static get urlFavourites(){
//         return 'favourites'
//     }
//
//     static get urlRoutines(){
//         return 'routines'
//     }
//
//     static async add(routine, controller) {
//         return await Api.post(RoutineApi.url, true, routine, controller);
//     }
//
//     static async modify(routine, controller) {
//         return await Api.put(`${RoutineApi.url}/${routine.id}`, true, routine, controller);
//     }
//
//     static async delete(id, controller) {
//         let aux = await this.getCycle(id,undefined);
//         if (aux.totalCount > 0) {
//             for (let i = 0; i < aux.totalCount; i++) {
//                 await this.deleteCycle(id, aux.results[i].id);
//             }
//         }
//         return await Api.delete(`${RoutineApi.url}/${id}`, true, controller);
//     }
//
//     static async get(id,order, controller) {
//         let result;
//         if (id) {
//             if (order)
//                 result = await Api.get(`${RoutineApi.url}/${id}?page=0&size=100&orderBy=${order}&direction=asc`, true, controller);
//             else
//                 result = await Api.get(`${RoutineApi.url}/${id}`, true, controller);
//         }
//         else {
//             if (order)
//                 result = await Api.get(`${RoutineApi.url}?page=0&size=100&orderBy=${order}&direction=asc`, true, controller);
//         else
//             result = await Api.get(`${RoutineApi.url}`, true, controller);
//         }
//         return result
//     }
//
//     static async addCycle(routineId, cycle, controller){
//         return await Api.post(`${RoutineApi.url}/${routineId}/${RoutineApi.urlCycle}`, true, cycle, controller);
//     }
//
//     static async getCycle(routineId,cycleId,controller) {
//         let result;
//         if (cycleId) {
//             result = await Api.get(`${RoutineApi.url}/${routineId}/${RoutineApi.urlCycle}/${cycleId}`, true, controller);
//         }
//         else {
//             result = await Api.get(`${RoutineApi.url}/${routineId}/${RoutineApi.urlCycle}`, true, controller);
//         }
//         return result;
//     }
//
//     static async modifyCycle(routineId, cycle,controller){
//         return await Api.put(`${RoutineApi.url}/${routineId}/${RoutineApi.urlCycle}/${cycle.id}`, true, cycle, controller);
//     }
//
//     static async deleteCycle(routineId,cycleId, controller) {
//
//         let aux = await ExerciseApi.get(routineId, cycleId, undefined);
//         if (aux.totalCount > 0) {
//
//             for (let i = 0; i < aux.totalCount; i++) {
//                 await ExerciseApi.delete(routineId, cycleId, aux.results[i].id);
//             }
//         }
//         return await Api.delete(`${RoutineApi.url}/${routineId}/${RoutineApi.urlCycle}/${cycleId}`, true, controller);
//     }
//
//     static async getCurrentFavourites(order,controller) {
//         if (order)
//             return await Api.get(`${CurrentUserApi.url}/${RoutineApi.urlRoutines}/${RoutineApi.urlFavourites}?page=0&size=100&orderBy=${order}&direction=asc`, true, controller);
//         return await Api.get(`${CurrentUserApi.url}/${RoutineApi.urlRoutines}/${RoutineApi.urlFavourites}`, true, controller);
//     }
//
//     static async getCurrentRoutines(order, controller) {
//         if(order)
//             return await Api.get(`${CurrentUserApi.url}/${RoutineApi.urlRoutines}/?page=0&size=100&orderBy=${order}&direction=asc`, true, controller);
//         return await Api.get(`${CurrentUserApi.url}/${RoutineApi.urlRoutines}/`, true, controller);
//     }
//
//     static async addCurrentFavourites(routineId,controller) {
//         return await Api.post(`${CurrentUserApi.url}/${RoutineApi.urlRoutines}/${routineId}/${RoutineApi.urlFavourites}`, true, undefined,controller);
//     }
//
//     static async deleteCurrentFavourites(routineId,controller) {
//         return await Api.delete(`${CurrentUserApi.url}/${RoutineApi.urlRoutines}/${routineId}/${RoutineApi.urlFavourites}`, true, controller);
//     }
//
// }
//
//
// class Category {
//     constructor(id, categoryname) {
//         if (id) {
//             this.id = id;
//         }
//         this.categoryname = categoryname;
//     }
// }
//
// class FullRoutine {
//     constructor(id, name, detail, difficulty, isPublic, userId, userName, categoryId, categoryName) {
//         if (id) {
//             this.id = id;
//         }
//         this.name = name;
//         this.detail = detail;
//         this.difficulty = difficulty;
//         this.isPublic = isPublic;
//         this.creatorId = userId;
//         this.creatorName = userName;
//         this.category = new Category(categoryId, categoryName);
//         this.isFavourite = false;
//     }
// }
//
// class Cycle {
//     constructor(id, name,detail,type,order,repetitions) {
//         if(id){
//             this.id = id;
//         }
//         this.name = name;
//         this.detail = detail;
//         this.type = type;
//         this.order = order;
//         this.repetitions = repetitions;
//     }
// }
//
// class CycleWithExercises{
//     constructor(id, name,detail,type,order,repetitions) {
//         this.cycle = new Cycle(id,name,detail,type,order,repetitions);
//         this.exercises = [];
//     }
// }
