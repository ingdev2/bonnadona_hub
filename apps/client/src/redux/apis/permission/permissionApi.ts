import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session?.user.access_token}`);
  }
  return headers;
};

export const permissionApi = createApi({
  reducerPath: "permissionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/permissions`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    createPermission: builder.mutation<IPermission, Partial<IPermission>>({
      query: (newPermission) => ({
        url: `create`,
        method: "POST",
        body: newPermission,
      }),
    }),

    getAllPermissions: builder.query<IPermission[], null>({
      query: () => "getAll",
    }),

    getPermissionById: builder.query<IPermission, string>({
      query: (id) => `getPermission/${id}`,
    }),

    updatePermissionById: builder.mutation<
      any,
      {
        id: string;
        updatePermission: Partial<IPermission>;
      }
    >({
      query: ({ id, updatePermission }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updatePermission,
      }),
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetAllPermissionsQuery,
  useGetPermissionByIdQuery,
  useUpdatePermissionByIdMutation,
} = permissionApi;
