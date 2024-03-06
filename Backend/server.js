const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Routes = require('./routes/route')

dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/api', Routes);

PORT = process.env.BACKEND_PORT

app.listen(PORT, () => {
    console.log(`server is listening in port ${PORT}`)
})