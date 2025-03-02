import React from 'react';

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  // Helper function to get category label
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      blog: "Blog",
      instagram: "Instagram",
      facebook: "Facebook",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      newsletter: "Newsletter",
      other: "Jiné",
    };
    return categories[category] || "Jiné";
  };

  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      blog: "bg-blue-100 text-blue-800",
      instagram: "bg-purple-100 text-purple-800",
      facebook: "bg-indigo-100 text-indigo-800",
      twitter: "bg-sky-100 text-sky-800",
      linkedin: "bg-cyan-100 text-cyan-800",
      newsletter: "bg-emerald-100 text-emerald-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(category)}`}>
      {getCategoryLabel(category)}
    </span>
  );
} 