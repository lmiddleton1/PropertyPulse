import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-16">
                    <div className="flex justify-center mb-6">
                        <span className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                            <FaHome className="text-gray-400 text-4xl" />
                        </span>
                    </div>
                    <h1 className="text-8xl font-extrabold text-gray-900 mb-3">404</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Page not found</h2>
                    <p className="text-gray-400 text-sm mb-8">
                        Looks like this property has been sold, moved, or never listed.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors text-sm"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;