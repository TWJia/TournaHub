const dbase = require('../connection')

const addNew = async(id,tid,date,time,venues) => {
    let qry = `insert into schedule values(?,?,?,?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,[id,tid,date,time,venues])
    return {
        message: "success"
    }
}
const get = async () =>{
    let qry = `select * from schedule`
    let resultGet = await dbase.executeQuery(qry)
    
    return resultGet
}

module.exports= {
    'addNew':addNew,
    'getSchedule':get,
}