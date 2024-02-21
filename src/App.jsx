import SnowBackGround from './component/background/SnowBackGround';
import MusicPlayer from './component/music/MusicPlayer';

function App() {
  return (
    <div className="font-primary">
      <SnowBackGround />
      <div>
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
