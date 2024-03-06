const pool = require('../config/db.config')

const model = {

    //create entry
    createEntry: async(info) => {
        const {sensor_name, description,unit,use_in_optimization, current_value, optimized_value, operator_low, operator_high, status} = info;

        const query = 'INSERT INTO sensor_data(sensor_name, description, unit, use_in_optimization, current_value,optimized_value,operator_low,operator_high,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
        const values = [sensor_name,description,unit,use_in_optimization, current_value, optimized_value, operator_low, operator_high, status];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getData: async() => {
        const query = 'SELECT * FROM sensor_data';
        const result = await pool.query(query);
        return result.rows;
    },

    // editData: async(SensorName, editDbInfo) => {
    //     const {operator_low, operator_high} = editDbInfo;

    //     const query = 'UPDATE sensor_data SET operator_low = $1, operator_high = $2 WHERE sensor_name = $3 RETURNING *';
    //     const values=[operator_low, operator_high, SensorName];
    //     const result = await pool.query(query, values);
    //     return result.rows[0];
    // },

    editData: async(editDataArray) => {
        const results=[];
        for(const editData of editDataArray) {
            const {sensor_name, operator_low, operator_high} = editData;
            const query = 'UPDATE sensor_data SET operator_low = $1, operator_high = $2 WHERE sensor_name = $3 RETURNING *';
            const values = [operator_low, operator_high, sensor_name];
            const result = await pool.query(query,values);
            results.push(result.rows[0]);
        }
        return results;
    }

    
}

module.exports = model