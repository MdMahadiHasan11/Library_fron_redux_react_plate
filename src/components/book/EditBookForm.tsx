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

const EditBookForm = ({
  form,
  onSubmit,
  isLoading,
}: IBookFormProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
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
                        theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                      }`}>
                      <SelectValue
                        placeholder={field.value || "Select a genre to set"}
                      />
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
                    min='1600'
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
                    min='0'
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

          <FormField
            control={form.control}
            name='available'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center gap-3 pt-6 pl-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={theme === "dark" ? "border-gray-400" : ""}
                  />
                </FormControl>
                <div className='leading-none'>
                  <FormLabel>Available for borrowing</FormLabel>
                </div>
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
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate(`/books/${form.getValues()?._id}`);
              }
            }}
            className={theme === "dark" ? "border-gray-600" : ""}>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
            className={
              isLoading
                ? theme === "dark"
                  ? "bg-gray-600"
                  : "bg-gray-300"
                : ""
            }>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBookForm;
