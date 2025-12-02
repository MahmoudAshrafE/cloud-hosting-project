import prisma from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { setCookie } from "@/utils/generateToken";
import { loginSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



/**
 * @method POST
 * @route ~/api/users/login
 * @desc Login A User
 * @access public 
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto

        const validation = loginSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
        }
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        })

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 })
        }

        const passwordMatched = await bcrypt.compare(body.password, user.password)

        if (!passwordMatched) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 })
        }

        const tokenPayload = {
            id: user.id,
            email:user.email,
            isAdmin: user.isAdmin,
            username: user.username,
        }


        const cookie = setCookie(tokenPayload)
        
        return NextResponse.json({ message: "Authenticated" }, { 
            status: 200,
            headers: {"Set-Cookie": cookie}
         })

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }

}