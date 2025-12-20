import prisma from "@/utils/db";

export async function getAllUsers() {
    try {
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
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
