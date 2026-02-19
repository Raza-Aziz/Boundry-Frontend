import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const AuthPage = () => {
  return (
    <AuthLayout>
      {/* 1. Header Section */}
      <div className="w-full text-center lg:text-left mb-10 space-y-2">
        <h1 className="text-4xl md:text-5xl font-[Playfair_Display] text-stone-900 tracking-tight">
          Welcome to Boundry
        </h1>
        <p className="text-zinc-500 font-[Poppins] font-light tracking-tight">
          Your gateway to the world's most exceptional properties.
        </p>
      </div>

      {/* 2. Tabs Switcher */}
      <Tabs defaultValue="login" className="w-full [--primary:#A3634B]">
        <TabsList
          variant="line"
          className="w-full justify-start bg-transparent border-b border-zinc-200 rounded-none h-12 p-0 mb-8 gap-8"
          // className="flex w-full bg-transparent p-0"
        >
          <TabsTrigger
            value="login"
            className="
            font-[Poppins] text-sm font-medium tracking-wide
            flex-1 text-center py-3 cursor-pointer
                text-stone-500 hover:text-stone-800
                transition-colors
                rounded-none bg-transparent shadow-none
                data-[state=active]:text-[#A3634B]
                data-[state=active]:after:bg-[#A3634B]
                data-[state=active]:bg-transparent
            "
          >
            Login
          </TabsTrigger>

          <TabsTrigger
            value="register"
            className="
            font-[Poppins] font-medium tracking-wide
            flex-1 text-center py-3 cursor-pointer
                text-stone-500 hover:text-stone-800
                transition-colors
                rounded-none bg-transparent shadow-none
                data-[state=active]:text-[#A3634B]
                data-[state=active]:after:bg-[#A3634B]
                data-[state=active]:bg-transparent
            "
          >
            Create Account
          </TabsTrigger>
        </TabsList>

        {/* 3. Conditional Content */}
        <TabsContent value="login" className="mt-0 focus-visible:ring-0">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register" className="mt-0 focus-visible:ring-0">
          <RegisterForm />
        </TabsContent>
      </Tabs>

      {/* 4. Home Navigation (Optional Footer) */}
      <div className="mt-8">
        <Link
          to="/"
          className="text-xs cursor-pointer text-stone-400 hover:text-stone-600 transition-colors font-[Poppins] flex items-center justify-center gap-1"
        >
          ← Return to Home Page
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
