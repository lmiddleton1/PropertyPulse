import { useFormStatus } from "react-dom";

const { FaPaperPlane } = require("react-icons/fa")



const SubmitMessageButton = () => {


    const { pending } = useFormStatus();

    return ( 

        <button className='bg-white hover:bg-gray-100 text-gray-900 font-medium py-2.5 px-4 rounded-xl w-full focus:outline-none flex items-center justify-center transition-colors text-sm' type='submit'
        disabled ={pending}
        >

            <FaPaperPlane className='mr-2' />{' '} 
            {pending ? 'Sending...' : 'Send Message'}
            </button>
            );
        
        };

 
export default SubmitMessageButton ;