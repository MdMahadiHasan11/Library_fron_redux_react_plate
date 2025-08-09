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

      toast.error(`Validation failed:\n${errorMessages}`);
    } else {
      toast.error(error.data?.message || "Failed to add book");
    }
  };

  const onSubmit = async (values: Omit<IBook, "_id">) => {
    try {
      await addBook(values).unwrap();
      toast.success("Book added successfully");
      navigate("/books");
    } catch (error) {
      handleApiError(error as ApiError);
    }
  };

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
        <h1 className='text-2xl font-bold mb-6'>Add New Book</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Book title'
                        {...field}
                        className={
                          theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='author'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Author name'
                        {...field}
                        className={
                          theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='genre'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={`w-full ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600"
                              : ""
                          }`}>
                          <SelectValue placeholder='Select a genre to set' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={
                          theme === "dark" ? "bg-gray-800 border-gray-700" : ""
                        }>
                        <SelectItem value='FICTION'>FICTION</SelectItem>
                        <SelectItem value='NON_FICTION'>NON_FICTION</SelectItem>
                        <SelectItem value='SCIENCE'>SCIENCE</SelectItem>
                        <SelectItem value='HISTORY'>HISTORY</SelectItem>
                        <SelectItem value='BIOGRAPHY'>BIOGRAPHY</SelectItem>
                        <SelectItem value='FANTASY'>FANTASY</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isbn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='ISBN number'
                        {...field}
                        className={
                          theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='publishedYear'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Year</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
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
                        className={
                          theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='copies'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='1'
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          field.onChange(isNaN(value) ? "" : value);
                        }}
                        className={
                          theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Image URL'
                        {...field}
                        className={
                          theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Book description'
                      className={`min-h-[120px] ${
                        theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate("/books")}
                className={theme === "dark" ? "border-gray-600" : ""}>
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
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
