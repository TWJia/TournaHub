const dbase = require('../connection')

const addNew = async(id,tid,name,email) => {
    let qry = `insert into player values(?,?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,[id,tid,name,email])
    return {
        message: "success"
    }
}

const get = async (tid) =>{
    let qry = `select * from player where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[tid])
    
    return result
}

const deletes = async (id) =>{
    let qry = `delete from player where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getplayer':get,
    'deleteplayer':deletes
}