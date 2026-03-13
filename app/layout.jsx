import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'LM Lettings',
    keywords: 'rental, property, real estate, lettings',
    description: 'Find the perfect rental property with LM Lettings',
};

const MainLayout = (  { children}  ) => {
    return ( 
        <AuthProvider>
           <GlobalProvider>
        <html>
            <body suppressHydrationWarning={true} className="flex flex-col min-h-screen bg-white">
                <Navbar />
                <main className="flex-grow">{ children }</main>
                <Footer />
                <ToastContainer />
            </body>
        </html>
        </GlobalProvider>
        </AuthProvider>

     );
}
 
export default MainLayout ;