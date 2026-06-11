import apiClient from '../utils/apiClient';

const favoriteService = {
  // Get wishlist items
  getWishlist(page = 1, limit = 20) {
    return apiClient.get(`/favorites/wishlist?page=${page}&limit=${limit}`);
  },

  // Add item to wishlist
  addToWishlist(productId) {
    return apiClient.post('/favorites/wishlist', { productId });
  },

  // Remove item from wishlist
  removeFromWishlist(productId) {
    return apiClient.delete(`/favorites/wishlist/${productId}`);
  },

  // Get recently viewed items
  getRecentlyViewed(limit = 20) {
    return apiClient.get(`/favorites/recently-viewed?limit=${limit}`);
  },

  // Add to recently viewed
  addRecentlyViewed(productId) {
    return apiClient.post('/favorites/recently-viewed', { productId });
  },

  // Clear recently viewed
  clearRecentlyViewed() {
    return apiClient.delete('/favorites/recently-viewed');
  },

  // Check if product is in wishlist
  isInWishlist(productId) {
    return apiClient.get(`/favorites/wishlist/${productId}/check`);
  },
};

export default favoriteService;
