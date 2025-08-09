import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, HomeIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/hooks/useTheme";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const { theme } = useTheme();

  let errorMessage = "An unexpected error occurred";
  let errorStatus = "";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status.toString();
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-blue-50 to-white"
    }`}>
      <div className={`max-w-md w-full space-y-6 rounded-xl shadow-lg p-8 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}>
        <div className="text-center space-y-2">
          <RocketIcon className={`mx-auto h-12 w-12 ${
            theme === "dark" ? "text-red-500" : "text-destructive"
          }`} />
          <h1 className="text-3xl font-bold tracking-tight">
            {errorStatus ? `Error ${errorStatus}` : "Oops!"}
          </h1>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            Something went wrong while processing your request
          </p>
        </div>

        <Alert variant="destructive" className={
          theme === "dark" ? "bg-red-900/30 border-red-800" : ""
        }>
          <AlertTitle className="flex items-center gap-2">
            <span>Error Details</span>
          </AlertTitle>
          <AlertDescription className="mt-2">
            {errorMessage}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            className={`flex-1 gap-2 ${
              theme === "dark" ? "border-gray-600 hover:bg-gray-700" : ""
            }`}
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            className={`flex-1 gap-2 ${
              theme === "dark" ? "bg-primary hover:bg-primary/90" : ""
            }`}
            onClick={() => navigate("/", { replace: true })}
          >
            <HomeIcon className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;