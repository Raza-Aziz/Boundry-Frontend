import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Or any close icon

function ImageGallery({ listing }) {
  const [selectedImg, setSelectedImg] = useState(null);

  // Helper to prevent background scrolling when modal is open
  if (typeof window !== "undefined") {
    if (selectedImg) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }

  return (
    <>
      {/* 1. THE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[500px] mb-12 rounded-xl overflow-hidden shadow-sm">
        {/* Large Main Image (Slot 1) */}
        <div
          onClick={() => setSelectedImg(listing.images[0]?.url)}
          className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer h-full"
        >
          <img
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={listing.images[0]?.url}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        </div>

        {/* Smaller Grid Images (Slots 2, 3, 4, 5) */}
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            onClick={() => setSelectedImg(listing.images[index]?.url)}
            className="relative group overflow-hidden cursor-pointer h-full bg-stone-100 dark:bg-stone-800"
          >
            {listing.images[index] ? (
              <img
                alt={`${listing.title} view ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={listing.images[index].url}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-stone-400 text-xs italic">
                Interior view
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 2. THE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>

            {/* The Expanded Image */}
            <motion.img
              layoutId={selectedImg} // Adds a "hero" transition if IDs match
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg}
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // <div className="grid grid-cols-1 bg-transparent md:grid-cols-4 gap-2 h-[500px] mb-12 rounded-xl overflow-hidden shadow-sm">
  //   {/* Large Main Image */}
  //   <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer h-full">
  //     <img
  //       alt="Modern luxury living room with floor to ceiling windows"
  //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  //       src={listing.images[0].url}
  //     />
  //     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
  //     {/* <span className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur text-xs px-3 py-1 rounded-full font-medium">
  //       Living Room
  //     </span>*/}
  //   </div>
  //   {/* Smaller Grid Images */}
  //   <div className="relative group overflow-hidden border-0 bg-transparent cursor-pointer h-full">
  //     <img
  //       alt="Sleek modern kitchen with marble island"
  //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  //       src={listing.images[1].url}
  //     />
  //   </div>
  //   <div className="relative group overflow-hidden cursor-pointer h-full">
  //     <img
  //       alt="Master bedroom with panoramic view"
  //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  //       src={listing.images[2].url}
  //     />
  //   </div>
  //   <div className="relative group overflow-hidden cursor-pointer h-full">
  //     <img
  //       alt="Exterior pool view at sunset"
  //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  //       src={listing.images[3].url}
  //     />
  //   </div>
  //   <div className="relative group overflow-hidden cursor-pointer h-full">
  //     <img
  //       alt="Luxury bathroom with freestanding tub"
  //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  //       src="https://lh3.googleusercontent.com/aida-public/AB6AXuCULBXf6BmGL0YvytWXCIdOf3bDtfYP5zg-gdk87aDua2Ank2JJqJ4-_Qtf6KkZLMMmLWWqLf5hCGzr5pWcalzTZ_rWaiusqFxFn3MO_CnF8xFqd96VgF7GAcFLrmsbWlsO2ltGm1xL0BsPoXVrzfRto7r_y33HEuoGGvd4-29gn-GdvC1RQMprfriUMwZAXYd5Y-iWte-nWHgFw18FVMCoqHBgZjBb7MXnEmx1m_J93Hvu2UeKRVoGd9k7uN105DRdUDabNsug_A"
  //     />
  //   </div>
  // </div>
  // );
}

export default ImageGallery;
