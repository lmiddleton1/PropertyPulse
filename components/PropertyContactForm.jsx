'use client';
import { useEffect, useActionState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/addMessage";
import SubmitMessageButton from "./SubmitMessageButton";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success('Message sent successfully');
  }, [state]);

  if (state.submitted) {
    return <p className="text-green-400 font-medium mb-4">Your message has been sent.</p>;
  }

  return (
    session && session.user.id !== property.owner && (
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction} className="space-y-4">
          <input type="hidden" id="property" name="property" defaultValue={property._id} />
          <input type="hidden" id="recipient" name="recipient" defaultValue={property.owner} />

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              id="phone"
              name="phone"
              type="text"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="body">
              Message
            </label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 h-36 focus:outline-none focus:border-blue-500"
              id="body"
              name="body"
              placeholder="Your message"
            />
          </div>

          <SubmitMessageButton />
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
