import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method GET
 * @route ~/api/users
 * @desc Get all users
 * @access private (only admin)
 */
export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user || !user.isAdmin) {
            return NextResponse.json(
                { message: "Access denied, only admin can view users" },
                { status: 403 }
            );
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                isAdmin: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
