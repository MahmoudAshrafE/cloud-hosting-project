import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });


        response.cookies.set({
            name: "jwtToken",
            value: "",
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 0, 
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
