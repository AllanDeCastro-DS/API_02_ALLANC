function response(stg,msg,aftrows,data=nul){
    return{
        status:stg,
        message:msg,
        after_rows:aftrows,
        data:data,
        timestamp:new Date().getTime()
    }
}

module.exports={
    response
}