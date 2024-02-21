import { Plus } from 'lucide-react';

const Fileupload = ({ onFileChange }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  return (
    <div className="flex my-1">
      <label
        className="flex cursor-pointer hover:text-[#ffbb763f] hover:border hover:border-[#ffbb763f] items-center justify-center p-1 rounded-md border"
        htmlFor="addMusic"
      >
        <Plus />
      </label>
      <input id="addMusic" type="file" accept="audio/mp3" onChange={handleChange} className="hidden" />
    </div>
  );
};

export default Fileupload;
