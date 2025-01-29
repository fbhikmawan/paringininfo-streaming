import { useEffect, useState } from "react";
import { getAllCategoriesByVideoType } from "@/lib/api";
import { VideoCategory, VideoType } from "@/types/videos";

interface CategoryButtonsProps {
  videoType: VideoType;
  filter: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryButtons({ videoType, filter, onFilterChange }: CategoryButtonsProps) {
  const [categories, setCategories] = useState<VideoCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories } = await getAllCategoriesByVideoType(videoType);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [videoType]);

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