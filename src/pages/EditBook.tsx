import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/booksApi";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { IBook } from "@/types";

import { useTheme } from "@/hooks/useTheme";
import EditBookForm from "@/components/book/EditBookForm";
import { useForm } from "react-hook-form";

type ApiError = {
  data?: {
    message?: string;
    error?: {
      name: string;
      errors: Record<
        string,
        {
          message: string;
          [key: string]: unknown;
        }
      >;
    };
  };
};

type ValidationErrors = Record<string, { message: string }>;

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data, isLoading: isBookLoading } = useGetBookByIdQuery(id || "");
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const book = data?.data;

  const defaultValues = book || {
    _id: "",
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
    publishedYear: undefined,
    image: "",
  };

  const form = useForm<IBook>({
    values: defaultValues,
  });

  const handleApiError = (error: ApiError) => {
    if (error?.data?.error?.name === "ValidationError") {
      const validationErrors = error.data.error.errors as ValidationErrors;

      Object.entries(validationErrors).forEach(([field, error]) => {
        form.setError(field as keyof IBook, {
          type: "manual",
          message: error.message,
        });
      });

      const errorMessages = Object.values(validationErrors)
        .map((err) => err.message)
        .join("\n");

      toast.error(`Validation failed:\n${errorMessages}`, {
        style: {
          background: theme === "dark" ? "#020817" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        },
      });
    } else {
      toast.error(error.data?.message || "Failed to update book", {
        style: {
          background: theme === "dark" ? "#020817" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        },
      });
    }
  };

  const onSubmit = async (values: IBook) => {
    try {
      const { updatedAt, createdAt, ...rest } = values;
      await updateBook(rest).unwrap();
      toast.success("Book updated successfully", {
        style: {
          background: theme === "dark" ? "#020817" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        },
      });
      navigate(`/books/${values._id}`);
    } catch (error) {
      handleApiError(error as ApiError);
    }
  };

  if (isBookLoading) {
    return (
      <div
        className={`container mx-auto p-4 max-w-4xl ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}>
        <div
          className={`rounded-lg border shadow-sm p-6 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}>
          <Skeleton className='h-8 w-1/3 mb-6' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-5 w-1/4' />
                <Skeleton className='h-9 w-full' />
              </div>
            ))}
          </div>
          <div className='space-y-2 mb-6'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-24 w-full' />
          </div>
          <div className='flex justify-end gap-2'>
            <Skeleton className='h-9 w-24' />
            <Skeleton className='h-9 w-24' />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div
        className={`container mx-auto p-4 max-w-4xl text-center ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-white text-gray-900"
        }`}>
        Book not found
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto p-4 max-w-4xl ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}>
      <div
        className={`rounded-lg border shadow-sm p-6 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        }`}>
        <h1 className='text-2xl font-bold mb-6'>Edit Book</h1>
        <EditBookForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          form={form}
        />
      </div>
    </div>
  );
};

export default EditBook;
