var express= require('express');
var app = express();
var scheduleModel = require('./models/schedule');
var tournamentModel = require('./models/tournament');
var playerModel = require('./models/player');
var userModel = require('./models/user');

var urlencoded = express.urlencoded({ extended: true })

const PORT = 3001;

app.post('/schedule/create',urlencoded,async(req, res) => {

    const { id,tid,date,time,venues } = req.body;
    await scheduleModel.addNew(id,tid,date,time,venues)
    var result = await scheduleModel.getSchedule();
    res.send(result)
});

//tournament CRUD
app.get('/tournament',urlencoded,async(req, res) => {
    var result = await tournamentModel.getTournament();
    res.json(result)
});
app.post('/tournament/create',urlencoded,async(req, res) => {
    const { id,name,date,time,venues,rules } = req.body;
    await tournamentModel.addNew(id,name,date,time,venues,rules)
    var result = await tournamentModel.getTournament();
    res.send(result)
});
app.get('/tournament/:id',urlencoded,async(req, res) => {
    var result = await tournamentModel.getID(req.params.id);
    res.send(result)
});
app.post('/tournament/update',urlencoded,async(req, res) => {
    const { id,name,date,time,venues,rules } = req.body;
    await tournamentModel.updateTournament(id,name,date,time,venues,rules)
    var result = await tournamentModel.getTournament();
    res.send(result)
});
app.delete('/tournament/:id',urlencoded,async(req, res) => {
    var result = await tournamentModel.deleteTournament(req.params.id);
    res.send(result)
});

//player CRUD
app.post('/player/create',urlencoded,async(req, res) => {
    const { id,name,email } = req.body;
    await playerModel.addNew(id,name,email)
    var result = await playerModel.getplayer();
    res.send(result)
});
app.delete('/player/:id',urlencoded,async(req, res) => {
    await playerModel.deleteplayer(req.params.id);
    var result = await playerModel.getplayer();
    res.send(result)
});

//User CRUD
app.post('/user/create',urlencoded,async(req, res) => {
    const { id,name,username,dob,email,password } = req.body;
    await userModel.addNew(id,name,username,dob,email,password)
    var result = await userModel.getuser();
    res.send(result)
});
app.post('/user/update',urlencoded,async(req, res) => {
    const { id,name,username,dob,email,password } = req.body;
    await userModel.updateuser(id,name,username,dob,email,password)
    var result = await userModel.getuser();
    res.send(result)
});


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})