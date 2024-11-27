import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genderTypesApi = createApi({
  reducerPath: "genderTypesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/gender-types`,
  }),

  endpoints: (builder) => ({
    getAllGenderTypes: builder.query<GenderType[], null>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllGenderTypesQuery} = genderTypesApi;
