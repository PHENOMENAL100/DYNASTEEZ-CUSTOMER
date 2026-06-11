# API Hooks Structure

This directory contains custom React hooks for API integration following best practices.

## 📁 Project Structure

```
src/
├── hooks/                     # Custom React hooks
│   ├── useApi.js             # Base hook for API calls
│   ├── useCustomerProfile.js # Profile management
│   ├── useOrders.js          # Orders management
│   ├── useFavorites.js       # Wishlist & recently viewed
│   ├── useAddresses.js       # Address management
│   └── index.js              # Export all hooks
│
├── services/                  # API service layer
│   ├── customerService.js    # Customer endpoints
│   ├── orderService.js       # Order endpoints
│   └── favoriteService.js    # Favorite endpoints
│
└── utils/
    └── apiClient.js          # API client with fetch
```

## 🚀 Quick Start

### 1. Setup Environment

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Import Hooks in Components

```jsx
import { useOrders, useCustomerProfile, useFavorites, useAddresses } from '../hooks';

function MyComponent() {
  const { orders, loading, error, fetchOrders } = useOrders();
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {orders && orders.map(order => <div key={order.id}>{order.id}</div>)}
    </div>
  );
}
```

## 📚 Available Hooks

### `useApi(apiFunction, initialData)`
Base hook for all API calls

**Returns:**
- `data` - The API response data
- `loading` - Boolean loading state
- `error` - Error message if any
- `execute` - Function to call the API
- `reset` - Function to reset state
- `setData` - Function to manually set data

**Example:**
```jsx
const { data, loading, error, execute } = useApi(customerService.getProfile);
```

### `useCustomerProfile()`
Manage customer profile data

**Returns:**
- `profile` - Customer profile object
- `loading` - Loading state
- `error` - Error message
- `updateProfile(profileData)` - Update profile
- `updatePassword(passwordData)` - Change password
- `refresh()` - Refetch profile

**Example:**
```jsx
const { profile, updateProfile } = useCustomerProfile();
```

### `useOrders()`
Manage customer orders

**Returns:**
- `orders` - Array of orders
- `loading` - Loading state
- `error` - Error message
- `filters` - Current filter state
- `updateFilters(newFilters)` - Update filters (status, page, limit)
- `fetchOrders()` - Refetch orders
- `getOrderById(orderId)` - Get order details
- `getOrderTracking(orderId)` - Get tracking info
- `cancelOrder(orderId, reason)` - Cancel order
- `createReturn(orderId, returnData)` - Create return request
- `submitReview(orderId, reviewData)` - Submit order review

**Example:**
```jsx
const { orders, updateFilters, cancelOrder } = useOrders();

// Filter orders by status
updateFilters({ status: 'Delivered' });

// Cancel an order
await cancelOrder('ORD-001', 'Changed my mind');
```

### `useFavorites()`
Manage wishlist and recently viewed

**Returns:**
- `wishlist` - Wishlist items
- `recentlyViewed` - Recently viewed items
- `loading` - Loading state
- `error` - Error message
- `addToWishlist(productId)` - Add product to wishlist
- `removeFromWishlist(productId)` - Remove from wishlist
- `addRecentlyViewed(productId)` - Add to recently viewed
- `checkIfFavorite(productId)` - Check if in wishlist
- `clearRecentlyViewed()` - Clear recently viewed

**Example:**
```jsx
const { wishlist, addToWishlist, removeFromWishlist } = useFavorites();

// Add product to wishlist
await addToWishlist(productId);

// Remove from wishlist
await removeFromWishlist(productId);
```

### `useAddresses()`
Manage customer addresses

**Returns:**
- `addresses` - Array of addresses
- `loading` - Loading state
- `error` - Error message
- `addAddress(addressData)` - Add new address
- `updateAddress(addressId, addressData)` - Update address
- `deleteAddress(addressId)` - Delete address
- `setDefaultAddress(addressId)` - Set default address
- `refresh()` - Refetch addresses

**Example:**
```jsx
const { addresses, addAddress, deleteAddress } = useAddresses();

// Add new address
await addAddress({ name: 'Home', address: '123 Main St', phone: '+234...' });

// Delete address
await deleteAddress(addressId);
```

## 🔒 Authentication

The API client automatically includes the Bearer token from localStorage:

```jsx
// Set token after login
localStorage.setItem('authToken', token);

// Token is automatically included in all API requests
// It's removed if a 401 response is received
```

## 🛠️ API Endpoints Structure

The services map to these backend endpoints:

### Customer Endpoints
- `GET /customers/profile` - Get profile
- `PUT /customers/profile` - Update profile
- `PUT /customers/password` - Update password
- `GET /customers/addresses` - Get addresses
- `POST /customers/addresses` - Add address
- `PUT /customers/addresses/:id` - Update address
- `DELETE /customers/addresses/:id` - Delete address
- `PATCH /customers/addresses/:id/default` - Set default

### Order Endpoints
- `GET /orders` - Get orders (supports filters: status, page, limit)
- `GET /orders/:id` - Get order details
- `GET /orders/:id/tracking` - Get tracking
- `PATCH /orders/:id/cancel` - Cancel order
- `POST /orders/:id/returns` - Create return
- `GET /returns/:id` - Get return details
- `POST /orders/:id/reviews` - Submit review
- `GET /orders/:id/reviews` - Get reviews

### Favorites Endpoints
- `GET /favorites/wishlist` - Get wishlist
- `POST /favorites/wishlist` - Add to wishlist
- `DELETE /favorites/wishlist/:productId` - Remove from wishlist
- `GET /favorites/recently-viewed` - Get recently viewed
- `POST /favorites/recently-viewed` - Add to recently viewed
- `DELETE /favorites/recently-viewed` - Clear recently viewed
- `GET /favorites/wishlist/:productId/check` - Check if in wishlist

## 💡 Best Practices

1. **Use hooks in functional components** - All hooks follow React hooks rules
2. **Handle errors gracefully** - Always check the `error` state
3. **Show loading states** - Use the `loading` state for UI feedback
4. **Validate data** - Validate user input before sending to API
5. **Use filters efficiently** - Don't refetch if filters haven't changed
6. **Handle token expiration** - Token is automatically removed on 401

## 🔗 Integration Example

See [EXAMPLES.md](./EXAMPLES.md) for complete integration examples in components.

