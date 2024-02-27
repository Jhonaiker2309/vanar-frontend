import { useState, FormEvent } from 'react';

const Input = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username.trim() !== '') {
      console.log(username.trim());
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <label>
          <input
            className="w-full rounded-full py-2 px-4 md:px-12 ring-4 ring-[#A08CFF] focus:border-transparent focus:outline-none bg-slate-900 text-[#A08CFF] md:text-3xl text-center"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </label>
        <button
          className="w-1/2 bg-[#A08CFF] rounded-full py-2 text-white md:text-xl"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Input;
