const { QueryTypes } = require('sequelize');
const sequelize  = require('../databases/connection.js');

const { use } = require('../routes/route.js');


const addAccount = async (req, res) => {
    const nama = req.body.nama;
    const username = req.body.username;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const password = req.body.password;

    if(!username || !password || !nama || !dateOfBirth || !email){
        return res.status(400).json({message:"Invalid"});
    }
    
}


module.exports = {
    addAccount
}