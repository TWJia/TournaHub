const dbase = require('../connection')

const addNew = async(id,name,date,time,venues,rules) => {
    let qry = `insert into tournament values(?,?,?,?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,[id,name,date,time,venues,rules])
    let qry2 = `insert into format_tour values(?,?,?,?,?)`
    let result2 = await dbase.executeQueryWithParam(qry2,['',result.insertId,'','',''])
    let qry3 = `insert into role_tour values(?,?,?,?)`
    let result3 = await dbase.executeQueryWithParam(qry3,['',result.insertId,'',''])

    return {
        message: "success"
    }
}

const update = async(id,name,date,time,venues,rules) => {
    let qry = `update tournament set name = ?, date = ?, time = ?,venues = ?, rules = ? where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[name,date,time,venues,rules,id])
    return {
        message: "success"
    }
}

const get = async () =>{
    let qry = `select * from tournament`
    let resultGet = await dbase.executeQuery(qry)
    
    return resultGet
}

const getbyID = async (id) =>{
    let qry = `select * from tournament where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

const deleteTour = async (id) =>{
    let qry = `delete from tournament where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getTournament':get,
    'getID':getbyID,
    'updateTournament':update,
    'deleteTournament':deleteTour
}