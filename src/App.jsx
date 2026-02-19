import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useGetCurrentUserQuery } from "./store/api/authApi";

function App() {
  const { isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F9F8F3]">
        <span className="font-serif text-2xl animate-pulse text-[#A3634B]">
          Boundry
        </span>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <Outlet>
        <div className="flex min-h-svh flex-col items-center justify-center">
          <Button>Click Me</Button>
        </div>
      </Outlet>
    </>
  );
}

export default App;
