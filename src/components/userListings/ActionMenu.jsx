import { MoreHorizontal, Trash, Pencil, Share, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteListingMutation } from "../../store/api/listingsApi";

function ActionMenu({ listingId }) {
  const [copied, setCopied] = useState(false);
  const [deleteListing] = useDeleteListingMutation();

  const handleDeleteListing = async () => {
    try {
      await deleteListing(listingId).unwrap();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleCopy = async (e) => {
    // Prevent the dropdown from closing if you want them to see the "Copied" state
    e.preventDefault();

    const url = `${window.location.origin}/listing/${listingId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1.5 cursor-pointer rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 font-[Poppins]">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link to={`/u/listings/${listingId}`}>
              <div className="flex flex-row gap-2">
                <Pencil />
                Edit
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onSelect={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Share className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer flex items-center gap-2"
            onSelect={handleDeleteListing}
          >
            <Trash className="w-4 h-4" />
            <span>Remove</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionMenu;
