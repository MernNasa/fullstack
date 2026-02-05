const authorization=(...authorizationroles)=>{
    return(req,res,next)=>{
        console.log(req.role)
        if(!authorizationroles.includes(req.role)){
           return res.status(403).json({message:"You are not allowed"})
        }
        next()
    }
}

module.exports=authorization