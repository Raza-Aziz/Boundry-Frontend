import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* LEFT SIDE: The Branding & Image (Hidden on mobile) */}

      <div className="bg-muted relative hidden lg:block flex-col justify-between p-12 text-white">
        <img
          src="https://unsplash.com/photos/gray-padded-chaise-couch-beside-window-rEJxpBskj3Q"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />

        {/* Brand Logo - Top Left */}
        <div className="relative z-10">
          <h2 className="text-2xl font-serif font-semibold tracking-tight">
            Boundry.
          </h2>
        </div>

        {/* Quote Section - Bottom Left */}
        <div className="relative z-10 max-w-md">
          <blockquote className="space-y-4">
            <p className="text-3xl font-serif italic leading-tight">
              &ldquo;Luxury must be comfortable, otherwise it is not
              luxury.&rdquo;
            </p>
            <footer className="flex flex-col gap-2">
              <span className="text-lg">— Coco Chanel</span>
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
