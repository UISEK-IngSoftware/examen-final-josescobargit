import axios from 'axios';
import { CharacterResponse } from '../data/characterTypes';

const API_BASE_URL = 'https://futuramaapi.com/api/characters';

export const getFuturamaCharacters = async () => {
  try {
    const response = await axios.get<CharacterResponse>(API_BASE_URL, {
      params: {
        orderBy: 'id',
        orderByDirection: 'asc',
        page: 1,
        size: 50
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
