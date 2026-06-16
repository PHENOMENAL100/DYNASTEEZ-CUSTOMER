import { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  User, 
  Bell, 
  Shield, 
  Trash2, 
  Save,
  Upload,
  Check,
  X,
  AlertTriangle,
  ChevronRight,
  Globe,
  Moon,
  Sun,
  Clock,
  ChevronDown,
  AlertCircle
} from "lucide-react";

const SETTINGS_TABS = [
  { id: "profile", label: "Profile Picture", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Preferences", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
];

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const fileInputRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem('dynasteez_user') || '{}');
  const displayName = storedUser.firstName
    ? `${storedUser.firstName} ${storedUser.lastName || ''}`.trim()
    : 'Customer';
  const initials = storedUser.firstName
    ? (storedUser.firstName.charAt(0) + (storedUser.lastName?.charAt(0) || '')).toUpperCase()
    : 'U';

  const [notifPrefs, setNotifPrefs] = useState({
    orderUpdates: true, promotions: true, shippingAlerts: true, newArrivals: false,
    newsletter: true, smsNotifications: false, emailNotifications: true, pushNotifications: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false, language: "en", currency: "USD", timezone: "UTC+1",
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [twoFA, setTwoFA] = useState(false);

  useEffect(() => {
    const storedImage = localStorage.getItem('dynasteez_profile_image');
    if (storedImage) setProfileImage(storedImage);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('[data-dropdown]')) setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('Image must be less than 5MB'); return; }
    const reader = new FileReader();
    reader.onload = (event) => { setPreviewImage(event.target.result); setShowCropModal(true); };
    reader.readAsDataURL(file);
  };

  const saveProfileImage = () => {
    setIsUploading(true);
    setTimeout(() => {
      if (previewImage) {
        setProfileImage(previewImage);
        localStorage.setItem('dynasteez_profile_image', previewImage);
      }
      setIsUploading(false); setShowCropModal(false); setPreviewImage(null);
      showSuccessMessage();
    }, 800);
  };

  const removeProfileImage = () => {
    setProfileImage(null); setPreviewImage(null);
    localStorage.removeItem('dynasteez_profile_image');
    showSuccessMessage();
  };

  const showSuccessMessage = () => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); };

  const handleDeleteAccount = () => {
    if (deleteConfirmText.toLowerCase() !== "delete") return;
    localStorage.removeItem('dynasteez_token');
    localStorage.removeItem('dynasteez_user');
    localStorage.removeItem('dynasteez_profile_image');
    localStorage.removeItem('dynasteez_cart');
    window.location.href = 'http://localhost:5175';
  };

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Spanish", flag: "🇪🇸" },
    { value: "fr", label: "French", flag: "🇫🇷" },
    { value: "de", label: "German", flag: "🇩🇪" },
    { value: "zh", label: "Chinese", flag: "🇨🇳" },
    { value: "ja", label: "Japanese", flag: "🇯🇵" },
    { value: "pt", label: "Portuguese", flag: "🇵🇹" },
    { value: "ar", label: "Arabic", flag: "🇸🇦" },
    { value: "yo", label: "Yoruba", flag: "🇳🇬" },
    { value: "ig", label: "Igbo", flag: "🇳🇬" },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar", symbol: "$" },
    { value: "EUR", label: "Euro", symbol: "€" },
    { value: "GBP", label: "British Pound", symbol: "£" },
    { value: "NGN", label: "Nigerian Naira", symbol: "₦" },
    { value: "JPY", label: "Japanese Yen", symbol: "¥" },
    { value: "CAD", label: "Canadian Dollar", symbol: "C$" },
    { value: "AUD", label: "Australian Dollar", symbol: "A$" },
    { value: "ZAR", label: "South African Rand", symbol: "R" },
  ];

  const timezones = [
    { value: "UTC-8", label: "Pacific Time", city: "Los Angeles" },
    { value: "UTC-7", label: "Mountain Time", city: "Denver" },
    { value: "UTC-6", label: "Central Time", city: "Chicago" },
    { value: "UTC-5", label: "Eastern Time", city: "New York" },
    { value: "UTC+0", label: "GMT", city: "London" },
    { value: "UTC+1", label: "West Africa Time", city: "Lagos" },
    { value: "UTC+1b", label: "Central European", city: "Berlin" },
    { value: "UTC+3", label: "East Africa Time", city: "Nairobi" },
    { value: "UTC+5:30", label: "India Standard", city: "Mumbai" },
    { value: "UTC+8", label: "China Standard", city: "Beijing" },
    { value: "UTC+9", label: "Japan Standard", city: "Tokyo" },
  ];

  const CustomDropdown = ({ label, icon: Icon, options, value, onChange, dropdownKey, renderOption }) => {
    const isOpen = openDropdown === dropdownKey;
    const selected = options.find(o => o.value === value);
    return (
      <div className="flex items-center justify-between py-4" data-dropdown={dropdownKey}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{label}</p>
            <p className="text-xs text-gray-500">
              {selected ? (selected.label + (selected.city ? ` (${selected.city})` : "")) : "Select..."}
            </p>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setOpenDropdown(isOpen ? null : dropdownKey)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all min-w-[180px] justify-between bg-white">
            <span className="flex items-center gap-2">{renderOption ? renderOption(selected) : selected?.label}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
              {options.map((option) => (
                <button key={option.value + option.label} onClick={() => { onChange(option.value); setOpenDropdown(null); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    value === option.value ? "bg-blue-50 text-[#032B79] font-medium" : "text-gray-700"
                  }`}>
                  {renderOption ? renderOption(option) : option.label}
                  {value === option.value && <Check className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const CropModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Preview Profile Picture</h3>
          <button onClick={() => { setShowCropModal(false); setPreviewImage(null); }} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">This will be your new profile picture</p>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={() => { setShowCropModal(false); setPreviewImage(null); }}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={saveProfileImage} disabled={isUploading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#032B79] rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isUploading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            ) : (
              <><Check className="w-4 h-4" />Save Photo</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const DeleteAccountModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-6">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Account?</h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            This action <span className="font-semibold text-red-600">cannot be undone</span>. All your data, orders, addresses, payment methods, and preferences will be permanently deleted.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">Type "delete" to confirm</p>
                <p className="text-xs text-red-600">This helps us make sure you really want to do this.</p>
              </div>
            </div>
            <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder='Type "delete" here'
              className="w-full mt-3 px-4 py-2.5 border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 bg-white"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(""); }}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel, Keep Account
            </button>
            <button onClick={handleDeleteAccount} disabled={deleteConfirmText.toLowerCase() !== "delete"}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfilePictureSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
        <p className="text-sm text-gray-500 mb-6">Add or update your profile picture. This will be shown across the dashboard.</p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg bg-[#032B79] flex items-center justify-center">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">{initials}</span>
              )}
            </div>
            <button onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {profileImage ? "Update your photo" : "Add a profile picture"}
            </h4>
            <p className="text-sm text-gray-500 mb-4">JPG, PNG or GIF. Max size 5MB.</p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <button onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#032B79] rounded-xl hover:bg-blue-800 transition-colors shadow-sm hover:shadow-md">
                <Upload className="w-4 h-4" />
                {profileImage ? "Change Photo" : "Upload Photo"}
              </button>
              {profileImage && (
                <button onClick={removeProfileImage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-200">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900">{storedUser.email || 'Not set'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-900">{storedUser.phone || 'Not set'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Member Since</p>
            <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          To update your name, email, phone, or address — go to{" "}
          <a href="/my-accounts" className="text-[#032B79] font-medium hover:underline">My Account</a>
        </p>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Notification Preferences</h3>
        <p className="text-sm text-gray-500 mb-6">Choose how you want to be notified</p>
        <div className="space-y-1">
          {[
            { key: "orderUpdates", label: "Order Updates", desc: "Get notified when your order status changes" },
            { key: "shippingAlerts", label: "Shipping Alerts", desc: "Track your packages with real-time updates" },
            { key: "promotions", label: "Promotions & Deals", desc: "Receive exclusive offers and discounts" },
            { key: "newArrivals", label: "New Arrivals", desc: "Be the first to know about new products" },
            { key: "newsletter", label: "Newsletter", desc: "Weekly digest of trends and style tips" },
            { key: "emailNotifications", label: "Email Notifications", desc: "Receive all notifications via email" },
            { key: "smsNotifications", label: "SMS Notifications", desc: "Get text messages for urgent updates" },
            { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
                <input type="checkbox" className="sr-only peer"
                  checked={notifPrefs[item.key]}
                  onChange={(e) => setNotifPrefs({...notifPrefs, [item.key]: e.target.checked})}
                />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#032B79]"></div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={showSuccessMessage}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#032B79] rounded-xl hover:bg-blue-800 transition-colors shadow-sm">
            <Save className="w-4 h-4" />Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  const PreferencesSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">General Preferences</h3>
        <p className="text-sm text-gray-500 mb-6">Customize your experience</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                {preferences.darkMode ? <Moon className="w-5 h-5 text-gray-300" /> : <Sun className="w-5 h-5 text-orange-500" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Appearance</p>
                <p className="text-xs text-gray-500">{preferences.darkMode ? "Dark mode" : "Light mode"}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" className="sr-only peer"
                checked={preferences.darkMode}
                onChange={(e) => setPreferences({...preferences, darkMode: e.target.checked})}
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#032B79]"></div>
            </label>
          </div>

          <div className="py-2">
            <CustomDropdown label="Language" icon={Globe} options={languages} value={preferences.language}
              onChange={(val) => setPreferences({...preferences, language: val})} dropdownKey="language"
              renderOption={(opt) => (
                <span className="flex items-center gap-2">
                  <span className="text-base">{opt?.flag}</span>
                  <span className="text-gray-900">{opt?.label}</span>
                </span>
              )}
            />
          </div>

          <div className="py-2 border-t border-gray-50">
            <CustomDropdown label="Currency" icon={() => <span className="text-lg font-bold text-green-600">$</span>}
              options={currencies} value={preferences.currency}
              onChange={(val) => setPreferences({...preferences, currency: val})} dropdownKey="currency"
              renderOption={(opt) => (
                <span className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-600">{opt?.symbol}</span>
                  <span className="text-gray-900">{opt?.label}</span>
                </span>
              )}
            />
          </div>

          <div className="py-2 border-t border-gray-50">
            <CustomDropdown label="Timezone" icon={Clock} options={timezones} value={preferences.timezone}
              onChange={(val) => setPreferences({...preferences, timezone: val})} dropdownKey="timezone"
              renderOption={(opt) => (
                <span className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{opt?.value}</span>
                  <span className="text-gray-900">{opt?.label}</span>
                  <span className="text-xs text-gray-400">({opt?.city})</span>
                </span>
              )}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={showSuccessMessage}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#032B79] rounded-xl hover:bg-blue-800 transition-colors shadow-sm">
            <Save className="w-4 h-4" />Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500 mb-6">Add an extra layer of security to your account</p>
        <div className="flex items-start justify-between">
          <div className="max-w-md">
            <p className="text-sm text-gray-700">
              Enable 2FA to require a verification code from your authenticator app when signing in.
              This helps protect your account even if your password is compromised.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
            <input type="checkbox" className="sr-only peer" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
            <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#032B79]"></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Sessions</h3>
        <p className="text-sm text-gray-500 mb-4">Manage devices where you are currently logged in</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Current Session</p>
                <p className="text-xs text-gray-500">Chrome on Windows · Lagos, Nigeria</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-1">Delete Account</h3>
            <p className="text-sm text-red-600/70 mb-4">
              Once deleted, your account cannot be recovered. All data, orders, and preferences will be permanently removed.
            </p>
            <button onClick={() => setShowDeleteModal(true)}
              className="px-5 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {saveSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">Changes saved successfully!</span>
        </div>
      )}
      {showCropModal && <CropModal />}
      {showDeleteModal && <DeleteAccountModal />}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-20">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Settings</h2>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
              <nav className="p-2">
                {SETTINGS_TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                        activeTab === tab.id
                          ? "bg-[#032B79] text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}>
                      <Icon className={`w-4 h-4 ${activeTab === tab.id ? "text-white" : "text-gray-400"}`} />
                      {tab.label}
                      <ChevronRight className={`w-4 h-4 ml-auto ${activeTab === tab.id ? "text-white/70" : "text-gray-300"}`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {SETTINGS_TABS.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === "profile" && "Add or update your profile picture"}
                {activeTab === "notifications" && "Control how and when you receive notifications"}
                {activeTab === "preferences" && "Customize your app experience"}
                {activeTab === "security" && "Manage your account security"}
              </p>
            </div>
            {activeTab === "profile" && <ProfilePictureSection />}
            {activeTab === "notifications" && <NotificationsSection />}
            {activeTab === "preferences" && <PreferencesSection />}
            {activeTab === "security" && <SecuritySection />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;