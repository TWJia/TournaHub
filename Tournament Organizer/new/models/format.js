const dbase = require('../connection')

const update = async(tid,desc,structure,rules) => {
    let qry = `update format_tour set description = ?, structure = ?, rules = ? where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[desc,structure,rules,tid])
    return {
        message: "success"
    }
}

const getbyID = async (tid) =>{
    let qry = `select * from format_tour where tournament_id = ?`
    let result = await dbase.executeQueryWithParam(qry,[tid])
    
    return result
}


module.exports= {
    'getID':getbyID,
    'updateformat':update,
}