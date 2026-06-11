import apiClient from '../utils/apiClient';

const orderService = {
  // Get all orders with filters
  getOrders(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.sort) params.append('sort', filters.sort);

    const queryString = params.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint);
  },

  // Get single order details
  getOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`);
  },

  // Get order tracking
  getOrderTracking(orderId) {
    return apiClient.get(`/orders/${orderId}/tracking`);
  },

  // Cancel order
  cancelOrder(orderId, reason = '') {
    return apiClient.patch(`/orders/${orderId}/cancel`, { reason });
  },

  // Create return request
  createReturn(orderId, returnData) {
    return apiClient.post(`/orders/${orderId}/returns`, returnData);
  },

  // Get return details
  getReturnDetails(returnId) {
    return apiClient.get(`/returns/${returnId}`);
  },

  // Submit review for order
  submitReview(orderId, reviewData) {
    return apiClient.post(`/orders/${orderId}/reviews`, reviewData);
  },

  // Get order reviews
  getOrderReviews(orderId) {
    return apiClient.get(`/orders/${orderId}/reviews`);
  },

  // Repeat order
  repeatOrder(orderId) {
    return apiClient.post(`/orders/${orderId}/repeat`, {});
  },
};

export default orderService;
