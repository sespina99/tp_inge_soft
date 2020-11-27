import {Api} from "@/API/api";
export {ExerciseApi, Exercise};

class ExerciseApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static get urlCycle(){
        return 'cycles'
    }

    static get urlExercise(){
        return 'exercises'
    }

    static async add(routineId, cycleId, exercise,  controller) {
        return await Api.post(`${ExerciseApi.url}/${routineId}/${ExerciseApi.urlCycle}/${cycleId}/${ExerciseApi.urlExercise}`, true, exercise, controller);
    }

    static async modify(routineId, cycleId, exercise, controller) {
        return await Api.put(`${ExerciseApi.url}/${routineId}/${ExerciseApi.urlCycle}/${cycleId}/${ExerciseApi.urlExercise}/${exercise.id}`, true, exercise, controller);
    }

    static async delete(routineId, cycleId, exerciseId, controller) {
        return await Api.delete(`${ExerciseApi.url}/${routineId}/${ExerciseApi.urlCycle}/${cycleId}/${ExerciseApi.urlExercise}/${exerciseId}`, true, controller);
    }

    static async get(routineId, cycleId, exerciseId, controller) {
        let result;
        if (exerciseId) {
            result = await Api.get(`${ExerciseApi.url}/${routineId}/${ExerciseApi.urlCycle}/${cycleId}/${ExerciseApi.urlExercise}/${exerciseId}`, true, controller);
        }
        else {
            result = await Api.get(`${ExerciseApi.url}/${routineId}/${ExerciseApi.urlCycle}/${cycleId}/${ExerciseApi.urlExercise}`, true, controller);
        }
        if(result.code){
            throw result
        }
        return result;
    }

}

class Exercise{

    constructor(id, name,detail,type,duration,repetitions) {

        if(id){
            this.id = id
        }

        this.name = name;

        this.detail = detail;

        this.type = type;

        this.duration = parseInt(duration);

        this.repetitions = parseInt(repetitions);

    }

}
