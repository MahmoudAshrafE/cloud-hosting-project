import { NextRequest } from "next/server";
import { JWTPAYLOAD } from "./types";
import jwt from "jsonwebtoken";

export function verifyToken(request: NextRequest): JWTPAYLOAD | null {
    try {

        const jwtToken = request.cookies.get('jwtToken')
        const authToken = jwtToken?.value as string
        if (!authToken) {
            return null;
        }
        const userPayload = jwt.verify(authToken, process.env.JWT_SECRET as string) as JWTPAYLOAD
        return userPayload;

    } catch {
        return null
    }
}


export function verifyTokenBerPage(token: string): JWTPAYLOAD | null {
    try {
        const userPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPAYLOAD
        if (!userPayload) {
            return null;
        }
        return userPayload;

    } catch {
        return null
    }
}