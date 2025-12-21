import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 * @method POST
 * @route ~/api/users/forgot-password
 * @desc Forgot Password Request
 * @access public
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json(
                { message: "User with this email does not exist" },
                { status: 404 }
            );
        }

        // In a real application, you would generate a reset token and send it via email.
        // For development purposes, we'll just return a success message.
        // We could also return a "mock" reset link in the console or a specific field for testing.

        console.log(`Password reset requested for: ${email}`);

        return NextResponse.json(
            { message: "If an account exists for this email, you will receive a reset link shortly." },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
