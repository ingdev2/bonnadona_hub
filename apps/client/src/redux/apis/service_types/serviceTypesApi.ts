import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceTypesApi = createApi({
  reducerPath: "serviceTypesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/service-types`,
  }),

  endpoints: (builder) => ({
    getAllServiceTypes: builder.query<ServiceType[], null>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllServiceTypesQuery } = serviceTypesApi;
