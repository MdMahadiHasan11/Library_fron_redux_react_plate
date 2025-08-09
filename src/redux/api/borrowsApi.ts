import type { IBorrow, IBorrowBookRequest } from "@/types";
import { baseApi } from "./baseApi";

export const borrowsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrow, IBorrowBookRequest>({
      query: (body) => {
        // Explicitly convert quantity to number
        const numericQuantity = Number(body.quantity);

        // Validate the conversion
        if (isNaN(numericQuantity)) {
          throw new Error("Quantity must be a valid number");
        }

        return {
          url: `/borrow`,
          method: "POST",
          body: {
            ...body,
            quantity: numericQuantity,
          },
        };
      },
      invalidatesTags: ["Book", "Borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrow", "Book"],
    }),
  }),
  overrideExisting: false,
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowsApi;
