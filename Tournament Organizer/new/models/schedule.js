const dbase = require('../connection')

const addNew = async(tid,date,time) => {
    let qry = `insert into schedule (tournament_id, date, time) values (?, ?, ?)`;
    let result = await dbase.executeQueryWithParam(qry,[tid,date,time])
    return {
        message: "success"
    }
}
const get = async () =>{
    let qry = `select * from schedule`
    let resultGet = await dbase.executeQuery(qry)
    
    return resultGet
}

const getBYID = async (tid) =>{
    let qry = `select * from schedule where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[tid])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getScheduleByID':getBYID,
    'getSchedule':get,
}