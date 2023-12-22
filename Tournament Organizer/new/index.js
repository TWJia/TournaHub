var express= require('express');
var app = express();
var scheduleModel = require('./models/schedule');
var tournamentModel = require('./models/tournament');
var formatModel = require('./models/format');
var playerModel = require('./models/player');
var userModel = require('./models/user');
var roleModel = require('./models/role');
var colaboratorModel = require('./models/colaborator');
var coordinatorModel = require('./models/coordinator');
var cors = require('cors')
const corsOptions = {
    origin: 'localhost:3000', // Replace with your React app's domain
    optionsSuccessStatus: 200,
};

//var urlencoded = express.urlencoded({ extended: true })
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

const PORT = 3001;
  
app.post('/schedule/create',async(req, res) => {

    const { tid,date,time} = req.body;
    await scheduleModel.addNew(tid,date,time)
    var result = await scheduleModel.getSchedule();
    res.json(result)
});

app.get('/schedule',async(req, res) => {
    var result = await scheduleModel.getSchedule();
    res.json(result)
});

app.get('/schedule/:tid',async(req, res) => {
    // var result = await tournamentModel.getID(req.params.id);
    var result = await scheduleModel.getScheduleByID(req.params.tid);
    res.json(result)
});

//collaborator and coordinator CRUD
app.get('/invite-colab/:colaborator/:tid',async(req, res) => {
    await colaboratorModel.addNew(req.params.tid,req.params.colaborator);
    var result = await colaboratorModel.getcolaborator(req.params.tid);
    res.json(result)
});
app.get('/invite-coor/:coordinator/:tid',async(req, res) => {
    await coordinatorModel.addNew(req.params.tid,req.params.coordinator);
    var result = await coordinatorModel.getcoordinator(req.params.tid);
    res.json(result)
});

app.get('/all-data/:tid',async (req, res) => {
    var tid = req.params.tid;
    var tournament = await tournamentModel.getID(tid);
    var player = await playerModel.getplayer(tid);
    var coordinator = await coordinatorModel.getcoordinator(tid);
    var colaborator = await colaboratorModel.getcolaborator(tid);
    res.json({
        'tournament':tournament,
        'player':player,
        'coordinator':coordinator,
        'colaborator':colaborator
    })
});
//tournament CRUD
app.get('/tournament',async(req, res) => {
    var result = await tournamentModel.getTournament();
    res.json(result)
});
app.post('/tournament/create',async(req, res) => {
    const { id,name,date,time,venues,rules } = req.body;
    await tournamentModel.addNew(id,name,date,time,venues,rules)
    var result = await tournamentModel.getTournament();
    res.json(result)
});
app.get('/tournament/:id',async(req, res) => {
    var result = await tournamentModel.getID(req.params.id);
    res.json(result)
});
app.post('/tournament/update',async(req, res) => {
    const { id,name,date,time,venues,rules } = req.body;
    await tournamentModel.updateTournament(id,name,date,time,venues,rules)
    var result = await tournamentModel.getTournament();
    res.json(result)
});
app.delete('/tournament/:id',async(req, res) => {
    var result = await tournamentModel.deleteTournament(req.params.id);
    res.json(result)
});

//format CRUD
app.get('/role/:tid',async(req, res) => {
    var result = await roleModel.getID(req.params.tid);
    res.json(result)
});
app.post('/role/update',async(req, res) => {
    const { tid,desc,responsibilities} = req.body;
    var t = await roleModel.updateRole(tid,desc,responsibilities)
    var result = await roleModel.getID(tid);
    res.json(result)
});

//format CRUD
app.get('/format/:tid',async(req, res) => {
    var result = await formatModel.getID(req.params.tid);
    res.json(result)
});
app.post('/format/update',async(req, res) => {
    const { tid,desc,structure,rules} = req.body;
    var t = await formatModel.updateformat(tid,desc,structure,rules)
    var result = await formatModel.getID(tid);
    res.json(result)
});

//player CRUD
app.get('/player/:tid',async(req, res) => {
    var result = await playerModel.getplayer(req.params.tid);
    res.json(result)
});
app.post('/player/create',async(req, res) => {
    const { id,tid,name,email } = req.body;
    await playerModel.addNew(id,tid,name,email)
    var result = await playerModel.getplayer(tid);
    res.json(result)
});
app.delete('/player/:id',async(req, res) => {
    await playerModel.deleteplayer(req.params.id);
    var result = await playerModel.getplayer(tid);
    res.json(result)
});

//User CRUD
app.post('/user/create',async(req, res) => {
    const { id,name,username,dob,email,password } = req.body;
    var cek = await userModel.cekUser(email,username)
    if(cek == 0){
        await userModel.addNew(id,name,username,dob,email,password)
        var result = await userModel.getuser();
        return res.json(result)
    }else{
        return res.json("username/email sudah terdaftar")
    }
});
app.post('/user/update',async(req, res) => {
    const { id,name,username,dob,email,password } = req.body;
    await userModel.updateuser(id,name,username,dob,email,password)
    var result = await userModel.getuser();
    res.json(result)
});

app.get('/user',async(req, res) => {
    var result = await userModel.getuser();
    res.json(result)
});



app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})