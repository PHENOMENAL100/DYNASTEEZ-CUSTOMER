import { useEffect } from 'react';
import customerService from '../services/customerService';
import useApi from './useApi';

/**
 * Custom hook for managing customer profile
 * @returns {Object} { profile, loading, error, updateProfile, updatePassword, refresh }
 */
export const useCustomerProfile = () => {
  const {
    data: profile,
    loading,
    error,
    execute: fetchProfile,
    setData: setProfile,
  } = useApi(customerService.getProfile);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (profileData) => {
    try {
      const updated = await customerService.updateProfile(profileData);
      setProfile(updated);
      return updated;
    } catch (err) {
      console.error('Failed to update profile:', err);
      throw err;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      await customerService.updatePassword(passwordData);
      return { success: true };
    } catch (err) {
      console.error('Failed to update password:', err);
      throw err;
    }
  };

  const refresh = async () => {
    return fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    updatePassword,
    refresh,
  };
};

export default useCustomerProfile;
