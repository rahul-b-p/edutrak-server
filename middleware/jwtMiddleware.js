const jwt = require('jsonwebtoken')


const jwtMiddleware =(req,res,next)=>{
    const authHeader = req.headers.authentication
    const token =authHeader.split(' ')[1]
    // console.log(token);
    
    
    
    // verify
    try {
        const jwtResponse = jwt.verify(token,'eduTrakOpen')
        // console.log(jwtResponse);
        // console.log(userId);
        
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(406).json('Authorization failed ......... PLease Login')
    }
}

module.exports= jwtMiddleware