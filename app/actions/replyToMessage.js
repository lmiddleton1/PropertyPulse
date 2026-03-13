'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function replyToMessage({ messageId, body }) {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) throw new Error('Not authenticated');

    const { user } = sessionUser;

    await Message.findByIdAndUpdate(messageId, {
        $push: {
            replies: {
                senderName: user.name || 'Property Manager',
                body,
                createdAt: new Date(),
            },
        },
    }, { strict: false });

    revalidatePath('/messages');
    return { submitted: true };
}

export default replyToMessage;
