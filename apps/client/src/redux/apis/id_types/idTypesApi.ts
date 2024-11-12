import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const idTypesApi = createApi({
  reducerPath: "idTypesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/id-types`,
  }),

  endpoints: (builder) => ({
    getAllIdTypes: builder.query<IdType[], null>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllIdTypesQuery } = idTypesApi;
