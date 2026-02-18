import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-[0.415fr_0.585fr]">
      {/* LEFT SIDE: The Branding & Image (Hidden on mobile) */}

      <div className="bg-muted relative hidden lg:block flex-col justify-between p-12 text-white">
        <img
          src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover brightness-75 dark:brightness-[0.2] dark:grayscale"
        />

        {/* Brand Logo - Top Left */}
        <div className="absolute top-8 left-8 z-10">
          <span className="text-2xl font-[Playfair_Display] font-semibold text-white tracking-tight">
            Boundry.
          </span>
        </div>

        {/* Quote Section - Bottom Left */}
        <div className="absolute bottom-12 left-12 z-10 max-w-md">
          <blockquote className="space-y-4">
            <h2 className="text-4xl font-[Playfair_Display] mb-4 italic">
              &ldquo;Luxury must be comfortable, otherwise it is not
              luxury.&rdquo;
            </h2>
            <footer className="flex flex-col gap-2">
              <span className="text-sm opacity-80 font-[Poppins]">
                — Coco Chanel
              </span>
              {/* Pagination Dots Indicator */}
              <div className="flex gap-2 mt-4">
                <div className="h-1 w-8 bg-white rounded-full" />
                <div className="h-1 w-2 bg-white/30 rounded-full" />
                <div className="h-1 w-2 bg-white/30 rounded-full" />
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE: The Form Column */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#F9F8F3]">
        <div className="w-full max-w-110 flex flex-col items-center">
          {children}

          {/* Footer Copyright */}
          <p className="mt-20 text-xs text-muted-foreground uppercase tracking-widest opacity-50">
            © 2023 Boundry Real Estate
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
