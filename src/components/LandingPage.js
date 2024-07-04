import React, { useState } from 'react';
import AuthPopup from './PopupAuth';
import LandingPage from './VideoBackground'; 

const App = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(true);
  const handleClosePopup = () => {
    setShowAuthPopup(false);
  };

  return (
    <div>
      <LandingPage />
      {showAuthPopup && <AuthPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default App;
