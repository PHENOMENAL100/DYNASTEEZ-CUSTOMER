import apiClient from '../utils/apiClient';

const customerService = {
  // Profile endpoints
  getProfile() {
    return apiClient.get('/customers/profile');
  },

  updateProfile(profileData) {
    return apiClient.put('/customers/profile', profileData);
  },

  updatePassword(passwordData) {
    return apiClient.put('/customers/password', passwordData);
  },

  // Address endpoints
  getAddresses() {
    return apiClient.get('/customers/addresses');
  },

  addAddress(addressData) {
    return apiClient.post('/customers/addresses', addressData);
  },

  updateAddress(addressId, addressData) {
    return apiClient.put(`/customers/addresses/${addressId}`, addressData);
  },

  deleteAddress(addressId) {
    return apiClient.delete(`/customers/addresses/${addressId}`);
  },

  setDefaultAddress(addressId) {
    return apiClient.patch(`/customers/addresses/${addressId}/default`, {});
  },

  // Payment methods endpoints
  getPaymentMethods() {
    return apiClient.get('/customers/payment-methods');
  },

  addPaymentMethod(paymentData) {
    return apiClient.post('/customers/payment-methods', paymentData);
  },

  deletePaymentMethod(paymentMethodId) {
    return apiClient.delete(`/customers/payment-methods/${paymentMethodId}`);
  },

  setDefaultPaymentMethod(paymentMethodId) {
    return apiClient.patch(`/customers/payment-methods/${paymentMethodId}/default`, {});
  },
};

export default customerService;
