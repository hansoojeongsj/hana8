import { AlertTriangle, Ghost, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-black text-white text-center'>
      <div className='flex gap-4 text-5xl animate-bounce'>
        <AlertTriangle className='text-yellow-400' />
        <Ghost className='text-purple-400 animate-pulse' />
        <AlertTriangle className='text-red-400' />
      </div>

      <h1 className='text-4xl font-extrabold animate-[shake_0.4s_ease-in-out_infinite]'>
        🚨 경로 잘못 치셨어요!!! 🚨
      </h1>

      <p className='text-lg text-gray-300'>
        여긴 아무것도 없어요 <br />
        주소 다시 확인하거나 홈으로 탈출하세요
      </p>

      <Link
        to='/'
        className='flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:scale-125 hover:rotate-3'
      >
        <Home />
        집으로 탈출
      </Link>

      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            75% { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}
