const pool = require('../config/db.config')

const model = {

    //create entry
    createEntry: async(info) => {
        const { sensor_id, sensor_name, description,unit,use_in_optimization, current_value, optimized_value, operator_low, operator_high, status} = info;

        const query = 'INSERT INTO sensor_project(sensor_name, description, unit, use_in_optimization, current_value,optimized_value,operator_low,operator_high,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
        const values = [sensor_name,description,unit,use_in_optimization, current_value, optimized_value, operator_low, operator_high, status];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getData: async() => {
        const query = 'SELECT * FROM sensor_project order by sensor_id asc';
        const result = await pool.query(query);
        return result.rows;
    },

    editData: async(editDataArray) => {
        const results=[];
        console.log(editDataArray);
        for(const editData of editDataArray) {
            const {sensor_id, operator_low, operator_high,use_in_optimization} = editData;
            const query = 'UPDATE sensor_project SET operator_low = $1, operator_high = $2,use_in_optimization=$4 WHERE sensor_id = $3 RETURNING *';
            const values = [operator_low, operator_high, sensor_id,use_in_optimization];
            const result = await pool.query(query,values);
            results.push(result.rows[0]);
        }
        return results;
    }

    
}

module.exports = model