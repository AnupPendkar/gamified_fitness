'use client';
import { useEffect, useState } from 'react';
import { useSignUp, useSignIn, SignedOut, SignedIn } from '@clerk/nextjs';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AuthWrapper({ children }) {
  const { signUp, isLoaded: isSignUpLoaded, setActive: setActiveSignup } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUpOrSignIn = async (values: any) => {
    setIsLoading(true);

    if (!isSignUpLoaded || !isSignInLoaded) return;

    const redirectUrl = `${window.location.origin}/`; // your redirect url

    try {
      // Try signing up the user first
      await signUp.create({ emailAddress: values?.email });

      // If sign-up is successful, send the magic link
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_link',
        redirectUrl,
      });

      setActiveSignup({ session: signUp.createdSessionId });
      //   setHasLoaded(true);
    } catch (error: any) {
      if (error.errors.some((e: any) => e.code === 'form_identifier_exists')) {
        try {
          // If the user already exists, sign them in instead
          const signInAttempt = await signIn.create({
            identifier: values?.email,
          });

          // Get the email address ID from the response and prepare the magic link
          const emailAddressIdObj: any = (signInAttempt as any)?.supportedFirstFactors.find((factor) => factor.strategy === 'email_link');

          const emailAddressId: any = emailAddressIdObj?.emailAddressId || '';

          if (emailAddressId) {
            await signIn.prepareFirstFactor({
              strategy: 'email_link',
              redirectUrl,
              emailAddressId,
            });

            setActive({ session: signInAttempt.createdSessionId });
            // setHasLoaded(true);
          } else {
            throw new Error('Email address ID not found');
          }
        } catch (signInError) {
          console.error('Sign-in error:', signInError);
          setError('Something went wrong while signing in. Please try again.');
        }
      } else {
        // Handle other errors
        console.error('Sign-up error:', error.errors);
        setError(error?.errors[0]?.longMessage ?? 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address').required('Please enter email'),
  });

  return (
    <>
      <SignedOut>
        <div>
          <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleSignUpOrSignIn}>
            {({ isValid, values, setFieldValue }) => (
              <Form>
                <label htmlFor="email">
                  Email address
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={(e) => {
                      setFieldValue('email', e.target.value);
                      setError('');
                    }}
                  />
                  <ErrorMessage name="email" component="div" />
                  {error && <span>{error}</span>}
                </label>
                <button type="submit" disabled={isLoading || !isValid}>
                  {isLoading ? 'Loading...' : 'Continue'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </SignedOut>
      <SignedIn>
        <main>{children}</main>
      </SignedIn>
    </>
  );
}
