import API from './axios';

export const updateLocation = async (lat, lng) => {
  const response = await API.post('/location/update', { lat, lng });
  return response.data;
};

export const getAllLocations = async () => {
  const response = await API.get('/location/all');
  return response.data;
};
