'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


async function getUnreadMessegeCount() {

    
        await connectDB()
    
        const sessionUser = await getSessionUser();
    
        if (!sessionUser || !sessionUser.userId) {
            throw new Error('User ID is required');
        }
    
    const { userId } =sessionUser;

    const messages = await Message.find({ recipient: userId, read: false })
        .populate('property', '_id')
        .lean();

    const count = messages.filter((m) => m.property !== null).length;

    return { count };



  
}

export default getUnreadMessegeCount;