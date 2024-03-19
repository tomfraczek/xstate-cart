import Image from 'next/image';
import { Cart } from '@/app/components/cart';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center mt-32'>
      <h1 className='text-3xl'>CLF Cart</h1>
      <div className='flex items-center justify-center flex-wrap p-14 w-full'>
        <Cart />
      </div>
    </main>
  );
}
