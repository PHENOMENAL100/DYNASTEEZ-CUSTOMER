import { useCallback } from 'react';
import favoriteService from '../services/favoriteService';
import useApi from './useApi';

/**
 * Custom hook for managing favorites (wishlist and recently viewed)
 * @returns {Object} { wishlist, recentlyViewed, loading, error, addToWishlist, removeFromWishlist, addRecentlyViewed, checkIfFavorite }
 */
export const useFavorites = () => {
  const {
    data: wishlist,
    loading: wishlistLoading,
    error: wishlistError,
    execute: fetchWishlist,
    setData: setWishlist,
  } = useApi(() => favoriteService.getWishlist());

  const {
    data: recentlyViewed,
    loading: recentlyViewedLoading,
    error: recentlyViewedError,
    execute: fetchRecentlyViewed,
    setData: setRecentlyViewed,
  } = useApi(() => favoriteService.getRecentlyViewed());

  const addToWishlist = useCallback(async (productId) => {
    try {
      const result = await favoriteService.addToWishlist(productId);
      // Update local state to add the new item
      setWishlist((prev) => ({
        ...prev,
        items: [result, ...(prev?.items || [])],
      }));
      return result;
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
      throw err;
    }
  }, [setWishlist]);

  const removeFromWishlist = useCallback(async (productId) => {
    try {
      await favoriteService.removeFromWishlist(productId);
      // Update local state to remove the item
      setWishlist((prev) => ({
        ...prev,
        items: prev?.items?.filter((item) => item.id !== productId) || [],
      }));
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      throw err;
    }
  }, [setWishlist]);

  const addRecentlyViewed = useCallback(async (productId) => {
    try {
      const result = await favoriteService.addRecentlyViewed(productId);
      // Update local state
      setRecentlyViewed((prev) => ({
        ...prev,
        items: [result, ...(prev?.items || [])],
      }));
      return result;
    } catch (err) {
      console.error('Failed to add to recently viewed:', err);
      throw err;
    }
  }, [setRecentlyViewed]);

  const checkIfFavorite = useCallback(async (productId) => {
    try {
      const result = await favoriteService.isInWishlist(productId);
      return result.isInWishlist;
    } catch (err) {
      console.error('Failed to check favorite status:', err);
      return false;
    }
  }, []);

  const clearRecentlyViewed = useCallback(async () => {
    try {
      await favoriteService.clearRecentlyViewed();
      setRecentlyViewed({ items: [] });
    } catch (err) {
      console.error('Failed to clear recently viewed:', err);
      throw err;
    }
  }, [setRecentlyViewed]);

  return {
    wishlist,
    recentlyViewed,
    loading: wishlistLoading || recentlyViewedLoading,
    error: wishlistError || recentlyViewedError,
    fetchWishlist,
    fetchRecentlyViewed,
    addToWishlist,
    removeFromWishlist,
    addRecentlyViewed,
    checkIfFavorite,
    clearRecentlyViewed,
  };
};

export default useFavorites;
