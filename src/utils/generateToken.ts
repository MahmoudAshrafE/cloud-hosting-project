
import  jwt  from 'jsonwebtoken'
import { JWTPAYLOAD } from './types';
import { serialize } from 'cookie';


export function generateToken (jwtPayload: JWTPAYLOAD): string {

    const privateKey = process.env.JWT_SECRET as string
           const token = jwt.sign(jwtPayload, privateKey , {
            expiresIn: "10d"
        })

        return token;

}


export function setCookie (jwtPayload: JWTPAYLOAD): string {
        const token = generateToken(jwtPayload)

        const cookie = serialize('jwtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 *10 
        })
        return cookie;
}