import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <footer className="w-screen px-[50px] h-[138px] absolute bottom-0 left-0 flex items-center justify-between bg-[#020202] z-30">
      <p className="text-[#F9F9F9BD] text-sm">Copyright © 2024 Vanar Chain</p>
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
