import { useRef, useEffect, useState } from 'react';
import { ChevronFirst, ChevronLast, Pause, Play, Repeat, Shuffle } from 'lucide-react';

const AudioPlayer = ({ audioFile, onEnded, handleSongChange, isRepeat, setIsRepeat, isShuffle, setIsShuffle }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    try {
      const updateTime = () => {
        if (audioRef && audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration);
        }
      };

      const removeTimeUpdateListener = () => {
        if (audioRef && audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateTime);
        }
      };

      audioRef.current.addEventListener('timeupdate', updateTime);
      return removeTimeUpdateListener;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (audioFile && audioRef) {
      try {
        audioRef.current.src = URL.createObjectURL(audioFile);
        audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    }
  }, [audioFile]);

  const handlePlayPause = () => {
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const handleShuffle = () => {
    try {
      setIsShuffle(!isShuffle);
    } catch (error) {
      console.error('Error toggling shuffle:', error);
    }
  };

  const handleRepeat = () => {
    try {
      setIsRepeat(!isRepeat);
    } catch (error) {
      console.error('Error toggling repeat:', error);
    }
  };

  const formatTime = (time) => {
    try {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4">
      <audio ref={audioRef} onEnded={onEnded} className="mb-2" />
      <div className="flex my-3">
        <p>
          <span className="font-semibold">Playing</span>: {audioFile?.name}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          value={currentTime}
          min="0"
          max={duration || 0}
          onChange={(e) => {
            try {
              audioRef.current.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            } catch (error) {
              console.error('Error seeking playback:', error);
            }
          }}
          className="w-full mx-2"
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center justify-between my-4">
        <button
          onClick={handleShuffle}
          className={`${isShuffle ? 'bg-[#ffbb763f]' : 'hover:text-[#ffbb763f]'} p-2 rounded-full`}
        >
          <Shuffle />
        </button>
        <div className="flex gap-4">
          <button onClick={() => handleSongChange(-1)} className="hover:text-[#ffbb763f]">
            <ChevronFirst />
          </button>
          <button
            onClick={handlePlayPause}
            className="bg-[#ffbb763f] p-3 rounded-full flex justify-center items-center"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={() => handleSongChange(1)} className="hover:text-[#ffbb763f]">
            <ChevronLast />
          </button>
        </div>
        <button
          onClick={handleRepeat}
          className={`${isRepeat ? 'bg-[#ffbb763f]' : 'hover:text-[#ffbb763f]'} p-2 rounded-full`}
        >
          <Repeat />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
