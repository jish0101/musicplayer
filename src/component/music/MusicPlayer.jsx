import { useEffect, useState } from 'react';
import Card from '../card/Cards';
import Playlist from '../playlist/Playlist';
import Audioplayer from '../audioplayer/Audioplayer';

const MusicPlayer = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const onFileDelete = (index) => {
    try {
      const newFiles = [...audioFiles];

      newFiles.splice(index, 1);
      setAudioFiles(newFiles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (file) => {
    try {
      setAudioFiles([...audioFiles, file]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAudioSelect = (index) => {
    try {
      setCurrentAudioIndex(index);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSongChange = (action) => {
    try {
      switch (action) {
        case 1:
          if (currentAudioIndex < audioFiles.length - 1) {
            setCurrentAudioIndex(currentAudioIndex + 1);
          }
          break;
        case -1:
          if (currentAudioIndex > 0) {
            setCurrentAudioIndex(currentAudioIndex - 1);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAudioEnded = () => {
    try {
      if (isRepeat) {
        if (isShuffle) {
          const randomIndex = Math.floor(Math.random() * audioFiles.length);
          return setCurrentAudioIndex(randomIndex);
        }
        return setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
      }
      setCurrentAudioIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('currentAudioIndex', currentAudioIndex);
    } catch (error) {
      console.log(error);
    }
  }, [currentAudioIndex]);

  useEffect(() => {
    try {
      const storedIndex = localStorage.getItem('currentAudioIndex');
      if (storedIndex) {
        setCurrentAudioIndex(parseInt(storedIndex));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[450px] h-[400px] rounded-3xl">
        <Card
          title={'Music Player'}
          content={
            <div className="container mx-auto p-3">
              <Playlist
                audioFiles={audioFiles}
                onAudioSelect={handleAudioSelect}
                onFileChange={handleFileChange}
                onFileDelete={onFileDelete}
              />
              {audioFiles.length > 0 && (
                <Audioplayer
                  audioFile={audioFiles[currentAudioIndex]}
                  onEnded={handleAudioEnded}
                  handleSongChange={handleSongChange}
                  setIsRepeat={setIsRepeat}
                  isRepeat={isRepeat}
                  isShuffle={isShuffle}
                  setIsShuffle={setIsShuffle}
                />
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
