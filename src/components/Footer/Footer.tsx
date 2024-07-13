import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <footer className="w-screen px-4 md:px-[50px] py-8 md:py-0 md:h-[138px] flex flex-col md:flex-row gap-4 md:gap-0  items-center md:justify-between bg-[#020202] z-30">
      <p className="text-[#F9F9F9BD] text-xs md:text-sm">Copyright © 2024 Vanar Chain</p>
      <img src="public/images/V2/logo-vanar.svg" alt="Vanar Chain Logo" />
      <div className="flex items-center justify-end gap-4">
        <Link to="/terms">
          <img src="images/V2/logo-x.svg" alt="logo x" />
        </Link>
        <Link to="/terms">
          <img src="images/V2/logo-telegram.svg" alt="logo telegram" />
        </Link>
        <Link to="/terms">
          <img src="images/V2/logo-medium.svg" alt="logo medium" />
        </Link>
      </div>
    </footer>
  );
};

export default Navbar;
