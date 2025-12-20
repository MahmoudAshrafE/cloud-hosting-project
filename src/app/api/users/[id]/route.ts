import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method DELETE
 * @route ~/api/users/:id
 * @desc Delete a user
 * @access private (admin or user himself)
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userPayload = verifyToken(request);
        if (!userPayload) {
            return NextResponse.json({ message: "No token provided, access denied" }, { status: 401 });
        }

        const { id } = await params;
        const userId = parseInt(id);

        if (isNaN(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        // Access Control: Only admin OR the user themselves can delete the account
        if (userPayload.id !== userId && !userPayload.isAdmin) {
            return NextResponse.json(
                { message: "Access denied, you can only delete your own account" },
                { status: 403 }
            );
        }

        // Check if user exists
        const userToDelete = await prisma.user.findUnique({ where: { id: userId } });
        if (!userToDelete) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        await prisma.user.delete({ where: { id: userId } });

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
