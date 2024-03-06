import { Icon } from '../Icon/Icon';

export default function SearchBar() {
  return (
    <div className="w-1/2 flex items-center justify-end relative">
      <Icon name="search" size={30} color="#58575e" className="absolute left-2" />
      <input
        className="w-full bg-transparent ring-1 ring-[#58575e] text-[#58575e] py-2 pl-12 pr-4 rounded-full"
        placeholder="Search with Wallet Address"
      ></input>
    </div>
  );
}
