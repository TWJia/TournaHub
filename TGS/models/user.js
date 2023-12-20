const dbase = require('../connection')

const addNew = async(id,name,username,dob,email,password) => {
    let qry = `insert into user values(?,?,?,?,?,?)`
    let result = await dbase.executeQueryWithParam(qry,[id,name,username,dob,email,password])
    return {
        message: "success"
    }
}

const update = async(id,name,username,dob,email,password) => {
    let qry = `update user set name = ?, username = ?, dob = ?, email = ?,password = ? where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[name,username,dob,email,password,id])
    return {
        message: "success"
    }
}

const get = async () =>{
    let qry = `select * from user`
    let resultGet = await dbase.executeQuery(qry)
    
    return resultGet
}

const deletes = async (id) =>{
    let qry = `delete from user where id = ?`
    let result = await dbase.executeQueryWithParam(qry,[id])
    
    return result
}

module.exports= {
    'addNew':addNew,
    'getuser':get,
    'updateuser':update,
    'deleteuser':deletes
}