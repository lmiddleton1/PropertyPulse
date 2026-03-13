export const dynamic = 'force-dynamic';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import { convertToSerializableObject } from "@/utils/ConvertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessegeCard from "@/components/MessegeCard";

const MessagesPage = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    // Messages received (unread first)
    const receivedDocs = await Message.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    // Messages sent by this user (so they can see replies)
    const sentDocs = await Message.find({ sender: userId })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const serialize = (docs, type) =>
        docs
            .filter((d) => d.property !== null)
            .map((d) => {
                const m = convertToSerializableObject(d);
                m.sender = convertToSerializableObject(d.sender);
                m.property = convertToSerializableObject(d.property);
                m.replies = (d.replies || []).map((r) => ({
                    _id: r._id?.toString(),
                    senderName: r.senderName,
                    body: r.body,
                    createdAt: r.createdAt?.toISOString(),
                }));
                m._type = type;
                return m;
            });

    const received = serialize(receivedDocs, 'received');
    // Only show sent messages that have at least one reply
    const sent = serialize(sentDocs, 'sent').filter((m) => m.replies?.length > 0);

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Messages</h1>
                <p className="text-gray-500 mt-1">Enquiries and replies</p>
            </div>

            {/* Received */}
            <div className="mb-8">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Received</h2>
                {received.length === 0 ? (
                    <p className="text-gray-500 text-sm">No messages received</p>
                ) : (
                    <div className="space-y-4">
                        {received
                            .sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1))
                            .map((message) => (
                                <MessegeCard key={message._id} message={message} />
                            ))}
                    </div>
                )}
            </div>

            {/* Sent with replies */}
            {sent.length > 0 && (
                <div>
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Replies to your enquiries</h2>
                    <div className="space-y-4">
                        {sent.map((message) => (
                            <MessegeCard key={message._id} message={message} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default MessagesPage;
