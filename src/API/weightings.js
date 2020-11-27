import { Api } from './api.js';
import { CurrentUserApi } from './currentUser.js';

export { Weightings, Weighting};

class Weightings {

    static get url() {
        return `${CurrentUserApi.url}/weightings`;
    }

    static async addWeighting(weighting, controller) {
        return await Api.post(`${Weightings.url}`, true, weighting, controller);
    }

    //Siempre trabajamos sobre el 'weighting' en el índice 0 pues no ofrecemos un historial

    static async getWeighting(controller){
        try {
            let weightings = await Api.get(`${Weightings.url}`, true, controller);
            if (weightings.results[0] == undefined){
                try {
                    const weighting = new Weighting(0.1, 0.1);
                    await this.addWeighting(weighting)
                    return await Api.get(`${Weightings.url}`, true, controller);       //Vuelvo a llamar el método
                } catch (error) {
                    console.log(error);
                    return undefined;
                }
            }
            return weightings.results[0];
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    static async editWeighting(weighting, controller){
        try {
            let previous = await this.getWeighting();
            let id = previous.id;
            let url = `${Weightings.url}/` + parseInt(id);
            return await Api.put(url, true, weighting, controller);
        }
        catch(error){
            console.log(error)
        }
    }
    
}

class Weighting {
    constructor(weight, height) {
        this.weight = parseFloat(weight);
        this.height = parseFloat(height);
    }
}
