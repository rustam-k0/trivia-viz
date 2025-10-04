import React from 'react';

interface Props {
  message: string;
}

const ErrorState: React.FC<Props> = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-red-500">{message}</div>
    </div>
  );
};

export default ErrorState;