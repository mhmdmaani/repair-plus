import { User } from '@/api/User';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useSearchUsers = (data: any) => {
  return useQuery({
    queryKey: [
      'users',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
    ],
    queryFn: () => User.getSearch(data),
  });
};

export const useSearchUsersByName = (name: string) => {
  return useQuery({
    queryKey: ['users', name],
    queryFn: () => User.getSearchByName(name),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => User.getById(id),
  });
};

// create
export const useCreateUser = () => {
  return useMutation({
    mutationFn: User.create,
  });
};

// update

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: User.update,
  });
};

// delete
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: User.delete,
  });
};
