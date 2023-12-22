const express = require('express');
const app = express();
const port = 5000;
const routes = require('./routes/route');
const databases = require('./databases/connection');


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/', routes);



const start = async () => {
    console.log('Starting server...');
    try {
        await databases.authenticate();
        console.log('Succesfully connected to the database!');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start();
