import React from 'react';

const SpeedControl = ({ playbackRate, setPlaybackRate }) => {
    const speeds = [0.5, 1, 1.5, 2];

    return (
        <div className="flex items-center gap-2 p-2 bg-gray-800 text-white">
            <span>Speed:</span>
            {speeds.map((speed) => (
                <button
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                    className={`px-2 py-1 ${speed === playbackRate ? 'bg-yellow-500' : 'bg-gray-600'}`}
                >
                    {speed}x
                </button>
            ))}
        </div>
    );
};

export default SpeedControl;