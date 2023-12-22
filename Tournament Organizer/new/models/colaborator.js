const dbase = require('../connection')

const addNew = async(tid,colaborator) => {
    let qry = `insert into colaborator values(?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,['',tid,colaborator])
    return {
        message: "success"
    }
}

const get = async (tid) =>{
    let qry = `select * from colaborator where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[tid])
    
    return result
}

const deletes = async (id) =>{
    let qry = `delete from colaborator where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getcolaborator':get,
    'deletecolaborator':deletes
}