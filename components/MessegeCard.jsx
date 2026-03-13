'use client';
import { useState } from "react";
import { toast } from 'react-toastify';
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import replyToMessage from "@/app/actions/replyToMessage";
import { useGlobalContext } from "@/context/GlobalContext";
import { FaEnvelope, FaPhone, FaClock, FaTrash, FaCheckCircle, FaCircle, FaReply } from 'react-icons/fa';

const MessageCard = ({ message }) => {
    const isSent = message._type === 'sent';
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [replyBody, setReplyBody] = useState('');
    const [replySending, setReplySending] = useState(false);
    const [replies, setReplies] = useState(message.replies || []);
    const { setUnreadCount } = useGlobalContext();

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id);
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? Math.max(0, prevCount - 1) : prevCount + 1));
        toast.success(`Marked as ${read ? 'Read' : 'New'}`);
    };

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);
        setIsDeleted(true);
        setUnreadCount((prevCount) => (isRead ? prevCount : Math.max(0, prevCount - 1)));
        toast.success('Message Deleted');
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyBody.trim()) return;
        setReplySending(true);
        try {
            await replyToMessage({ messageId: message._id, body: replyBody });
            setReplies((prev) => [
                ...prev,
                { senderName: 'You', body: replyBody, createdAt: new Date().toISOString() },
            ]);
            setReplyBody('');
            setShowReply(false);
            toast.success('Reply sent');
        } catch {
            toast.error('Failed to send reply');
        } finally {
            setReplySending(false);
        }
    };

    if (isDeleted) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
            {/* New badge */}
            {!isRead && (
                <span className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    New
                </span>
            )}

            {/* Property name + message body */}
            <h2 className="text-base font-bold text-gray-900 mb-1 pr-16">
                {message.property.name}
            </h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{message.body}</p>

            {/* Contact details */}
            <div className="space-y-1.5 mb-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaEnvelope className="text-gray-400 shrink-0" />
                    <a href={`mailto:${message.email}`} className="hover:text-gray-900 transition-colors">
                        {message.email}
                    </a>
                </div>
                {message.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaPhone className="text-gray-400 shrink-0" />
                        <a href={`tel:${message.phone}`} className="hover:text-gray-900 transition-colors">
                            {message.phone}
                        </a>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaClock className="text-gray-400 shrink-0" />
                    <span>{new Date(message.createdAt).toLocaleString()}</span>
                </div>
            </div>

            {/* Reply thread */}
            {replies.length > 0 && (
                <div className="border-t border-gray-100 pt-4 mb-4 space-y-3">
                    {replies.map((reply, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                                {reply.senderName}
                            </p>
                            <p className="text-sm text-gray-700">{reply.body}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(reply.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Reply form */}
            {showReply && (
                <form onSubmit={handleReplySubmit} className="border-t border-gray-100 pt-4 mb-4">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Your Reply
                    </label>
                    <textarea
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                        rows={3}
                        placeholder="Write your reply..."
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        required
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            type="submit"
                            disabled={replySending}
                            className="bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-xl text-sm transition-colors disabled:opacity-50"
                        >
                            {replySending ? 'Sending...' : 'Send Reply'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowReply(false)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <button
                    onClick={() => setShowReply((v) => !v)}
                    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl text-sm transition-colors"
                >
                    <FaReply className="text-xs" /> Reply
                </button>
                {!isSent && (
                    <>
                        <button
                            onClick={handleReadClick}
                            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-xl text-sm transition-colors"
                        >
                            {isRead ? <FaCircle className="text-xs" /> : <FaCheckCircle className="text-xs" />}
                            {isRead ? 'Mark As New' : 'Mark As Read'}
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-medium py-2 px-4 rounded-xl text-sm transition-colors"
                        >
                            <FaTrash className="text-xs" /> Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MessageCard;
