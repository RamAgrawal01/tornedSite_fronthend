import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.css';
import welcomeGif from '../../assets/welcome gif.gif'; // Adjust the path as needed

const WelcomeAnimation = ({ onAnimationEnd }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenWelcomeMessage = sessionStorage.getItem('hasSeenWelcomeMessage');
    
    if (hasSeenWelcomeMessage) {
      setIsVisible(false);
      onAnimationEnd(); // Skip animation if already seen
      return;
    }

    // Set a timer to hide the animation after 3 seconds (3000ms)
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenWelcomeMessage', 'true'); // Mark message as seen
      onAnimationEnd(); // Notify when animation ends
    }, 7000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div className="welcome-animation">
      <img src={welcomeGif} alt="Welcome to Torned Education" className="welcome-gif" />
    </div>
  );
};

export default WelcomeAnimation;
