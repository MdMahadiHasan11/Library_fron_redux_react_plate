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
import { BookOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          borderRadius: "8px",
          padding: "12px",
        },
      });
    } else {
      toast.error(error.data?.message || "Failed to update book", {
        style: {
          background: theme === "dark" ? "#020817" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          borderRadius: "8px",
          padding: "12px",
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
          borderRadius: "8px",
          padding: "12px",
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
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${
          theme === "dark" ? "bg-gray-950" : "bg-gray-50"
        } transition-colors duration-300`}
      >
        <div
          className={`rounded-xl border shadow-md p-8 ${
            theme === "dark"
              ? "bg-gray-800/90 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <Skeleton className="h-10 w-1/3 mb-8 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-1/4 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
          <div className="space-y-3 mb-8">
            <Skeleton className="h-5 w-1/4 rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>
          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center ${
          theme === "dark"
            ? "bg-gray-950 text-gray-100"
            : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Book Not Found</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The book you are trying to edit does not exist or has been removed.
          </p>
          <Button
            asChild
            variant="default"
            className={`rounded-full px-6 py-2 font-semibold ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-all duration-200 hover:scale-105`}
          >
            <a href="/books">Back to Books</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${
        theme === "dark" ? "bg-gray-950" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div
        className={`rounded-xl border shadow-md p-8 ${
          theme === "dark"
            ? "bg-gray-800/90 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-3 mb-8">
          <BookOpenIcon
            className={`h-10 w-10 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
            strokeWidth={1.75}
          />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Edit Book
            </h1>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Update the details below to edit the book.
            </p>
          </div>
        </div>
        <EditBookForm isLoading={isLoading} onSubmit={onSubmit} form={form} />
      </div>
    </div>
  );
};

export default EditBook;
