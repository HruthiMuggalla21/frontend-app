const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/create', (req, res, next) => {
    const { body } = req;

    // Check if "Sensor Name" is present and not empty
    if (!body['sensor_name']) {
        return res.status(400).json({ error: 'Sensor Name is required' });
    }

    next();
});
//create new entry
router.post('/create', async(req,res) => {

    try {
       await controller.createEntry(req,res);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error'});
    }
});

//get the data
router.get('/getData', async(req,res) => {
    try {
        await controller.getData(req,res);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error'});
    }
});

//edit the data
router.put('/editData', async(req,res) => {
    try {
        await controller.editData(req,res);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error'});
    }
});



module.exports= router;