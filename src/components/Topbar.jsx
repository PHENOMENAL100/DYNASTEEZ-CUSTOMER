import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Bell, Settings, LogOut, Package, Truck, CheckCircle, X, ArrowLeft, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dynasteez.customerlogo.jpg";

const LANDING_URL = 'http://localhost:5175';
const CART_KEY = 'dynasteez_cart';

// Helper to get cart count from localStorage (shared with landing page)
const getCartCount = () => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const items = saved ? JSON.parse(saved) : [];
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
};

// Dummy notifications data
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    title: "Order Delivered",
    message: "Your order #ORD-001 has been delivered successfully.",
    time: "2 hours ago",
    date: "Jun 4, 2026",
    read: false,
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    type: "shipment",
    title: "Out for Delivery",
    message: "Your order #ORD-002 is out for delivery. Estimated arrival: 5:00 PM.",
    time: "5 hours ago",
    date: "Jun 4, 2026",
    read: false,
    icon: Truck,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    type: "order",
    title: "Order Confirmed",
    message: "Your order #ORD-003 has been confirmed and is being prepared.",
    time: "1 day ago",
    date: "Jun 3, 2026",
    read: true,
    icon: Package,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-50",
  },
  {
    id: 4,
    type: "promo",
    title: "Weekend Sale!",
    message: "Get 20% off all Dynasteez Hoodies this weekend. Use code: WEEKEND20",
    time: "2 days ago",
    date: "Jun 2, 2026",
    read: true,
    icon: ShoppingCart,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 5,
    type: "order",
    title: "Payment Received",
    message: "We have received your payment for order #ORD-004.",
    time: "3 days ago",
    date: "Jun 1, 2026",
    read: true,
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 6,
    type: "system",
    title: "Welcome to Dynasteez",
    message: "Thanks for joining! Start exploring our latest collections.",
    time: "1 week ago",
    date: "May 28, 2026",
    read: true,
    icon: Bell,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

function Topbar() {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [notifFilter, setNotifFilter] = useState("all");
  const [cartCount, setCartCount] = useState(getCartCount());
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Get user from localStorage (same key as landing page)
  const storedUser = JSON.parse(localStorage.getItem('dynasteez_user') || '{}');
  const displayName = storedUser.firstName
    ? `${storedUser.firstName} ${storedUser.lastName || ''}`.trim()
    : 'Customer';
  const displayEmail = storedUser.email || 'customer@dynasteez.com';
  const initials = storedUser.firstName
    ? storedUser.firstName.charAt(0).toUpperCase()
    : 'C';

  // Listen for cart changes (storage event + interval poll)
  useEffect(() => {
    const updateCart = () => setCartCount(getCartCount());
    
    window.addEventListener('storage', updateCart);
    const interval = setInterval(updateCart, 1000); // Poll every second
    
    return () => {
      window.removeEventListener('storage', updateCart);
      clearInterval(interval);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    navigate("/my-accounts");
    setOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('dynasteez_token');
    localStorage.removeItem('dynasteez_user');
    window.location.href = LANDING_URL;
    setOpen(false);
  };

  // Cart: redirect to landing page cart view via URL param
  const handleCartClick = () => {
    window.location.href = `${LANDING_URL}?view=cart`;
  };

  const handleNotifClick = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (notifId, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Filtered notifications for the full page
  const filteredNotifications = notifications.filter((n) => {
    if (notifFilter === "all") return true;
    if (notifFilter === "unread") return !n.read;
    if (notifFilter === "orders") return n.type === "order" || n.type === "shipment";
    if (notifFilter === "promos") return n.type === "promo";
    return true;
  });

  const filterTabs = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "orders", label: "Orders", count: notifications.filter(n => n.type === "order" || n.type === "shipment").length },
    { id: "promos", label: "Promos", count: notifications.filter(n => n.type === "promo").length },
  ];

  // ─── VIEW ALL NOTIFICATIONS PAGE ───
  if (showAllNotifs) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Topbar */}
        <div className="sticky top-0 z-40 h-[55px] flex items-center justify-between px-4 md:px-6 bg-white border-b border-[#E5EBF0]">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Dynasteez"
              onClick={() => window.location.href = LANDING_URL}
              className="h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleCartClick} className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors" title="View Cart">
              <ShoppingCart className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>
            </div>
            <div className="relative" ref={dropdownRef}>
              <div onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-[#032B79] flex items-center justify-center">
                <span className="text-white text-sm font-bold">{initials}</span>
              </div>
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="font-semibold text-sm text-gray-900 truncate">{displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
                  </div>
                  <button onClick={handleProfileClick} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium border-b border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{initials}</span>
                    </div>
                    Profile
                  </button>
                  <button onClick={handleSettingsClick} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium border-b border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-gray-600" />
                    </div>
                    Settings
                  </button>
                  <button onClick={handleLogoutClick} className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-medium flex items-center gap-3">
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

        {/* Notifications Page Content */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAllNotifs(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-500">{notifications.length} total · {unreadCount} unread</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm font-medium text-[#032B79] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setNotifFilter(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  notifFilter === tab.id
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${notifFilter === tab.id ? "text-gray-300" : "text-gray-400"}`}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Bell className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {notifFilter === "unread" ? "No unread notifications" : "No notifications"}
                </h3>
                <p className="text-sm text-gray-500">
                  {notifFilter === "unread" 
                    ? "You're all caught up!" 
                    : "Check back later for updates."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const Icon = notif.icon;
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotifClick(notif.id)}
                    className={`bg-white rounded-xl border overflow-hidden hover:shadow-md transition-all cursor-pointer group ${
                      !notif.read 
                        ? "border-l-4 border-l-blue-500 border-gray-200" 
                        : "border-gray-200"
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${notif.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${notif.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-gray-900">{notif.title}</h4>
                                {!notif.read && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wide">
                                    New
                                  </span>
                                )}
                                {notif.type === "promo" && (
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full uppercase tracking-wide">
                                    Promo
                                  </span>
                                )}
                                {(notif.type === "order" || notif.type === "shipment") && notif.read && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-wide">
                                    Order
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-400">{notif.date} · {notif.time}</span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => deleteNotification(notif.id, e)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── NORMAL TOPBAR ───
  return (
    <div className="sticky top-0 z-40 h-[55px] flex items-center justify-between px-4 md:px-6 bg-white border-b border-[#E5EBF0]">

      {/* LEFT - Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Dynasteez"
          onClick={() => window.location.href = LANDING_URL}
          className="h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>

      {/* RIGHT - Icons */}
      <div className="flex items-center gap-4">

        {/* Cart - links to landing page cart WITH BADGE */}
        <button 
          onClick={handleCartClick}
          className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          title="View Cart"
        >
          <ShoppingCart className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>

        {/* Notifications with dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5 text-[#032B79]" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-[#032B79] hover:underline font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No notifications yet</p>
                  </div>
                ) : (
                  notifications.slice(0, 4).map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <button
                        key={notif.id}
                        onClick={() => handleNotifClick(notif.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0 ${
                          !notif.read ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className={`w-8 h-8 ${notif.bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon className={`w-4 h-4 ${notif.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer - View All */}
              <div className="px-4 py-3 border-t border-gray-100 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <button 
                  onClick={() => {
                    setNotifOpen(false);
                    setShowAllNotifs(true);
                  }}
                  className="text-sm font-medium text-[#032B79] hover:text-blue-700 transition-colors w-full"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-[#032B79] flex items-center justify-center"
          >
            <span className="text-white text-sm font-bold">{initials}</span>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-gray-200">
                <p className="font-semibold text-sm text-gray-900 truncate">{displayName}</p>
                <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
              </div>

              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium border-b border-gray-100 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">{initials}</span>
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