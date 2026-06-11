import { useEffect, useCallback } from 'react';
import customerService from '../services/customerService';
import useApi from './useApi';

/**
 * Custom hook for managing customer addresses
 * @returns {Object} { addresses, loading, error, addAddress, updateAddress, deleteAddress, setDefaultAddress, refresh }
 */
export const useAddresses = () => {
  const {
    data: addresses,
    loading,
    error,
    execute: fetchAddresses,
    setData: setAddresses,
  } = useApi(customerService.getAddresses, []);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const addAddress = useCallback(
    async (addressData) => {
      try {
        const newAddress = await customerService.addAddress(addressData);
        setAddresses((prev) => [...prev, newAddress]);
        return newAddress;
      } catch (err) {
        console.error('Failed to add address:', err);
        throw err;
      }
    },
    [setAddresses]
  );

  const updateAddress = useCallback(
    async (addressId, addressData) => {
      try {
        const updated = await customerService.updateAddress(addressId, addressData);
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === addressId ? updated : addr))
        );
        return updated;
      } catch (err) {
        console.error('Failed to update address:', err);
        throw err;
      }
    },
    [setAddresses]
  );

  const deleteAddress = useCallback(
    async (addressId) => {
      try {
        await customerService.deleteAddress(addressId);
        setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      } catch (err) {
        console.error('Failed to delete address:', err);
        throw err;
      }
    },
    [setAddresses]
  );

  const setDefaultAddress = useCallback(
    async (addressId) => {
      try {
        await customerService.setDefaultAddress(addressId);
        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            isDefault: addr.id === addressId,
          }))
        );
      } catch (err) {
        console.error('Failed to set default address:', err);
        throw err;
      }
    },
    [setAddresses]
  );

  const refresh = async () => {
    return fetchAddresses();
  };

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    refresh,
  };
};

export default useAddresses;
