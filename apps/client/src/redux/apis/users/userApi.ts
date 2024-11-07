import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
  }),

  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], null>({
      query: () => "getAllUsers",
    }),

    getUser: builder.query<User, string>({
      query: (Id) => `getUser/${Id}`,
    }),

    getUserProfileById: builder.query<User, string>({
      query: (Id) => `getUserProfileById/${Id}`,
    }),

    getCollaboratorUserByIdNumber: builder.query<User, string>({
      query: (IdNumber) => `getCollaboratorUserByIdNumber/${IdNumber}`,
    }),

    getSuperAdminUserByIdNumber: builder.query<User, string>({
      query: (IdNumber) => `getSuperAdminUserByIdNumber/${IdNumber}`,
    }),

    getAdminUserByIdNumber: builder.query<User, string>({
      query: (IdNumber) => `getAdminUserByIdNumber/${IdNumber}`,
    }),

    getAdminsUserByIdNumber: builder.query<User, string>({
      query: (IdNumber) => `getAdminsUserByIdNumber/${IdNumber}`,
    }),

    getAuditorUserByIdNumber: builder.query<User, string>({
      query: (IdNumber) => `getAuditorUserByIdNumber/${IdNumber}`,
    }),

    getUserActiveByEmail: builder.query<User, string>({
      query: (principalEmail) => `getUserActiveByEmail/${principalEmail}`,
    }),

    getUserRoles: builder.query<User, string>({
      query: (Id) => `getUserRoles/${Id}`,
    }),

    updateUser: builder.mutation<
      any,
      { id: number; updateUser: Partial<User> }
    >({
      query: ({ id, updateUser }) => ({
        url: `updateUser/${id}`,
        method: "PATCH",
        params: { id },
        body: updateUser,
      }),
    }),

    updateUserProfile: builder.mutation<
      any,
      { id: number; updateUserProfile: Partial<User> }
    >({
      query: ({ id, updateUserProfile }) => ({
        url: `updateUserProfile/${id}`,
        method: "PATCH",
        params: { id },
        body: updateUserProfile,
      }),
    }),

    updateUserPassword: builder.mutation<
      any,
      { id: number; updateUserPassword: Partial<User> }
    >({
      query: ({ id, updateUserPassword }) => ({
        url: `updateUserPassword/${id}`,
        method: "PATCH",
        params: { id },
        body: updateUserPassword,
      }),
    }),

    forgotUserPassword: builder.mutation<
      any,
      { forgotUserPassword: Partial<User> }
    >({
      query: ({ forgotUserPassword }) => ({
        url: `forgotUserPassword`,
        method: "PATCH",
        body: forgotUserPassword,
      }),
    }),

    banUser: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `ban/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetUserProfileByIdQuery,
  useGetCollaboratorUserByIdNumberQuery,
  useGetSuperAdminUserByIdNumberQuery,
  useGetAdminUserByIdNumberQuery,
  useGetAdminsUserByIdNumberQuery,
  useGetAuditorUserByIdNumberQuery,
  useGetUserActiveByEmailQuery,
  useGetUserRolesQuery,
  useUpdateUserMutation,
  useBanUserMutation,
} = userApi;
