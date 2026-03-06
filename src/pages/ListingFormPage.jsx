import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Info,
  DoorOpen,
  Image as ImageIcon,
  Upload,
  Save,
  ArrowLeft,
  XIcon,
  MapPin,
} from "lucide-react";
import {
  useCreateListingMutation,
  useGetListingQuery,
  useUpdateListingMutation,
} from "../store/api/listingsApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef } from "react";

const ListingFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { data: listingData, isLoading: isFetching } = useGetListingQuery(id, {
    skip: !isEditMode,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const [createListing, { isLoading: isCreating }] = useCreateListingMutation();
  const [updateListing, { isLoading: isUpdating }] = useUpdateListingMutation();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      propertyType: "",
      description: "",
      bedrooms: 0,
      bathrooms: 0,
      areaSqft: 0,
      location: { area: "", city: "" },
      status: "for-sale",
    },
  });

  const bedrooms = watch("bedrooms");
  const bathrooms = watch("bathrooms");

  useEffect(() => {
    if (listingData) {
      reset(listingData);
      if (listingData.images && listingData.images.length > 0) {
        setPreviewUrls(listingData.images.map((img) => img.url));
      }
    } else if (!isEditMode) {
      reset({
        title: "",
        description: "",
        price: 0,
        propertyType: "house",
        bathrooms: 0,
        bedrooms: 0,
        areaSqft: 0,
      });
    }
  }, [listingData, isEditMode, reset]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to max 5 files
    if (files.length + selectedFiles.length > 5) {
      toast.error("You can only upload a maximum of 5 images");
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (indexToRemove) => {
    // If it's a new file (not yet uploaded), we remove from selectedFiles
    // Note: For existing images in edit mode, a more complex approach is needed to delete from backend.
    // For now, this handles removing new selections before upload.
    const isExistingImage =
      indexToRemove < (listingData?.images?.length || 0) && isEditMode;

    if (isExistingImage) {
      toast.info(
        "Cannot remove existing images yet. Functionality coming soon.",
      );
      return;
    }

    // Adjust index for new files since previewUrls incorporates both (if edit mode)
    const newFileIndex = isEditMode
      ? indexToRemove - (listingData?.images?.length || 0)
      : indexToRemove;

    setSelectedFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const submitHandler = async (formData) => {
    if (!isEditMode && selectedFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const submissionData = new FormData();

    // Append standard fields
    submissionData.append("title", formData.title);
    submissionData.append("price", formData.price);
    // Explicitly handle location sub-documents for multer
    submissionData.append("location[city]", formData.location.city);
    submissionData.append("location[area]", formData.location.area);
    submissionData.append("propertyType", formData.propertyType);
    if (formData.description)
      submissionData.append("description", formData.description);
    submissionData.append("status", formData.status);
    submissionData.append("bedrooms", formData.bedrooms);
    submissionData.append("bathrooms", formData.bathrooms);
    submissionData.append("areaSqft", formData.areaSqft);

    // Append files
    selectedFiles.forEach((file) => {
      submissionData.append("images", file);
    });

    // TODO : Understand this
    try {
      if (isEditMode) {
        await updateListing({ id, newDetails: submissionData }).unwrap();
        toast.success("Listing successfully updated", {
          position: "top-right",
          duration: 2000,
        });
        navigate(`/listing/${id}`);
      } else {
        await createListing(submissionData).unwrap();
        toast.success("Listing successfully created", {
          position: "top-right",
          duration: 2000,
        });
        navigate(`/u/listings`);
      }
    } catch (error) {
      toast.error(`Error: ${error?.data?.message || "Failed to save listing"}`);
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="col-span-12 lg:col-span-9 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Link
          to="/u/listings"
          className="flex items-center text-sm text-stone-500 hover:text-boundry-primary transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </Link>
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
          {isEditMode
            ? `Edit Listing: ${listingData?.title}`
            : "Create New Listing"}
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Section: Basic Information */}
          <section className="bg-white dark:bg-[#2a2422] rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
              <Info className="text-boundry-primary w-5 h-5" />
              <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Property Title
                </label>
                <input
                  {...register("title", { required: true })}
                  className="w-full rounded-lg border-stone-200 border dark:border-stone-700 bg-stone-50 dark:bg-stone-800 py-2.5 px-4"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Price (PKR)
                </label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 py-2.5 px-4"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Property Type
                </label>
                <Select
                  {...register("propertyType", { required: true })}
                  defaultValue={isEditMode ? listingData?.propertyType : ""}
                  // value={propertyType}
                  onValueChange={(value) => {
                    setValue("propertyType", value);
                    console.log(value);
                  }}
                  // defaultValue={}
                >
                  <SelectTrigger className="w-full  py-5.5 rounded-lg bg-[#fafaf9]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent className="border-0 bg-[#fafaf9]">
                    <SelectGroup>
                      <SelectLabel>Property Types</SelectLabel>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Listing Status
                </label>
                <Select
                  defaultValue={isEditMode ? listingData?.status : ""}
                  // value={status}
                  onValueChange={(val) => setValue("status", val)}
                >
                  <SelectTrigger className="w-full rounded-lg bg-[#fafaf9]">
                    <SelectValue placeholder="Sale or Rent" />
                  </SelectTrigger>
                  <SelectContent className="border-0">
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  {...register("description")}
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 py-2.5 px-4"
                />
              </div>
            </div>
          </section>

          {/* New Section: Location */}
          <section className="bg-white dark:bg-[#2a2422] rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
              <MapPin className="text-boundry-primary w-5 h-5" />{" "}
              {/* Import MapPin from lucide-react */}
              <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                Location
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  City
                </label>
                <input
                  {...register("location.city", { required: true })}
                  placeholder="e.g. Karachi"
                  className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2.5 px-4"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Area / Neighborhood
                </label>
                <input
                  {...register("location.area", { required: true })}
                  placeholder="e.g. DHA Phase 6"
                  className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2.5 px-4"
                />
              </div>
            </div>
          </section>

          {/* Section: Property Details */}
          <section className="bg-white dark:bg-[#2a2422] rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
              <DoorOpen className="text-boundry-primary w-5 h-5" />
              <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                Property Details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Custom Counter for Beds */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Bedrooms
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("bedrooms", Math.max(0, bedrooms - 1))
                    }
                    className="w-10 h-10 cursor-pointer rounded-l-lg border border-stone-200"
                  >
                    -
                  </button>
                  <input
                    {...register("bedrooms")}
                    className="w-full text-center border-y border-stone-200 bg-[#fafaf9] py-1.75 pt-2 pb-1.5"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => setValue("bedrooms", bedrooms + 1)}
                    className="w-10 h-10 cursor-pointer rounded-r-lg border border-stone-200"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Custom Counter for bathrooms */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Bathrooms
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("bathrooms", Math.max(0, bathrooms - 1))
                    }
                    className="w-10 h-10 cursor-pointer rounded-l-lg border border-stone-200"
                  >
                    -
                  </button>
                  <input
                    {...register("bathrooms")}
                    className="w-full text-center border-y border-stone-200 bg-[#fafaf9] py-1.75 pt-2 pb-1.5"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => setValue("bathrooms", bathrooms + 1)}
                    className="w-10 h-10 cursor-pointer rounded-r-lg border border-stone-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Square Feet
                </label>
                <input
                  type="number"
                  {...register("areaSqft")}
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 py-1.75 px-4"
                />
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section className="bg-white dark:bg-[#2a2422] rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="text-boundry-primary w-5 h-5" />
              <h2 className="text-lg font-semibold">Media Gallery</h2>
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-boundry-primary dark:hover:border-boundry-primary transition-colors cursor-pointer rounded-lg p-10 text-center mb-6"
            >
              <Upload className="mx-auto text-stone-400 mb-2 w-8 h-8" />
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-stone-500 mt-1">
                SVG, PNG, JPG or GIF (max. 5 files)
              </p>
            </div>

            {/* Previews */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-stone-200"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 max-md:opacity-100 right-1 bg-white/80 p-1 rounded-full text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500"
                    >
                      <XIcon className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Action Sidebar */}
        <aside className="w-full xl:w-80 space-y-6">
          <div className="bg-white dark:bg-[#2a2422] rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 sticky top-28">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4">
              Publishing
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Status:</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                  {isEditMode ? "Active" : "Draft"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full flex items-center cursor-pointer justify-center gap-2 bg-boundry-primary text-white px-5 py-3 rounded-lg font-medium disabled:opacity-50"
              >
                <Save size={18} />
                {isEditMode ? "Save Changes" : "Create Listing"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/u/listings")}
                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-stone-800 border border-stone-200 text-stone-700 dark:text-stone-200 px-5 py-3 rounded-lg"
              >
                <XIcon size={18} />
                Discard
              </button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
};

export default ListingFormPage;
