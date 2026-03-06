import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// ─── Tab Order (used to determine slide direction) ────────────────────────────

const TAB_ORDER = ["login", "register"];

// ─── Dynamic Variants Factory ─────────────────────────────────────────────────
// direction: 1  → entering from right / exiting to left  (forward)
// direction: -1 → entering from left  / exiting to right (backward)

const slideVariants = (direction) => ({
  hidden: {
    opacity: 0,
    x: direction * 60,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    x: direction * -60,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.55, 0.06, 0.68, 0.19] },
  },
});

// ─── Static Variants ──────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.4, ease: "easeOut" },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const directionRef = useRef(1); // 1 = forward (→), -1 = backward (←)

  const handleTabChange = (newTab) => {
    const prevIndex = TAB_ORDER.indexOf(activeTab);
    const nextIndex = TAB_ORDER.indexOf(newTab);
    directionRef.current = nextIndex > prevIndex ? 1 : -1;
    setActiveTab(newTab);
  };

  return (
    <AuthLayout>
      {/* 1. Header Section */}
      <motion.div
        className="w-full text-center lg:text-left mb-10 space-y-2"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl font-[Playfair_Display] text-stone-900 tracking-tight">
          Welcome to Boundry
        </h1>
        <p className="text-zinc-500 font-[Poppins] font-light tracking-tight">
          Your gateway to the world's most exceptional properties.
        </p>
      </motion.div>

      {/* 2. Tabs Switcher */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full [--primary:#A3634B]"
      >
        <TabsList
          variant="line"
          className="w-full justify-start bg-transparent border-b border-zinc-200 rounded-none h-12 p-0 mb-8 gap-8"
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

        {/* 3. Animated Tab Content — clips overflow so slides don't bleed out */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "login" && (
              <TabsContent
                key="login"
                value="login"
                forceMount
                className="mt-0 focus-visible:ring-0"
              >
                <motion.div
                  variants={slideVariants(directionRef.current)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <LoginForm />
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "register" && (
              <TabsContent
                key="register"
                value="register"
                forceMount
                className="mt-0 focus-visible:ring-0"
              >
                <motion.div
                  variants={slideVariants(directionRef.current)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <RegisterForm />
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </div>
      </Tabs>

      {/* 4. Home Navigation */}
      <motion.div
        className="mt-8"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link
          to="/"
          className="text-xs cursor-pointer text-stone-400 hover:text-stone-600 transition-colors font-[Poppins] flex items-center justify-center gap-1"
        >
          ← Return to Home Page
        </Link>
      </motion.div>
    </AuthLayout>
  );
};

export default AuthPage;