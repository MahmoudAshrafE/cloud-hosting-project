import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from 'bcryptjs';

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update User Profile (Password)
 * @access private (User himself)
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userPayload = verifyToken(request);
        if (!userPayload) {
            return NextResponse.json({ message: "No token provided, access denied" }, { status: 401 });
        }

        const { id } = await params;
        const userId = parseInt(id);

        if (userPayload.id !== userId) {
            return NextResponse.json({ message: "You can only update your own profile" }, { status: 403 });
        }

        const body = await request.json();

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Password Update Logic
        if (body.password) {
            // Verify current password
            if (!body.currentPassword) {
                return NextResponse.json({ message: "Current password is required to set a new password" }, { status: 400 });
            }

            const isPasswordMatch = await bcrypt.compare(body.currentPassword, user.password);
            if (!isPasswordMatch) {
                return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }

        // Update User
        // Note: This only updates password if provided. 
        // If we want to support other fields (username, email) later, we can add them to 'data'.
        // For now, ChangePasswordForm only sends password.
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: body.password
            }
        });

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Update Profile Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
