const dbase = require('../connection')

const addNew = async(id,name,email) => {
    let qry = `insert into player values(?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,[id,name,email])
    return {
        message: "success"
    }
}

const update = async(id,name,email) => {
    let qry = `update player set name = ?, email = ? where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[name,email,id])
    return {
        message: "success"
    }
}

const get = async () =>{
    let qry = `select * from player`
    let resultGet = await dbase.executeQuery(qry)
    
    return resultGet
}

const deletes = async (id) =>{
    let qry = `delete from player where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getplayer':get,
    'updateplayer':update,
    'deleteplayer':deletes
}