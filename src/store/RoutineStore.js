import {FullRoutine, RoutineApi, Cycle} from '../API/routine.js';
import UserStore from "@/store/UserStore";
import CategoryStore from "@/store/CategoryStore";
const RoutineStore = {

    currentIdRoutine : 17,

    masterId : 1,

    async getCategoriesFromMaster(){

         return RoutineStore.getCycles(this.masterId);
    },

    async getRoutinesFromCategory(id){
        let result = await RoutineStore.getRoutines();

        let ret = [];

        for(let i = 0; i < result.length; i++){

            if(result[i].category.id === id){
                ret.push(result[i]);
            }
        }
        return ret;
    },


    async add(nombreRutina, desc, dificultad, categoryId) {
        const routine = new FullRoutine(undefined,  nombreRutina, desc, dificultad,true,  undefined, undefined, categoryId, undefined);
        return await RoutineApi.add(routine);
    },

    async modify(id,nombreRutina, desc, dificultad, categoryId) {
        const routine = new FullRoutine(id,  nombreRutina, desc, undefined, dificultad, undefined, undefined, categoryId, undefined);
        await RoutineApi.modify(routine);
    },

    async delete(id) {
       return await RoutineApi.delete(id);
    },

    async getRoutines(order) {
        const routines = [];
        const result =  await RoutineApi.get(undefined, order);
        result.results.forEach((r) => {
            if (r.category.id !== this.masterId){
                routines.push(new FullRoutine(r.id, r.name, r.detail, r.difficulty, r.isPublic, r.creator.id, r.creator.username, r.category.id, r.category.name))
            }
        })
        return routines;
    },

    async getByObjetive(){
        let result = await UserStore.getCurrentUser();

        let categories = await CategoryStore.getCategories();

        for(let i = 0; i < categories.length; i++){
            if(categories[i].name === result.phone){
                 let result = await RoutineStore.getRoutinesFromCategory(categories[i].id);
                 if(result.length !== 0){
                     return result;
                 }
            }
        }

        return await RoutineStore.getRoutines();

    },

    async getRoutine(routineId){
        const r = await RoutineApi.get(routineId);
        return new FullRoutine(r.id, r.name, r.detail, r.difficulty, r.isPublic,  r.creator.id, r.creator.username, r.category.id, r.category.name);
    },

    async addCycle(routineId, name,detail, type,order,repetitions){
        const cycle = new Cycle(undefined, name,detail,type,order,repetitions);
        return await RoutineApi.addCycle(routineId,cycle);
    },

    async getCycle(routineId, cycleId){
        const c = await RoutineApi.getCycle(routineId, cycleId);
        return new Cycle(c.id, c.name,c.detail,c.type,c.order,c.repetitions);
    },

    async getCycles(routineId){
        const result = await RoutineApi.getCycle(routineId);
        const cycles = [];
        result.results.forEach((c) => cycles.push(new Cycle(c.id, c.name,c.detail,c.type,c.order,c.repetitions )));
        return cycles;
    },

    async deleteCycle(routineId,cycleId) {
        return RoutineApi.deleteCycle(routineId, cycleId);
    },

    async modifyCycle(routineId, cycleId,name,detail,type,order,repetitions){
        return RoutineApi.modifyCycle(routineId, new Cycle(cycleId,name,detail,type,order,repetitions))
    },

    async getFavourites(order) {
        const result = await RoutineApi.getCurrentFavourites(order);
        const favourites = []
        result.results.forEach((r) => {
            if (r.category.id !== this.masterId){
                favourites.push(new FullRoutine(r.id, r.name, r.detail, r.difficulty, r.isPublic, r.creator.id, r.creator.username, r.category.id, r.category.name))
            }
        })
        return favourites;
    },

    async addFavourites(routineId) {
        return await RoutineApi.addCurrentFavourites(routineId);
    },

    async deleteFavourites(routineId) {
        return await RoutineApi.deleteCurrentFavourites(routineId);
    },

    async getMyMasterRoutine(){
        try{
            const result = await RoutineApi.getCurrentRoutines();
            for (let i = 0; i < result.results.length; i++) {
                if(result.results[i].id !== this.masterId) {    //La primera que no es la master global, es mi master
                    return new FullRoutine(result.results[i].id, result.results[i].name, result.results[i].detail,
                        result.results[i].difficulty, result.results[i].isPublic, result.results[i].creator.id,
                        result.results[i].creator.username, result.results[i].category.id, result.results[i].category.name)
                }
            }
            return undefined;   //nunca
        } catch (error) {
            console.log(error);
        }
    },

    async getMyRoutines(order) {
        try{
            const result = await RoutineApi.getCurrentRoutines(order);
            const routines = []
            result.results.forEach((r) => {
                if(r.id !== this.masterId  && r.name !== 'Rutina Personal') {
                    routines.push(new FullRoutine(r.id, r.name, r.detail, r.difficulty, r.isPublic, r.creator.id, r.creator.username, r.category.id, r.category.name));
                }
            })
            return routines;
        } catch (error) {
            console.log(error);
        }
    },

};

export default RoutineStore;