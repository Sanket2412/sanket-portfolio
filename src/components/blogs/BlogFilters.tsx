import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { platforms } from "@/data/blogs";
import type { Platform } from "@/data/blogs";
import { motion } from "framer-motion";

interface BlogFiltersProps {
  searchQuery: string;
  activeFilter: Platform;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: Platform) => void;
}

export function BlogFilters({
  searchQuery,
  activeFilter,
  onSearchChange,
  onFilterChange,
}: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search blogs by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
          aria-label="Search blogs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter blogs by platform">
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant={activeFilter === platform ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(platform)}
            className={`relative transition-all duration-300 ${
              activeFilter === platform
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background/50 hover:bg-accent/50 border-border/50"
            }`}
            role="tab"
            aria-selected={activeFilter === platform}
            aria-controls="blogs-grid"
          >
            {activeFilter === platform && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary rounded-md"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{platform}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
