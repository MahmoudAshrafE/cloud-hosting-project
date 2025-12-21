import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout A User
 * @access public 
 */


export async function GET(_request: NextRequest) {
    try {
        (await cookies()).delete('jwtToken')
        return NextResponse.json({ message: "logout" }, { status: 200 })
    } catch {
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}