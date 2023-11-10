import jwt from "jsonwebtoken"
import moment from "moment"
class jwtservice {
    createToken = (user) => {
        let payload = {
            userId: user.id, //error
            createAt: moment().unix(),
            expiresAt:moment().add(1,'day').unix()
        }
        return jwt.sign(payload,process.env.TOKEN_KEY)
    }
    checktoken = (req,res,next) => {
        if(!req.headers['user_token']){
            return res.json({
                error: "You must include the header"
            });
        }
        const token = req.headers['user_token']
        let payload = null
        try {
            payload = jwt.decode(token,procces.env.TOKEN_KEY)
        } catch(err){
            return res.json({
                error:'invalid token'
            })
        }
        if(moment().unix() > payload.expiresAt){
            return res.json({error: 'Expired token'})
        }
        req.userId = payload.userId
        next();
    }
}
export default jwtservice;