const Loading = () => (
  <div className="min-h-screen bg-cyber-primary flex items-center justify-center">
    <div className="text-center">
      <div 
        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"
        style={{ boxShadow: 'var(--shadow-glow-accent)' }}
      ></div>
      <p className="text-cyber-secondary tracking-widest">LOADING</p>
    </div>
  </div>
);

export default Loading;