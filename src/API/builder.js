import {FullRoutine, RoutineApi, Cycle} from "@/API/routine";
import {ExerciseApi, Exercise} from "@/API/exercise";
import {CategoryApi} from "@/API/category";

export {BuilderApi};

class BuilderApi {

    static categories = ['Master', 'Bajar de peso', 'Ponerse en forma', 'Ganar músculo', 'Indefinido'];

    static categoriesExcercise = ['Triceps', 'Biceps', 'Espalda', 'Abdominales', 'Pecho', 'Piernas', 'Descanso'];

    static exercises = [[new Exercise(undefined, 'Curl con mancuerna', 'Levante los brazos y lleve la mancuerna hacia atras', 'exercise', 1, 1),
                         new Exercise(undefined, 'Extensiones de pie con mancuernas', 'Espalda recta y lleve la mancuerna hacia atrás de su espalda ', 'exercise', 1, 1 ),
                         new Exercise(undefined, 'Patada de burro', 'Apoye una rodilla sobre un banco y lleve la mancuerna hacia atrás estirando el brazo', 'exercise', 1, 1 )],
                        [new Exercise(undefined, 'Biceps con barra', 'Espalda recta, lleve la barra hacia su pecho', 'exercise', 1, 1 ),
                            new Exercise(undefined, 'Curl con mancuerna', 'Levante los brazos y lleve la mancuerna hacia su pecho', 'exercise', 1, 1 ),
                            new Exercise(undefined, 'Curl con mancuerna parado', 'Espalda recta y lleve la mancuerna hacia atrás', 'exercise', 1, 1 )
                        ],
                        [new Exercise(undefined, 'Remo', 'Tome la manija y lleve hacia su pecho', 'exercise', 1, 1 ),
                            new Exercise(undefined, 'Flexiones escapulares', 'Posición de flexión, intente contraer y liberar su omoplato', 'exercise', 1, 1),
                            new Exercise(undefined, 'Puente invertido', 'Colóquese boca arriba y forme un puente con su tronco, levantándolo', 'exercise', 1, 1 )
                        ],
                        [new Exercise(undefined, 'Plancha', 'En 4 patas y espalda recta, levante gluteos', 'exercise', 1, 1),
                            new Exercise(undefined, 'Plancha Superman', 'En 4 patas y espalda recta, levante gluteos y mantenga un brazo y una pierna estirada', 'exercise', 1, 1 ),
                            new Exercise(undefined, 'Elevaciones', 'Sobre plano inclinado, levante su pecho hasta los 90 grados', 'exercise', 1, 1 ),
                        ],
                        [ new Exercise(undefined, 'Press', 'Tome la mancuerna o barra y levante y baje sus brazos al pecho', 'exercise', 1, 1 ),
                            new Exercise(undefined, 'Press inclinado', 'Sobre plano inclinado, tome la mancuerna o barra y levante y baje sus brazos al pecho', 'exercise', 1, 1),
                        ],
                        [new Exercise(undefined, 'Gemelos', 'Sobre una elevacion, estire el gemelo', 'exercise', 1, 1, 15 ),
                            new Exercise(undefined, 'Cuadriceps', 'En banco, levante y suba el peso hasta posición de 90 grados', 'exercise', 1, 1 ),
                        ],
                        [new Exercise(undefined, 'Descanso', 'Relajese', 'rest', 1, 1 )]];


    static routines = [new FullRoutine(undefined, 'Calentando Motores', 'Una buena forma de empezar', 'rookie', true, undefined, undefined, 2, undefined),
                       new FullRoutine(undefined, '100% calorias', 'excelente forma de quemar calorias', 'beginner', true, undefined, undefined, 3, undefined),
                        new FullRoutine(undefined, 'Apto para cualquiera', 'una excelente forma de empezar', 'expert', true, undefined, undefined, 4, undefined)];

    static cycles = [ new Cycle(undefined, 'Calentamiento', 'Calentamiento', 'warmup', 1, 1 ),
                    new Cycle(undefined, 'Ejercitacion principal 1', 'Ejercitacion principal 1', 'exercise', 2, 1 ),
                    new Cycle(undefined, 'Enfriamiento', 'Enfriamento', 'cooldown', 3, 1 ),];

    static masterId = 1;

    static async createMaster(){
        let result = await CategoryApi.get();
        if(result.results.length !== 0){
            return false;
        }

        for(let i = 0; i < BuilderApi.categories.length; i++){
            await CategoryApi.post(this.categories[i]);
        }

        await RoutineApi.add(new FullRoutine(undefined, 'Rutina Master', 'Rutina Master', 'expert', true, undefined, undefined, 1, undefined));

        for(let i = 0; i < BuilderApi.categoriesExcercise.length; i++){
            await RoutineApi.addCycle(1, new Cycle(undefined, this.categoriesExcercise[i], this.categoriesExcercise[i], 'warmup', i + 1, 1 ));
        }

        for(let i = 0; i < BuilderApi.exercises.length; i++){
            for(let j = 0; j < this.exercises[i].length; j++) {
                await ExerciseApi.add(1, i+1, this.exercises[i][j])
            }
        }

    }

    static async createMyExercises(){

         let result = await RoutineApi.getCurrentRoutines();

         if(result.results.length <= 1) {
             result = await RoutineApi.add(new FullRoutine(undefined, 'Rutina Personal', 'Rutina Personal', 'expert', false, undefined, undefined, 1, undefined));
             for(let i = 0; i < BuilderApi.categoriesExcercise.length; i++){
                 await RoutineApi.addCycle(result.id, new Cycle(undefined, this.categoriesExcercise[i], this.categoriesExcercise[i], 'warmup', i + 1, 1 ));
             }
         }
    }

    static async createFirstRoutines(){
        let routine;
        let cycle;

        let result = await RoutineApi.getCurrentRoutines();

        let firstLoginEver = false;

        if(result.results.length < 3) {
            for (let i = 0; i < result.results.length && !firstLoginEver; i++) {
                if (result.results[i].name === 'Rutina Master'){
                    firstLoginEver = true;
                }
            }
        }

        if(firstLoginEver) {
            for (let i = 0; i < BuilderApi.routines.length; i++) {
                routine = await RoutineApi.add(BuilderApi.routines[i]);
                for (let j = 0; j < BuilderApi.cycles.length; j++) {
                    cycle = await RoutineApi.addCycle(routine.id, BuilderApi.cycles[j]);
                    await ExerciseApi.add(routine.id, cycle.id, this.exercises[0][0]);
                    await ExerciseApi.add(routine.id, cycle.id, this.exercises[1][1]);
                    await ExerciseApi.add(routine.id, cycle.id, this.exercises[2][2]);
                }
            }
        }
    }

}
