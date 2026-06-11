/**
 * EXAMPLE: How to use the hooks in your components
 * 
 * This file demonstrates how to integrate the custom hooks into React components.
 * Copy these patterns into your actual pages.
 */

import { useCustomerProfile, useAddresses, useOrders, useFavorites } from '../../hooks';

// ============================================
// EXAMPLE 1: Using useCustomerProfile
// ============================================
function MyAccountExample() {
  const {
    profile,
    loading,
    error,
    updateProfile,
    updatePassword,
  } = useCustomerProfile();

  const handleSaveProfile = async (profileData) => {
    try {
      await updateProfile(profileData);
      // Show success message
      alert('Profile updated successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>My Account</h1>
      <p>Username: {profile?.username}</p>
      <p>Email: {profile?.email}</p>
      <button onClick={() => handleSaveProfile({ /* data */ })}>
        Update Profile
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Using useOrders
// ============================================
function OrdersExample() {
  const {
    orders,
    loading,
    error,
    filters,
    updateFilters,
    fetchOrders,
    cancelOrder,
    submitReview,
    getOrderTracking,
  } = useOrders();

  const handleFilterChange = (status) => {
    updateFilters({ status, page: 1 });
    fetchOrders();
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId, 'Changed my mind');
      alert('Order cancelled successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSubmitReview = async (orderId, reviewData) => {
    try {
      await submitReview(orderId, reviewData);
      alert('Review submitted successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => handleFilterChange(null)}>All</button>
        <button onClick={() => handleFilterChange('Delivered')}>Delivered</button>
        <button onClick={() => handleFilterChange('Pending')}>Pending</button>
      </div>

      {/* Orders List */}
      <div>
        {orders?.map((order) => (
          <div key={order.id} className="border p-4 mb-2">
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₦{order.total.toLocaleString()}</p>
            <button onClick={() => handleCancelOrder(order.id)}>
              Cancel Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Using useFavorites
// ============================================
function FavoriteExample() {
  const {
    wishlist,
    recentlyViewed,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    addRecentlyViewed,
  } = useFavorites();

  const handleAddToWishlist = async (productId) => {
    try {
      await addToWishlist(productId);
      alert('Added to wishlist!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      alert('Removed from wishlist');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Loading favorites...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Favorites</h1>

      {/* Wishlist */}
      <h2>Wishlist</h2>
      <div className="grid grid-cols-4 gap-4">
        {wishlist?.items?.map((item) => (
          <div key={item.id} className="border p-4">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>₦{item.price.toLocaleString()}</p>
            <button
              onClick={() => handleRemoveFromWishlist(item.id)}
              className="bg-red-500 text-white px-4 py-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Recently Viewed */}
      <h2>Recently Viewed</h2>
      <div className="grid grid-cols-4 gap-4">
        {recentlyViewed?.items?.map((item) => (
          <div key={item.id} className="border p-4">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>₦{item.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Using useAddresses
// ============================================
function AddressesExample() {
  const {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses();

  const handleAddAddress = async (addressData) => {
    try {
      await addAddress(addressData);
      alert('Address added successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      alert('Address deleted');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Loading addresses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>My Addresses</h1>
      
      {addresses?.map((address) => (
        <div key={address.id} className="border p-4 mb-2">
          <p className="font-bold">{address.name}</p>
          <p>{address.address}</p>
          <p>{address.phone}</p>
          {address.isDefault && <span className="bg-blue-500 text-white px-2">Default</span>}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setDefaultAddress(address.id)}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Set Default
            </button>
            <button
              onClick={() => handleDeleteAddress(address.id)}
              className="bg-red-500 text-white px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { MyAccountExample, OrdersExample, FavoriteExample, AddressesExample };
