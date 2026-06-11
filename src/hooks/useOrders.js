import { useState, useCallback } from 'react';
import orderService from '../services/orderService';
import useApi from './useApi';

/**
 * Custom hook for managing orders
 * @returns {Object} { orders, loading, error, filters, setFilters, fetchOrders, getOrderById, createReturn, submitReview, cancelOrder }
 */
export const useOrders = () => {
  const [filters, setFilters] = useState({
    status: null,
    page: 1,
    limit: 10,
  });

  const {
    data: orders,
    loading,
    error,
    execute: fetchOrders,
    setData: setOrders,
  } = useApi(() => orderService.getOrders(filters));

  const getOrderById = useCallback(async (orderId) => {
    try {
      return await orderService.getOrderById(orderId);
    } catch (err) {
      console.error('Failed to fetch order:', err);
      throw err;
    }
  }, []);

  const getOrderTracking = useCallback(async (orderId) => {
    try {
      return await orderService.getOrderTracking(orderId);
    } catch (err) {
      console.error('Failed to fetch tracking:', err);
      throw err;
    }
  }, []);

  const cancelOrder = useCallback(async (orderId, reason = '') => {
    try {
      const result = await orderService.cancelOrder(orderId, reason);
      // Update local state
      setOrders((prevOrders) =>
        prevOrders?.map((order) =>
          order.id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
      return result;
    } catch (err) {
      console.error('Failed to cancel order:', err);
      throw err;
    }
  }, [setOrders]);

  const createReturn = useCallback(async (orderId, returnData) => {
    try {
      return await orderService.createReturn(orderId, returnData);
    } catch (err) {
      console.error('Failed to create return:', err);
      throw err;
    }
  }, []);

  const submitReview = useCallback(async (orderId, reviewData) => {
    try {
      return await orderService.submitReview(orderId, reviewData);
    } catch (err) {
      console.error('Failed to submit review:', err);
      throw err;
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    orders,
    loading,
    error,
    filters,
    updateFilters,
    fetchOrders,
    getOrderById,
    getOrderTracking,
    cancelOrder,
    createReturn,
    submitReview,
  };
};

export default useOrders;
