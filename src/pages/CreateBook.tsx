import { useAddBookMutation } from "@/redux/api/booksApi";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import type { IBook } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/hooks/useTheme";
import { BookOpenIcon } from "lucide-react";

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

const CreateBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const form = useForm<Omit<IBook, "_id">>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      publishedYear: undefined,
      image: "",
    },
  });

  const handleApiError = (error: ApiError) => {
    if (error?.data?.error?.name === "ValidationError") {
      const validationErrors = error.data.error.errors as ValidationErrors;

      Object.entries(validationErrors).forEach(([field, error]) => {
        form.setError(field as keyof Omit<IBook, "_id">, {
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
      toast.error(error.data?.message || "Failed to add book", {
        style: {
          background: theme === "dark" ? "#020817" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          borderRadius: "8px",
          padding: "12px",
        },
      });
    }
  };

  const onSubmit = async (values: Omit<IBook, "_id">) => {
    try {
      await addBook(values).unwrap();
      toast.success("Book added successfully", {
        style: {
          background: theme === "dark" ? "#020817" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          borderRadius: "8px",
          padding: "12px",
        },
      });
      navigate("/books");
    } catch (error) {
      handleApiError(error as ApiError);
    }
  };

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
              Add New Book
            </h1>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Fill in the details below to add a new book to the library.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter book title"
                        {...field}
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Author <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter author name"
                        {...field}
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`rounded-lg ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600 text-gray-100"
                              : "bg-white border-gray-300"
                          } focus:ring-2 focus:ring-blue-500`}
                        >
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-gray-100"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                        <SelectItem value="SCIENCE">Science</SelectItem>
                        <SelectItem value="HISTORY">History</SelectItem>
                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      ISBN <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter ISBN number"
                        {...field}
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Publication Year
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        max={new Date().getFullYear()}
                        min={1600}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseInt(e.target.value)
                          )
                        }
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter publication year"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Copies <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter number of copies"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Cover Image URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image URL"
                        {...field}
                        className={`rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter book description"
                      className={`min-h-[140px] rounded-lg ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-blue-500`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/books")}
                className={`rounded-full px-6 py-2 font-semibold ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                    : "border-gray-300 hover:bg-gray-100"
                } transition-all duration-200 hover:scale-105`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className={`rounded-full px-6 py-2 font-semibold ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } transition-all duration-200 hover:scale-105`}
              >
                {isLoading ? "Adding..." : "Add Book"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBook;
