'use client';
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ( { error}) => {
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-16">
                    <div className="flex justify-center mb-6">
                        <span className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center">
                            <FaExclamationTriangle className="text-red-400 text-4xl" />
                        </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Something went wrong</h2>
                    <p className="text-gray-400 text-sm mb-8">
                        {error.message || 'An unexpected error occurred.'}
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

export default ErrorPage;