import jwt from 'jsonwebtoken'


const verificarAutenticacion = (req,res,next)=>{

if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})  

    const {authorization} = req.headers

    try {

        const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        req.id = id
        req.rol = rol
        next()
        
    } catch (error) {
        return res.status(401).json({msg:"Lo sentimos, token  no valido"})
    }

}



export default verificarAutenticacion