'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp, useClerk } from '@clerk/nextjs';
import SignUpForm from '@/app/components/SignUpForm';
import OTPForm from '@/app/components/OTPForm';

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [clerkError, setClerkError] = useState('');
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');

  const signUpWithEmail = async ({ emailAddress, name, password }: { emailAddress: string; name: string; password: string }) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        firstName: name,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async ({ otp }: { otp: string }) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      console.log(completeSignUp);

      if (completeSignUp.status !== 'complete') {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/home');
      }
    } catch (err) {
      console.log('Error:', JSON.stringify(err, null, 2));
    }
  };

  return <>{!verifying ? <SignUpForm signUpWithEmail={signUpWithEmail} clerkError={clerkError} /> : <OTPForm handleVerify={handleVerify} />}</>;
};

export default Signup;
