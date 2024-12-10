import { IRole } from "@/utils/interfaces/auth/role.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roleApi = createApi({
  reducerPath: "roleApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
  }),

  endpoints: (builder) => ({
    getAllRoles: builder.query<IRole[], null>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllRolesQuery } = roleApi;
