import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import {
  User,
  ShoppingCart,
  Heart,
  Headphones,
  ScrollText,
} from "lucide-react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const LANDING_URL = 'http://localhost:5175';
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar() {
  const menuItems = [
    { name: "My Accounts", path: "/my-accounts", icon: <User size={20} strokeWidth={1.5} /> },
    { name: "Orders", path: "/orders", icon: <ShoppingCart size={20} strokeWidth={1.5} /> },
    { name: "Favorite", path: "/favorite", icon: <Heart size={20} strokeWidth={1.5} /> },
    { name: "Customer Service", path: "/customer-service", icon: <Headphones size={20} strokeWidth={1.5} /> },
    { name: "Policy", path: "/policy", icon: <ScrollText size={20} strokeWidth={1.5} /> },
  ];


  return (
    <div className="fixed top-0 left-0 h-screen bg-[#E5EBF0] shadow-sm z-50 w-[70px] md:w-[250px] flex flex-col">
      {/* HEADER */}
      <div className="h-[55px] flex items-center justify-center md:justify-start md:px-4 border-b border-gray-300 px-3 flex-shrink-0">
        <img
          src={logo}
          alt="Logo"
          onClick={() => window.location.href = LANDING_URL}
          className="w-9 h-9 object-contain cursor-pointer transition-all duration-300 hover:scale-110"
        />
        <div className="hidden md:flex flex-col leading-tight ml-2">
          <span className="text-sm font-semibold text-[#032B79]">Dynasteez</span>
          <span className="text-[10px] text-gray-500 tracking-wide">
            WHERE STREET MEETS ROYALTY
          </span>
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="px-3 pt-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-lg transition-all duration-200 
                  ${isActive
                    ? "bg-[#C8D4E0] text-[#032B79] font-medium"
                    : "text-[#032B79] hover:bg-[#D5DDE6]"}`}
              >
                {item.icon}
                <span className="hidden md:inline text-sm">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;