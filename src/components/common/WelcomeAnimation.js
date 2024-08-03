import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.css';

const WelcomeAnimation = ({ onAnimationEnd }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenWelcomeMessage = sessionStorage.getItem('hasSeenWelcomeMessage');
    
    if (hasSeenWelcomeMessage) {
      setIsVisible(false);
      onAnimationEnd();
      return;
    }

    // Set a timer to hide the GIF after it finishes playing (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenWelcomeMessage', 'true');
      onAnimationEnd();
    }, 3000); // Adjust the time according to your GIF duration

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div className="welcome-animation">
      <img
        src="https://drive.google.com/file/d/1JD0VzDj_p7aqYirsMopsg-BjJk18Neyw/view"
        alt="Welcome to Torned Education"
        className="welcome-gif"
      />
    </div>
  );
};

export default WelcomeAnimation;
