import {ExerciseApi, Exercise} from "@/API/exercise";
import RoutineStore from "@/store/RoutineStore";

const ExcerciseStore = {

    masterId : 1,


    async add(routineId, cycleId, name, detail, type, duration, repetitions) {
        try{
            if (type !== "exercise" && type !== "rest")
                type = "exercise"
            const exercise = new Exercise(undefined,name, detail, type, duration, repetitions);
            return await ExerciseApi.add(routineId, cycleId, exercise);
        } catch (error) {
            console.log(error);
        }
    },

    async modify(routineId, cycleId, exId, name, detail, type, duration, repetitions) {
        const exercise = new Exercise(exId, name, detail, type, duration, repetitions);
        return await ExerciseApi.modify(routineId, cycleId, exercise);
    },

    async delete(routineId, cycleId, exerciseId) {
        return await ExerciseApi.delete(routineId, cycleId,exerciseId);
    },

    async deleteFromMaster(cycleId, exerciseId){
        return await ExcerciseStore.delete(this.masterId, cycleId, exerciseId)
    },

    async getExercisesFromMaster(cycleId){
        return await ExcerciseStore.getExercises(this.masterId, cycleId);
    },

    async getExercisesFromPersonal(cycleId){
        return await ExcerciseStore.getExercises((await RoutineStore.getMyMasterRoutine()).id, cycleId);
    },

    async addExcerciseMaster(cycleId, name, detail, type, duration, repetitions){
        return await ExcerciseStore.add(this.masterId, cycleId, name, detail, type, duration, repetitions)
    },

    async addMyExercises(name, detail, type){
        try{
            const routineId = (await RoutineStore.getMyMasterRoutine()).id;

            let categories = await RoutineStore.getCycles(routineId);
            let cycleId = -1
            let i = 0
            while (i < categories.length && categories[i].name !== type) {    //Itero buscando la categoría del ej que creé
                i++
            }
            if (i < categories.length) {
                cycleId = categories[i].id
            }
            else{
                console.log("No existe esta categoría")
                return "No existe"
            }
            return await this.add(routineId, cycleId, name, detail, "exercise", 1 /*duration*/, 1/*repetitions*/);
        } catch (error) {
            console.log(error);
        }
    },

    async getMyExercises(){
        try{
            const routineId = (await RoutineStore.getMyMasterRoutine()).id; //La master personal
            const categories = await RoutineStore.getCycles(routineId);

            let exercises = []
            
            categories.forEach(async (c) => {
                let exercisesInThisCat = await this.getExercises(routineId, c.id)
                exercisesInThisCat.forEach((e) => {                   
                    exercises.push({id: e.id,name: e.name, category: c.name, categoryId: c.id, detail: e.detail})
                })
            })

            return exercises;

        } catch (error) {
            console.log(error);
        }
    },

    //Borra al ejercicio de la rutina master personal (para que ya no se vea en Mis Ejercicios)
    async deleteMyExercise(exerciseId, cycleId){
        const myMasterId = (await RoutineStore.getMyMasterRoutine()).id;
        return await this.delete(myMasterId, cycleId, exerciseId);
    },

    async modifyMyExercise(routineId, cycleId, exId, name, detail){
        try {
            return await this.modify(routineId, cycleId, exId, name, detail, "exercise", 1, 1);
        } catch (error) {
            console.log(error);
        }
    },

    async getExercises(routineId, cycleId) {
        const exercises = [];
        const result =  await ExerciseApi.get(routineId, cycleId);
        result.results.forEach((e) => {
                exercises.push(new Exercise(e.id, e.name, e.detail, e.type, e.duration, e.repetitions))
            }
        )
        return exercises;
    },

    async getExercise(routineId, cycleId, exerciseId){
        const e = await ExerciseApi.get(routineId,cycleId,exerciseId)
        return new Exercise(e.id, e.name, e.detail, e.type, e.duration, e.repetitions, e.order )
    },


    async getCategories() {
        return await RoutineStore.getCycles(1) //1 es la master global
    },

    async getCategoriesName(){
        let categoriesNames = []
        let categories = await RoutineStore.getCycles(1) //1 es la master global
        categories.forEach((c) => categoriesNames.push(c.name));
        return categoriesNames;
    },
    
};

export default ExcerciseStore;