const dbase = require('../connection')

const update = async(tid,desc,responsibilities) => {
    let qry = `update role_tour set description = ?, responsibilities = ? where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[desc,responsibilities,tid])
    return {
        message: "success"
    }
}

const getbyID = async (tid) =>{
    let qry = `select * from role_tour where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[tid])
    
    return result
}


module.exports= {
    'getID':getbyID,
    'updateRole':update,
}