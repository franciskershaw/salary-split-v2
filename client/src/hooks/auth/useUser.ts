import { useQueryClient, useQuery } from '@tanstack/react-query';
import useAxios from '../axios/useAxios';
import { queryKeys } from '@/providers/Providers';
import { User } from '../../types/types';

const useUser = () => {
  const api = useAxios();
  const queryClient = useQueryClient();

  const getUser = async () => {
    const response = await api.get('/api/users/refreshToken');
    if (response.status === 200) {
      const user = await api.get('/api/users', {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return user.data;
    }
  };

  const { data: user, isFetching: fetchingUser } = useQuery(
    [queryKeys.user],
    () => getUser()
  );

  function updateUser(newUser: User) {
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  async function clearUser() {
    try {
      await api.post('/api/users/logout');
      queryClient.setQueryData<User | null>([queryKeys.user], null);
      queryClient.removeQueries([queryKeys.transactions]);
      queryClient.removeQueries([queryKeys.accounts]);
      console.log('Successfully logged out');
    } catch (error) {
      console.log('error');
    }
  }

  return { user: user ?? null, fetchingUser, updateUser, clearUser };
};

export default useUser;
