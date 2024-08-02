import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.css';
import welcomeVideo from '../../assets/welcome video.mp4'; // Ensure the path is correct

const WelcomeAnimation = ({ onAnimationEnd }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenWelcomeMessage = sessionStorage.getItem('hasSeenWelcomeMessage');
    
    if (hasSeenWelcomeMessage) {
      setIsVisible(false);
      onAnimationEnd(); // Skip animation if already seen
      return;
    }

    // Set a timer to hide the animation after the video duration
    const videoElement = document.getElementById('welcomeVideo');
    videoElement.onended = () => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenWelcomeMessage', 'true'); // Mark message as seen
      onAnimationEnd(); // Notify when animation ends
    };

    return () => {
      videoElement.onended = null; // Cleanup event listener
    };
  }, [onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div className="welcome-animation">
      <video
        id="welcomeVideo"
        src={welcomeVideo} // Using the local video file
        autoPlay
        muted
        playsInline
        className="welcome-video"
      />
    </div>
  );
};

export default WelcomeAnimation;
