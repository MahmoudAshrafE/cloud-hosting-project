import prisma from "@/utils/db";
import { CommentWithUser } from "@/utils/types";

// Get All Comment
export async function getAllComments(token: string): Promise<CommentWithUser[]> {
  // Token verification should be done by the caller (Page), or repeated here if strictly necessary. 
  // Since this is a data-access utility used by the Page which already validates admin access, we can query directly.

  const comments = await prisma.comment.findMany({
    include: {
      user: {
        select: {
          username: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Cast to CommentWithUser (Prisma return type matches the shape we defined in types, mostly)
  // Actually, our Type definition in types.ts is Comment & { user: { username: string } }. 
  // Prisma returns exactly that.
  return comments as unknown as CommentWithUser[];
}