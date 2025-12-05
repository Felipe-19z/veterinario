
import api from './api';

export const getInboxMessages = (userId: string) => {
  return api.get('/inbox', { params: { userId } });
};
