
import api from './api'; // Assuming you have a configured axios instance

interface PetData {
  name: string;
  species: string;
  ownerName: string;
}

export const registerPet = async (data: PetData) => {
  try {
    const response = await api.post('/pets', data);
    return response.data;
  } catch (error) {
    throw error; // Let the component handle the error
  }
};
