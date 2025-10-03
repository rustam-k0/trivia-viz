interface ErrorStateProps {
  message: string;
}

const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="min-h-screen bg-cyber-primary flex items-center justify-center p-4">
    <div className="cyber-card p-6 max-w-md text-center">
      <div className="text-accent text-2xl mb-4">⚠️</div>
      <h2 className="text-subtitle text-cyber-primary mb-3">ERROR</h2>
      <p className="text-body text-cyber-secondary mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="cyber-button"
      >
        RELOAD
      </button>
    </div>
  </div>
);

export default ErrorState;