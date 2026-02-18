import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
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
