import {Category, CategoryApi} from '../API/category'
const CategoryStore = {

    async getCategories() {
        const result = await CategoryApi.get();
        const categories = [];
        result.results.forEach((c) => categories.push(new Category(c.id,c.name,c.detail)));
        return categories;
    },

    async getCategory(index){
        const result = await CategoryApi.get(index);
        return new Category(result.id, result.name, result.detail);
    },

};

export default CategoryStore;