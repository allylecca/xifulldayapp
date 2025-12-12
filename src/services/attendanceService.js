import api from './api';

export const attendanceService = {
  // Get all registered participants
  getParticipants: async () => {
    const response = await api.get('/admin/registration');
    return response.data;
  },

  // Mark attendance (Check-in)
  registerAttendance: async (registrationId) => {
    const response = await api.post('/attendance', { registrationId });
    return response.data;
  },

  // Get all attendance records (Assuming this endpoint exists based on DTOs, or we'll need to handle if it doesn't)
  getAllAttendance: async () => {
    try {
      const response = await api.get('/attendance');
      return response.data;
    } catch (error) {
      console.warn('Could not fetch attendance list, defaulting to empty', error);
      return [];
    }
  }
};
