'use client';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

const DeletePropertyButton = ({ propertyId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await deleteProperty(propertyId);
      toast.success('Property deleted');
      router.push('/properties');
    } catch (error) {
      toast.error('Failed to delete property');
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className='w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-medium py-2.5 px-4 rounded-xl text-sm transition-colors'
    >
      <FaTrash className='mr-2' /> Delete Property
    </button>
  );
};

export default DeletePropertyButton;
