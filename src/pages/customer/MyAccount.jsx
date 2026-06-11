import { useState, useEffect } from "react";
import {
  Check,
  Plus,
  Trash2,
  User,
  MapPin,
  CreditCard,
  Settings,
  Crown,
  Home,
  ChevronRight,
} from "lucide-react";
import useCustomerProfile from "../../hooks/useCustomerProfile";
import useAddresses from "../../hooks/useAddresses";
import customerService from "../../services/customerService";

const LANDING_URL = 'http://localhost:5175';

function MyAccount() {
  const { profile, loading: profileLoading, updateProfile, updatePassword } = useCustomerProfile();
  const { addresses, loading: addressesLoading, addAddress, updateAddress, deleteAddress } = useAddresses();
  
  // Get user data from localStorage (set by landing page LoginModal)
  const storedUser = JSON.parse(localStorage.getItem('dynasteez_user') || '{}');
  const userFirstName = storedUser.firstName || 'Customer';
  const userLastName = storedUser.lastName || '';
  const userFullName = `${userFirstName} ${userLastName}`.trim();
  const userEmail = storedUser.email || 'customer@dynasteez.com';
  const userPhone = storedUser.phone || '+234 0000000000';

  const [activeTab, setActiveTab] = useState("Profile");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: userFullName,
      address: "12 Admiralty Way, Lekki Phase 1, Lagos State.",
      phone: userPhone,
    },
  ]);
  const [addressForm, setAddressForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [manageData, setManageData] = useState({
    username: "",
    email: "",
    phone: "",
    username: userFirstName,
    email: userEmail,
    phone: userPhone,
    password: "***********",
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setManageData({
        username: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
        password: "***********",
      });
    }
  }, [profile]);

  // Load payment methods
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const paymentMethods = await customerService.getPaymentMethods();
        setCards(paymentMethods || []);
      } catch (err) {
        console.error("Failed to load payment methods");
      }
    };
    loadPaymentMethods();
  }, []);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    username: "",
    favoriteCategories: [],
    favoriteStyles: [],
  });

  const tabs = [
    { id: "Profile", label: "Profile", icon: User },
    { id: "Address", label: "Address", icon: MapPin },
    { id: "Payment", label: "Payment Options", icon: CreditCard },
    { id: "Manage", label: "Manage Account", icon: Settings },
    { id: "VIP", label: "Dynasteez VIP", icon: Crown },
  ];

  const [profileData, setProfileData] = useState({
    username: userFirstName,
    favoriteCategories: [],
    favoriteStyles: [],
  });

  const categories = ["Women", "Men", "Kids"];
  const styles = ["Basic", "Casual", "Sporty", "Corporate"];

  // Initialize profile data when profile loads
  useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username || "",
        favoriteCategories: profile.favoriteCategories || [],
        favoriteStyles: profile.favoriteStyles || [],
      });
    }
  }, [profile]);

  const toggleCategory = (cat) => {
    setProfileData((prev) => ({
      ...prev,
      favoriteCategories: prev.favoriteCategories.includes(cat)
        ? prev.favoriteCategories.filter((c) => c !== cat)
        : [...prev.favoriteCategories, cat],
    }));
  };

  const toggleStyle = (style) => {
    setProfileData((prev) => ({
      ...prev,
      favoriteStyles: prev.favoriteStyles.includes(style)
        ? prev.favoriteStyles.filter((s) => s !== style)
        : [...prev.favoriteStyles, style],
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({ name: "", address: "", phone: "" });
    setShowAddressModal(true);
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({ name: addr.name, address: addr.address, phone: addr.phone });
    setShowAddressModal(true);
  };

  const handleSaveAddress = async () => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, addressForm);
      } else {
        await addAddress(addressForm);
      }
      setShowAddressModal(false);
      setEditingAddress(null);
      setAddressForm({ name: "", address: "", phone: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save address");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to delete address");
    }
  };

  const handleAddCard = () => {
    setCardForm({ cardNumber: "", expiry: "", cvv: "" });
    setShowCardModal(true);
  };

  const handleSaveCard = async () => {
    try {
      const paymentData = {
        cardNumber: cardForm.cardNumber,
        expiry: cardForm.expiry,
        cvv: cardForm.cvv,
      };
      const newCard = await customerService.addPaymentMethod(paymentData);
      setCards([...cards, newCard]);
      setShowCardModal(false);
      setCardForm({ cardNumber: "", expiry: "", cvv: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save card");
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await customerService.deletePaymentMethod(id);
      setCards(cards.filter((c) => c.id !== id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to delete card");
    }
  };

  const handlePasswordSave = async () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword) {
      try {
        await updatePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        });
        setManageData({ ...manageData, password: "***********" });
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (err) {
        alert("Failed to update password");
      }
    }
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setEditingAddress(null);
    setAddressForm({ name: "", address: "", phone: "" });
  };

  const closeCardModal = () => {
    setShowCardModal(false);
    setCardForm({ cardNumber: "", expiry: "", cvv: "" });
  };

  const handleSaveManageData = async () => {
    try {
      await updateProfile({
        username: manageData.username,
        email: manageData.email,
        phone: manageData.phone,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save account information");
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Information</h3>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which are your favorite categories?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                          profileData.favoriteCategories.includes(cat)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which are your favorite styles?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => toggleStyle(style)}
                        className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                          profileData.favoriteStyles.includes(style)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                onClick={handleSave}
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        );

      case "Address":
        return (
          <div className="space-y-6">
            <button
              onClick={handleAddAddress}
              className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Add New Address
            </button>

            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-[20px] border border-gray-200 p-6 w-[546px] h-[229px] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-900 text-left">
                      {addr.name}
                    </h4>
                    <p className="text-sm text-gray-600 max-w-[210px] leading-relaxed text-left">
                      {addr.address}
                    </p>
                  </div>
                  <span className="text-sm text-gray-900 text-right">{addr.phone}</span>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditAddress(addr)}
                    className="text-sm text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}

            {showAddressModal && (
              <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) closeAddressModal();
                }}
              >
                <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={addressForm.name}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={addressForm.address}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, address: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                        rows={3}
                        placeholder="Enter address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="+234 0000000000"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={closeAddressModal}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAddress}
                      className="flex-1 px-4 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "Payment":
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddCard}
                className="w-[459px] h-[153px] rounded-[20px] border border-gray-200 bg-white flex items-center gap-6 px-6 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <div className="w-[193px] h-[119px] rounded-xl border border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-sm text-gray-500 font-medium">ADD A NEW CARD</span>
              </button>

              {cards.map((card) => (
                <div
                  key={card.id}
                  className="w-[459px] h-[153px] rounded-[20px] border border-gray-200 bg-white flex items-center gap-6 px-6"
                >
                  <div className="w-[180px] h-[100px] rounded-xl bg-gradient-to-br from-[#032B79] to-[#021a5e] relative overflow-hidden flex-shrink-0">
                    <div className="absolute bottom-2 left-3 text-[10px] text-white/80">
                      ************{card.last4}
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 translate-x-4"></div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      {card.type}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ************{card.last4}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>

            {showCardModal && (
              <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) closeCardModal();
                }}
              >
                <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Add New Card
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardForm.cardNumber}
                        onChange={(e) =>
                          setCardForm({ ...cardForm, cardNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="0000 0000 0000 0000"
                        maxLength={16}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardForm.expiry}
                          onChange={(e) =>
                            setCardForm({ ...cardForm, expiry: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardForm.cvv}
                          onChange={(e) =>
                            setCardForm({ ...cardForm, cvv: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                          placeholder="***"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={closeCardModal}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCard}
                      className="flex-1 px-4 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Save Card
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "Manage":
        return (
          <div className="bg-white rounded-[20px] border border-gray-200 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Manage My Account</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={manageData.username}
                  onChange={(e) => setManageData({ ...manageData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  value={manageData.email}
                  onChange={(e) => setManageData({ ...manageData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={manageData.phone}
                  onChange={(e) => setManageData({ ...manageData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={manageData.password}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSaveManageData}
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>

            {showPasswordModal && (
              <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) closePasswordModal();
                }}
              >
                <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={closePasswordModal}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePasswordSave}
                      className="flex-1 px-4 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Save Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

     case "VIP":
  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Dynasteez VIP Membership Eligibility</h3>
        <p className="text-sm text-gray-600 mb-2">To become a Dynasteez VIP member:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            You must register through the official Dynasteez platform.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            You must provide accurate and complete information during registration.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Dynasteez reserves the right to approve, suspend, or terminate VIP membership at its discretion.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">VIP Membership</h3>
        <p className="text-sm text-gray-600 mb-2">VIP members may receive:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Early access to new drops and collections.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Exclusive discounts and promotions.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Priority order processing.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Access to limited edition products.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Special member-only events, content, or offers.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Membership Rules</h3>
        <p className="text-sm text-gray-600 mb-2">By participating in the VIP program, members agree:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Not to misuse discount codes or promotional offers.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Not to share exclusive VIP access links or benefits for unauthorized use.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            To maintain respectful conduct within the Dynasteez community.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Payments & Subscriptions</h3>
        <p className="text-sm text-gray-600 mb-2">If the VIP membership includes a paid subscription:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Payments must be completed through approved payment methods.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Membership fees are non-refundable unless stated otherwise.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Failure to complete recurring payments may result in loss of VIP access.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Cancellation & Termination</h3>
        <p className="text-sm text-gray-600 mb-3">
          Members may cancel their VIP membership at any time through their account settings or by contacting support. Dynasteez reserves the right to terminate or suspend VIP access if:
        </p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Fraudulent activity is detected
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Terms are violated
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Misuse of benefits occurs
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Intellectual Property</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          All exclusive VIP content, previews, media, and product releases remain the property of Dynasteez and may not be copied, redistributed, or resold without permission.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
        <p className="text-sm text-gray-600 mb-2">Dynasteez is not responsible for:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Technical interruptions affecting VIP access.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Delays in product releases or deliveries.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Third-party payment or service provider issues.
          </li>
        </ul>
      </div>
    </div>
  );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Saved Successfully</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <a href={LANDING_URL} className="hover:text-black transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">My Account</span>
      </div>

      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Hi {userFirstName}!
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex justify-between overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 text-center px-4 py-2.5 text-sm font-medium transition-all duration-200 relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default MyAccount;