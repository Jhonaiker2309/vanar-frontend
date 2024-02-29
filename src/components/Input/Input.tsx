import { useState, FormEvent } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const Input = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (username.trim() !== '') {
      try {
        if (!window.ethereum) {
          console.error('MetaMask is not installed');
          return;
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0].toLowerCase();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(username);
        const signerAddress = (await ethers.utils.verifyMessage(username, signature)).toLowerCase();

        if (signerAddress !== address) {
          console.error('Connected account does not match the account used for signing.');
          return;
        }

        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/setUsername?username=${encodeURIComponent(
            username,
          )}&signature=${encodeURIComponent(signature)}&from=${address}`,
        );
      } catch (error) {
        console.error('Metamask signature request failed:', error);
      }
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
