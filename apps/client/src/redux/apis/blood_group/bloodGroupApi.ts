import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bloodGroupApi = createApi({
  reducerPath: "bloodGroupApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-groups`,
  }),

  endpoints: (builder) => ({
    getAllBloodGroups: builder.query<BloodGroup[], null>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllBloodGroupsQuery } = bloodGroupApi;
