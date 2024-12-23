import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const positionLevelsApi = createApi({
  reducerPath: "positionLevelsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/position-level`,
  }),

  endpoints: (builder) => ({
    getAllPositionLevels: builder.query<positionLevels[], null>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllPositionLevelsQuery } = positionLevelsApi;
