import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import capImage from "../../assets/placeholder-caps.jpg";
import shirtImage from "../../assets/placeholder-shirt.jpg";

function Favorite() {
  const [activeTab, setActiveTab] = useState("Wishlist");

  const tabs = [
    { id: "Wishlist", label: "Wishlist" },
    { id: "Recently Viewed", label: "Recently Viewed" },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Dynasteez Cap",
      price: 20000,
      image: capImage,
      isFavorite: true,
    },
    {
      id: 2,
      name: "Dynasteez Shirt",
      price: 60000,
      image: shirtImage,
      isFavorite: true,
    },
  ];

  const formatPrice = (price) => {
    return `₦ ${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Favorite</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-center px-4 py-2.5 text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {activeTab === "Wishlist" && (
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="w-40">
                {/* Image Container */}
                <div className="relative w-40 h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Heart Icon */}
                  <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.price)}
                    </p>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <ShoppingCart className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Recently Viewed" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No recently viewed items</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorite;