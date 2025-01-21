import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { IRole } from "@/utils/interfaces/auth/role.interface";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session?.user.access_token}`);
  }
  return headers;
};

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllActiveUsers: builder.query<User[], null>({
      query: () => "getAllActiveUsers",
    }),

    getAllUsers: builder.query<User[], null>({
      query: () => "getAllUsers",
    }),

    getAllUsersWithProfile: builder.query<User[], null>({
      query: () => "getAllUsersWithProfile",
    }),

    getAllCollaboratorPositions: builder.query<string[], null>({
      query: () => "getAllColaboratorPositions",
    }),

    getAllCollaboratorServices: builder.query<string[], null>({
      query: () => "getAllColaboratorService",
    }),

    getUser: builder.query<User, string>({
      query: (Id) => `getUser/${Id}`,
    }),

    getUserActiveProfileById: builder.query<UserProfile, string>({
      query: (Id) => `getUserActiveProfileById/${Id}`,
    }),

    getUserProfileById: builder.query<UserProfile, string>({
      query: (Id) => `getUserProfileById/${Id}`,
    }),

    getCollaboratorUserByIdNumber: builder.query<User, number>({
      query: (IdNumber) => `getCollaboratorUserByIdNumber/${IdNumber}`,
    }),

    getSuperAdminUserByIdNumber: builder.query<User, number>({
      query: (IdNumber) => `getSuperAdminUserByIdNumber/${IdNumber}`,
    }),

    getAdminUserByIdNumber: builder.query<User, number>({
      query: (IdNumber) => `getAdminUserByIdNumber/${IdNumber}`,
    }),

    getAdminsUserByIdNumber: builder.query<User, number>({
      query: (IdNumber) => `getAdminsUserByIdNumber/${IdNumber}`,
    }),

    getAuditorUserByIdNumber: builder.query<User, number>({
      query: (IdNumber) => `getAuditorUserByIdNumber/${IdNumber}`,
    }),

    getUserActiveByEmail: builder.query<User, string>({
      query: (principalEmail) => `getUserActiveByEmail/${principalEmail}`,
    }),

    getUserSessionLogByEmail: builder.query<UserSessionLog, string>({
      query: (principalEmail) => `getUserSessionLogByEmail/${principalEmail}`,
    }),

    getUserActiveByIdNumber: builder.query<User, number>({
      query: (id_number) => `getUserActiveByIdNumber/${id_number}`,
    }),

    getUserByIdNumber: builder.query<User, number>({
      query: (id_number) => `getUserByIdNumber/${id_number}`,
    }),

    getUserRoles: builder.query<IRole, number>({
      query: (idNumber) => `getUserRoles/${idNumber}`,
    }),

    getUserPermissions: builder.query<IPermissions[], number>({
      query: (idNumber) => `getUserPermissions/${idNumber}`,
    }),

    updateUser: builder.mutation<
      any,
      { id: string; updateUser: Partial<User> }
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
      { id: string; updateUserProfile: Partial<UserProfile> }
    >({
      query: ({ id, updateUserProfile }) => ({
        url: `updateUserProfile/${id}`,
        method: "PATCH",
        params: { id },
        body: updateUserProfile,
      }),
    }),

    updateUserDigitalSignature: builder.mutation<
      any,
      { userId: string; digitalSignature: IDigitalSignature }
    >({
      query: ({ userId, digitalSignature }) => ({
        url: `updateUserDigitalSign/${userId}`,
        method: "PATCH",
        params: { userId },
        body: digitalSignature,
      }),
    }),

    updateUserPassword: builder.mutation<
      any,
      { id: string; passwords: UpdatePassword }
    >({
      query: ({ id, passwords }) => ({
        url: `updateUserPassword/${id}`,
        method: "PATCH",
        params: { id },
        body: passwords,
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

    resetUserPassword: builder.mutation<any, ResetPassword>({
      query: ({ token, newPassword }) => ({
        url: `resetUserPassword`,
        method: "PATCH",
        params: { token },
        body: { newPassword },
      }),
    }),

    banUser: builder.mutation<any, { id: string }>({
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
  useGetAllUsersWithProfileQuery,
  useGetAllActiveUsersQuery,
  useGetAllCollaboratorPositionsQuery,
  useGetAllCollaboratorServicesQuery,
  useGetUserQuery,
  useGetUserProfileByIdQuery,
  useGetUserActiveProfileByIdQuery,
  useGetCollaboratorUserByIdNumberQuery,
  useGetSuperAdminUserByIdNumberQuery,
  useGetAdminUserByIdNumberQuery,
  useGetAdminsUserByIdNumberQuery,
  useGetAuditorUserByIdNumberQuery,
  useGetUserActiveByEmailQuery,
  useGetUserSessionLogByEmailQuery,
  useLazyGetUserSessionLogByEmailQuery,
  useGetUserActiveByIdNumberQuery,
  useGetUserByIdNumberQuery,
  useGetUserRolesQuery,
  useGetUserPermissionsQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
  useUpdateUserDigitalSignatureMutation,
  useBanUserMutation,
  useForgotUserPasswordMutation,
  useResetUserPasswordMutation,
} = userApi;
