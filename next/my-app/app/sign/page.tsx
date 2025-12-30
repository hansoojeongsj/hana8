import { Separator } from '@/components/ui/separator';
import { loginGithub, loginGoogle } from '@/lib/sign.action';
import { GithubLoginButton } from './GithubLoginButton';
import { GoogleLoginButton } from './GoogleLoginButon';
import SignForm from './SignForm';

export default function SignPage() {
  // const login = async (provider: Provider) => {
  //   'use server';
  //   await signIn(provider, {
  //     redirectTo: '/hello',
  //   });
  // };

  return (
    <div className="mx-auto w-96 rounded-md border p-5">
      <h1 className="mb-5 text-center font-semibold text-xl">Sign In</h1>
      <form className="flex gap-3">
        <input type="hidden" name="redirectTo" value="/hello" />
        <div className="grid grid-cols-2 place-items-center gap-5">
          <GoogleLoginButton formAction={loginGoogle} />
          <GithubLoginButton formAction={loginGithub} />
        </div>
      </form>

      <Separator className="my-3" />
      <SignForm />
    </div>
  );
}
