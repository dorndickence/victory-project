import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface SignUpPageProps {
  onLogin: () => void; // on successful signup, we log them in
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onLogin }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate successful signup and login
        onLogin();
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-6">
           <div className="bg-primary-500 rounded-lg p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Create an Account</h1>
        <p className="text-center text-gray-500 dark:text-dark-text-secondary mb-8">Join Victory School Management today</p>
        
        <Card className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                Full Name
              </label>
              <input id="name" name="name" type="text" required className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"/>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                Email Address
              </label>
              <input id="email" name="email" type="email" required className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"/>
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                Password
              </label>
              <input id="password" name="password" type="password" required className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"/>
            </div>
            
            <Button type="submit" className="w-full justify-center">
              Create Account
            </Button>
          </form>
        </Card>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-dark-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
