import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.css';
<<<<<<< HEAD
import welcomeVideo from '../../assets/welcome video.mp4'; // Ensure the path is correct
=======
>>>>>>> 4f0454f2dca1c72e1dfd50f775e4b736782dc6b0

const WelcomeAnimation = ({ onAnimationEnd }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenWelcomeMessage = sessionStorage.getItem('hasSeenWelcomeMessage');
    
    if (hasSeenWelcomeMessage) {
      setIsVisible(false);
<<<<<<< HEAD
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
=======
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
>>>>>>> 4f0454f2dca1c72e1dfd50f775e4b736782dc6b0
  }, [onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div className="welcome-animation">
<<<<<<< HEAD
      <video
        id="welcomeVideo"
        src={welcomeVideo} // Using the local video file
        autoPlay
        muted
        playsInline
        className="welcome-video"
=======
      <img
        src="https://drive.google.com/file/d/1JD0VzDj_p7aqYirsMopsg-BjJk18Neyw/view"
        alt="Welcome to Torned Education"
        className="welcome-gif"
>>>>>>> 4f0454f2dca1c72e1dfd50f775e4b736782dc6b0
      />
    </div>
  );
};

export default WelcomeAnimation;
