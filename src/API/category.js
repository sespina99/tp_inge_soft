import { Api } from './api.js';

export { CategoryApi, Category };

class CategoryApi {
    static get url() {
        return `${Api.baseUrl}/categories`;
    }

    static async get(id, controller) {
        let result;
        if (id) {
            result = await Api.get(`${CategoryApi.url}/${id}`, true, controller);
        }
        else {
            result = await Api.get(`${CategoryApi.url}`, true, controller);
        }
        return result;
    }

    static async post(categoryName, controller){
        return await Api.post(`${CategoryApi.url}`,true, new Category(undefined, categoryName),  controller);
    }

    static async getAll(controller) {
        return await Api.get(CategoryApi.url, true, controller);
    }
}


class Category {
    constructor(id, categoryname) {
        if (id) {
            this.id = id;
        }
        if (categoryname) {
            this.name = categoryname;
        }
    }
}

