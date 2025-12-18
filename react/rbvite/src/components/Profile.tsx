import { useImperativeHandle, type RefObject } from 'react';
import { useSession } from '../hooks/SessionContext';
import Btn from './ui/Btn';

type Prop = {
  ref: RefObject<ProfileHandler | null>;
};

export type ProfileHandler = {
  xxx: string;
  showLoginUser: () => void;
  logout: () => void;
};

export default function Profile({ ref }: Prop) {
  const {
    session: { loginUser },
    logout,
  } = useSession();

  const showLoginUser = () => {
    alert(loginUser?.name);
  };

  const xxx = 'sdfdsfdfsfs';

  useImperativeHandle(ref, () => ({
    xxx,
    showLoginUser,
    logout,
  }));

  return (
    <>
      <h1 className='text-2xl'>
        {loginUser ? (
          <span className='font-bold text-primary'>
            LoginUser: {loginUser.name}
          </span>
        ) : (
          <span className='text-6xl text-violet-800'>로그인해주세요</span>
        )}
      </h1>

      <div className='flex gap-5'>
        <Btn
          onClick={logout}
          className='bg-purple-500 hover:bg-purple-300 text-white'
        >
          LogOut
        </Btn>
        <Btn onClick={showLoginUser}>Show LoginUser</Btn>
      </div>
    </>
  );
}
