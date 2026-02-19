import { Link } from "react-router-dom";

export default function GlobalReach() {
  return (
    <section className="h-96 w-full relative">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdsNevw7Qlyy_ZwwEQ507jHnmCe_ZT4zxxbT5S-mWY84KcpymaDza85X4Ka7VKrWMnOx5AW-ADYdp5IfsfxL2teLKNb6Ef-lT-YLChtDAbRhXkv3q8C9FUVqhMDmktmJxUr-FfLmQM5W0odk7V7mAqWj72yMN9MWerMZUx0q-FVgrcQV1HE-daVSVn5BMNIhFoezG4Nsxe2BoB_oq7CDrlIA9RDt0525YBOfagHzL3kvHUcMHXEHMbrVi9aChxTVo6LO8sLyrA1g"
        alt="Aerial view of city grid"
        className="w-full h-full object-cover grayscale contrast-125"
      />
      <div className="absolute inset-0 bg-boundry-primary/20 mix-blend-multiply" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-serif text-white mb-4 drop-shadow-lg">
            Global Reach
          </h2>
          <Link
            to={"/listings"}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
          >
            Explore Locations
          </Link>
        </div>
      </div>
    </section>
  );
}
