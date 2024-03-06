const model = require('../model/model');
const service = require('../services/services');
const controller = {
   
    //create new entry
    createEntry: async(req,res) => {
        console.log(req);
        
        try {
            const info = req.body;
            console.log("info is"+""+info)
            const newEntry = await service.createEntry(info);
            res.status(201).json(newEntry);
            console.log('work');
            console.log('New entry created:', newEntry);
        } catch (error) {
            console.error('Error creating entry:',error);
            res.status(500).json({error: 'Server error'});
        }
    },

    getData: async(req,res) => {
        try {
            const db_data = await service.getData();
            res.json(db_data);
        } catch (error) {
            res.status(500).json({error: 'Server error'});
        }
    },
    editData: async(req,res) => {
        
        try {
           const editDataArray = req.body;
           const editedRows = await service.editData(editDataArray);
           res.status(200).json(editedRows);
        } catch (error) {
            res.status(500).json({error: 'Server error'});
        }
    },

    

}

module.exports = controller;