const dbase = require('../connection')

const addNew = async(tid,coordinator) => {
    let qry = `insert into coordinator values(?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,['',tid,coordinator])
    return {
        message: "success"
    }
}

const get = async (tid) =>{
    let qry = `select * from coordinator where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[tid])
    
    return result
}

const deletes = async (id) =>{
    let qry = `delete from coordinator where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getcoordinator':get,
    'deletecoordinator':deletes
}