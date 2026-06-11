import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, Home, ChevronRight } from "lucide-react";

const LANDING_URL = 'http://localhost:5175';

// Map of product IDs to images (shared with landing page)
const PRODUCT_IMAGES = {
  1: '/assets/images/placeholder-detail-2.jpg',
  2: '/assets/images/products/hoodie/white/front.jpg',
  3: '/assets/images/placeholder-model-1.jpg',
  4: '/assets/images/placeholder-shirt.jpg',
  5: '/assets/images/placeholder-sleeves.jpg',
  6: '/assets/images/placeholder-jerseys.jpg',
  7: '/assets/images/placeholder-polo.jpg',
  8: '/assets/images/placeholder-joggers.jpg',
  9: '/assets/images/placeholder-hoodie.jpg',
  10: '/assets/images/placeholder-model-3.jpg',
  11: '/assets/images/placeholder-caps.jpg',
  12: '/assets/images/placeholder-detail-1.jpg',
};

const PRODUCT_NAMES = {
  1: 'Dynasteez T-shirt',
  2: 'Dynasteez Hoodie',
  3: 'Dynasteez Classic Hoodie',
  4: 'Dynasteez Striped Shirt',
  5: 'Dynasteez Long Sleeve',
  6: 'Dynasteez 77 Jersey',
  7: 'Dynasteez Polo',
  8: 'Dynasteez Joggers',
  9: 'Dynasteez Black Hoodie',
  10: 'Dynasteez DSC Tee',
  11: 'Dynasteez Crown Cap',
  12: 'Dynasteez Galaxy Hoodie',
};

const PRODUCT_PRICES = {
  1: 20000,
  2: 50000,
  3: 52000,
  4: 42000,
  5: 32000,
  6: 38000,
  7: 28000,
  8: 45000,
  9: 50000,
  10: 35000,
  11: 15000,
  12: 55000,
};

function Favorite() {
  const [activeTab, setActiveTab] = useState("Wishlist");
  const [wishlistItems, setWishlistItems] = useState([]);

  const tabs = [
    { id: "Wishlist", label: "Wishlist" },
    { id: "Recently Viewed", label: "Recently Viewed" },
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const saved = localStorage.getItem('dynasteez_favorites');
        if (saved) {
          const ids = JSON.parse(saved);
          const items = ids.map(id => ({
            id,
            name: PRODUCT_NAMES[id] || `Product ${id}`,
            price: PRODUCT_PRICES[id] || 0,
            image: PRODUCT_IMAGES[id] || '/assets/images/placeholder-hoodie.jpg',
          }));
          setWishlistItems(items);
        }
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
    };

    loadFavorites();
    
    // Listen for changes from other tabs/windows
    const handleStorage = () => loadFavorites();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const removeFavorite = (id) => {
    try {
      const saved = localStorage.getItem('dynasteez_favorites');
      if (saved) {
        const ids = JSON.parse(saved).filter(favId => favId !== id);
        localStorage.setItem('dynasteez_favorites', JSON.stringify(ids));
        setWishlistItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (e) {
      console.error('Failed to remove favorite', e);
    }
  };

  const formatPrice = (price) => {
    return `₦ ${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <a href={LANDING_URL} className="hover:text-black transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Favorite</span>
      </div>

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
                className={`flex-1 text-center px-4 py-2.5 text-sm font-medium transition-all duration-200 relative cursor-pointer select-none ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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
          <>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm">Your wishlist is empty</p>
                <p className="text-gray-400 text-xs mt-1">Browse products and tap the heart to save them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Remove button */}
                      <button 
                        onClick={() => removeFavorite(item.id)}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price)}
                        </p>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                          <ShoppingCart className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
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