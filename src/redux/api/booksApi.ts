import type { IBooksResponse } from "@/types";
import { baseApi } from "./baseApi";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<
      IBooksResponse,
      {
        page?: number;
        limit?: number;
        filter?: string;
        sortBy?: string;
        sort?: string;
      }
    >({
      query: (params) => ({
        url: "/books",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.filter && { filter: params.filter }),
          sortBy: params.sortBy || "createdAt",
          sort: params.sort || "desc",
        },
      }),
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ _id, ...rest }) => {
        if (!_id || typeof _id !== "string" || !_id.trim()) {
          throw new Error(
            "Book _id is required and must be a valid string for update."
          );
        }
        return {
          url: `/books/${_id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
