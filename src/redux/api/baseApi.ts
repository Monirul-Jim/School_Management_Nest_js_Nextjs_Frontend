// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API,
//     credentials: "include",
//   }),
//   tagTypes: ["user"],
//   endpoints: () => ({}),
// });

import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../feature/store";
import { logout, setUser } from "../feature/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try refreshing token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // store new access token in redux
      api.dispatch(
        setUser({
          user: (api.getState() as RootState).auth.user!,
          token: (refreshResult.data as { accessToken: string }).accessToken,
        })
      );
      // Retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user",'StudentClass','Student'],
  endpoints: () => ({}),
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../feature/store";
// import { logout, setUser } from "../feature/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // Try refreshing token
//     const refreshResult = await baseQuery(
//       { url: "/auth/refresh", method: "POST" },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       // store new access token in redux
//       api.dispatch(setUser({ user: (api.getState() as RootState).auth.user!, token: (refreshResult.data as { accessToken: string }).accessToken }));
//       // Retry original query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // If refresh fails, logout
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["user"],
//   endpoints: () => ({}),
// });
