import { Button } from "@/components/ui/button";
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
import type { IBookFormProps } from "@/types";
import { useTheme } from "@/hooks/useTheme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router";
import { Checkbox } from "../ui/checkbox";

const EditBookForm = ({ form, onSubmit, isLoading }: IBookFormProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Edit Book Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter book title"
                    {...field}
                    className={`rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Author*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter author name"
                    {...field}
                    className={`rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Genre
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`w-full rounded-md transition-colors duration-200 ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                      }`}
                    >
                      <SelectValue
                        placeholder={field.value || "Select a genre"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className={`rounded-md ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    {[
                      "FICTION",
                      "NON_FICTION",
                      "SCIENCE",
                      "HISTORY",
                      "BIOGRAPHY",
                      "FANTASY",
                    ].map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ISBN*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter ISBN number"
                    {...field}
                    className={`rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Publication Year
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1600"
                    max={new Date().getFullYear()}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : parseInt(e.target.value)
                      )
                    }
                    className={`rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Copies*
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(isNaN(value) ? "" : value);
                    }}
                    className={`rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter image URL"
                    {...field}
                    className={`rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 pt-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`rounded transition-colors duration-200 ${
                      theme === "dark"
                        ? "border-gray-400 text-blue-500 focus:ring-blue-500"
                        : "border-gray-300 text-blue-600 focus:ring-blue-400"
                    }`}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-none">
                  Available for borrowing
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description*
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter book description"
                  className={`min-h-[140px] rounded-md transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500 dark:text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate(`/books/${form.getValues()?._id}`);
              }
            }}
            className={`rounded-md transition-colors duration-200 ${
              theme === "dark"
                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-md transition-colors duration-200 ${
              isLoading
                ? theme === "dark"
                  ? "bg-gray-600 text-gray-300"
                  : "bg-gray-300 text-gray-500"
                : theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBookForm;
