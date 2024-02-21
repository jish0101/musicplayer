import { Trash } from 'lucide-react';
import Fileupload from '../input/Fileupload';

const Playlist = ({ audioFiles, onAudioSelect, onFileChange, onFileDelete }) => {
  return (
    <div className="my-2">
      <div className="flex my-3 justify-between items-center">
        <h2 className="text-lg font-bold mb-2">Your Playlist</h2>
        <Fileupload onFileChange={onFileChange} />
      </div>
      <ul className="flex flex-col gap-1 h-[150px] overflow-auto px-4">
        {audioFiles.map((file, index) => (
          <div className="flex gap-2" key={index}>
            <li
              onClick={() => onAudioSelect(index)}
              className="flex-1 cursor-pointer border border-[#ffbb763f] hover:bg-[#ffbb763f] p-2 rounded-md select-none"
            >
              {file.name}
            </li>
            <button onClick={() => onFileDelete(index)} className="hover:text-[#ffbb763f]">
              <Trash />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
