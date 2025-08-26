import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HomeIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/hooks/useTheme";
import { LibraryIcon } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const { theme } = useTheme();

  let errorMessage = "An unexpected issue occurred in Bookify";
  let errorStatus = "";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status.toString();
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 to-blue-950"
          : "bg-gradient-to-br from-blue-100 to-gray-50"
      }`}
    >
      <div
        className={`max-w-lg w-full space-y-8 rounded-2xl shadow-2xl p-10 ${
          theme === "dark"
            ? "bg-gray-900 border border-blue-900 text-gray-100"
            : "bg-white border border-blue-200 text-gray-900"
        }`}
      >
        <div className="text-center space-y-4">
          <LibraryIcon
            className={`mx-auto h-16 w-16 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <h1 className="text-4xl font-extrabold tracking-tight">
            {errorStatus ? `Error ${errorStatus}` : "Bookify Error"}
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Sorry, something went wrong in our library system
          </p>
        </div>

        <Alert
          variant="destructive"
          className={
            theme === "dark" ? "bg-red-950/20 border-red-900" : "border-red-200"
          }
        >
          <AlertTitle className="flex items-center gap-2 text-lg font-semibold">
            <span>Library System Issue</span>
          </AlertTitle>
          <AlertDescription className="mt-3 text-base">
            {errorMessage}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            variant="outline"
            className={`flex-1 gap-2 text-base font-medium ${
              theme === "dark"
                ? "border-blue-800 hover:bg-blue-900/50 text-blue-300"
                : "border-blue-300 hover:bg-blue-50 text-blue-700"
            }`}
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Previous
          </Button>
          <Button
            className={`flex-1 gap-2 text-base font-medium ${
              theme === "dark"
                ? "bg-blue-700 hover:bg-blue-800 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => navigate("/", { replace: true })}
          >
            <HomeIcon className="h-5 w-5" />
            Library Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
