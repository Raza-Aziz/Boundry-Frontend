import { MoreHorizontal, Trash, Pencil, Share } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function ActionMenu({ onEdit, onDelete, onView }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          // onClick={() => setOpen(!open)}
          className="p-1.5 cursor-pointer rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-[Poppins]">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link to={"/profile/listings/new"}>
              <div className="flex flex-row gap-2">
                <Pencil />
                Edit
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Share />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            <Trash />
            Remove
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className="relative">
    //   <button
    //     onClick={() => setOpen(!open)}
    //     className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition-colors"
    //   >
    //     <MoreHorizontal className="w-4 h-4" />
    //   </button>
    //   {open && (
    //     <>
    //       <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
    //       <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#2a2422] rounded-lg shadow-lg border border-stone-100 dark:border-stone-700 z-20 py-1 overflow-hidden">
    //         <button
    //           onClick={() => {
    //             onView?.();
    //             setOpen(false);
    //           }}
    //           className="flex items-center gap-2 w-full px-3 py-2 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-boundry-primary transition-colors"
    //         >
    //           <Eye className="w-3.5 h-3.5" /> View Listing
    //         </button>
    //         <button
    //           onClick={() => {
    //             onEdit?.();
    //             setOpen(false);
    //           }}
    //           className="flex items-center gap-2 w-full px-3 py-2 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-boundry-primary transition-colors"
    //         >
    //           <Edit2 className="w-3.5 h-3.5" /> Edit
    //         </button>
    //         <div className="h-px bg-stone-100 dark:bg-stone-700 mx-2 my-1" />
    //         <button
    //           onClick={() => {
    //             onDelete?.();
    //             setOpen(false);
    //           }}
    //           className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
    //         >
    //           <Trash2 className="w-3.5 h-3.5" /> Delete
    //         </button>
    //       </div>
    //     </>
    //   )}
    // </div>
  );
}

export default ActionMenu;
