const model_object = require('../model/model')

class Service{
    async createEntry(info) {
        try {
            return await model_object.createEntry(info);
        } catch (error) {
            return error;
        }
    };
    async getData() {
        try {
            return await model_object.getData();
        } catch (error) {
            return error;
        }
    };
    async editData(editDataArray) {
        try {
            return await model_object.editData(editDataArray);
        } catch (error) {
            return error;
        }
    };
    
}

module.exports = new Service();