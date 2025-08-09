import { useBorrowBookMutation } from "@/redux/api/borrowsApi";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import type { IBorrowFormData, IBorrowModalProps } from "@/types";
import { useTheme } from "@/hooks/useTheme";

const BorrowModal = ({
  bookId,
  open,
  onOpenChange,
  maxQuantity,
}: IBorrowModalProps) => {
  const { theme } = useTheme();
  const { data: book } = useGetBookByIdQuery(bookId);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const form = useForm<IBorrowFormData>({
    defaultValues: {
      book: bookId,
      quantity: 1,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const onSubmit = async (data: IBorrowFormData) => {
    try {
      await borrowBook({
        book: bookId,
        quantity: data.quantity,
        dueDate: data.dueDate.toISOString(),
      }).unwrap();

      toast.success(
        `Successfully borrowed ${data.quantity} copy(ies) of ${book?.data.title}`
      );
      onOpenChange(false);
      navigate("/borrow-summary");
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[425px] ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : ""
        }`}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className={theme === "dark" ? "text-gray-100" : ""}>
              Borrow {book?.data.title}
            </DialogTitle>
            <DialogDescription
              className={theme === "dark" ? "text-gray-300" : ""}>
              Please fill in the details for borrowing this book.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='quantity' className='text-right'>
                Quantity
              </Label>
              <Input
                id='quantity'
                type='number'
                min='1'
                max={maxQuantity}
                className='col-span-3'
                {...form.register("quantity", {
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 copy must be borrowed",
                  },
                  max: {
                    value: maxQuantity,
                    message: `Only ${maxQuantity} copies available`,
                  },
                })}
              />
              {form.formState.errors.quantity && (
                <p className='col-span-4 text-right text-sm text-destructive'>
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='dueDate' className='text-right'>
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !form.watch("dueDate") && "text-muted-foreground"
                    )}>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {form.watch("dueDate") ? (
                      format(form.watch("dueDate"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={form.watch("dueDate")}
                    onSelect={(date) => date && form.setValue("dueDate", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.dueDate && (
                <p className='col-span-4 text-right text-sm text-destructive'>
                  {form.formState.errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? "Processing..." : "Borrow Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
