import { FileSearch, Search } from "lucide-react";
import { motion } from "framer-motion";

interface BlogEmptyStateProps {
  searchQuery: string;
  activeFilter: string;
}

export function BlogEmptyState({ searchQuery, activeFilter }: BlogEmptyStateProps) {
  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = activeFilter !== "All";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="col-span-full flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        {isSearching ? (
          <Search className="h-8 w-8 text-muted-foreground" />
        ) : (
          <FileSearch className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No blogs found
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        {isSearching && isFiltering
          ? `No blogs matching "${searchQuery}" in ${activeFilter}.`
          : isSearching
          ? `No blogs matching "${searchQuery}".`
          : isFiltering
          ? `No blogs published on ${activeFilter} yet.`
          : "No blogs have been published yet. Check back soon!"}
      </p>
    </motion.div>
  );
}
