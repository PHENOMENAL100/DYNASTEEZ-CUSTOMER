import { useState, useRef, useEffect } from "react";
import { Search, User, Heart, ShoppingCart, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_black.png";

function Topbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const notificationCount = 3;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    navigate("/");
    setOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setOpen(false);
  };

  const handleLogoutClick = () => {
    console.log("Logging out...");
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 h-[55px] flex items-center justify-between px-4 md:px-6 bg-white border-b border-[#E5EBF0]">
      {/* LEFT - Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Dynasteez"
          className="h-8 w-auto object-contain"
        />
      </div>

     {/* Search Bar */}
    <div className="relative w-[40%] max-w-[500px] hidden sm:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
    type="text"
    placeholder="Search"
    className="w-full pl-10 pr-3 py-1.5 bg-transparent border border-gray-200 rounded-full text-sm outline-none placeholder:text-gray-400 focus:border-gray-400 transition-colors"
    />
    </div>

      {/* RIGHT - Icons */}
      <div className="flex items-center gap-4">
        {/* <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <User className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
        </button>

        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Heart className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
        </button> */}

        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
        </button>

        <button className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src="/assets/avatar.jpg"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-gray-200">
                <p className="font-semibold text-sm text-gray-900">Customer</p>
                <p className="text-xs text-gray-500">customer@dynasteez.com</p>
              </div>

              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium border-b border-gray-100 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">P</span>
                </div>
                Profile
              </button>

              <button
                onClick={handleSettingsClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium border-b border-gray-100 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Settings className="w-4 h-4 text-gray-600" />
                </div>
                Settings
              </button>

              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-medium flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;