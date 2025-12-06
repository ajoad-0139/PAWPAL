import jwt from 'jsonwebtoken'
import config from 'config'

const jwtSecret=config.get<string>('jwtSecret')

const generateToken=(email:string)=>{
    const token=jwt.sign({email},jwtSecret,{
        expiresIn:'1d'
    })
    
    return token
}

export default generateToken;