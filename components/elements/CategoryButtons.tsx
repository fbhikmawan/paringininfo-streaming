import { useAllCategoriesByVideoType } from "@/lib/api";
import { VideoType } from "@/types/videos";
import Loader from "./Loader";

interface CategoryButtonsProps {
  videoType: VideoType;
  filter: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryButtons({ videoType, filter, onFilterChange }: CategoryButtonsProps) {
  const { categories, isLoading } = useAllCategoriesByVideoType(videoType);
  if (isLoading) return <Loader />

  return (
    <div className="tr-movie-menu-active text-center">
      <button onClick={() => onFilterChange('*')} className={`me-3 ${filter === '*' ? 'active' : ''}`}>All</button>
      {categories.map((category) => (
        <button
          key={category.documentId}
          onClick={() => onFilterChange(category.nameSlug)}
          className={`me-3 ${filter === category.nameSlug ? 'active' : ''}`}
        >
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </button>
      ))}
    </div>
  );
}