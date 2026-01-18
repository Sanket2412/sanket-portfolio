import { AnimatedSection } from "./AnimatedSection";
import { useBlogs } from "@/hooks/user-blogs";
import { BlogCard } from "./blogs/BlogCard";
import { BlogFilters } from "./blogs/BlogFilters";
import { BlogPagination } from "./blogs/BlogPagination";
import { BlogEmptyState } from "./blogs/BlogEmptyState";
import { AnimatePresence } from "framer-motion";

export function Blogs() {
  const {
    blogs,
    totalBlogs,
    searchQuery,
    activeFilter,
    currentPage,
    totalPages,
    setSearchQuery,
    setActiveFilter,
    setCurrentPage,
  } = useBlogs();

  return (
    <section
      id="blogs"
      className="section-padding relative"
      aria-label="Blog articles"
    >
      <div className="section-container">
        <AnimatedSection>
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Blogs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              I write about JavaScript, React, backend systems, and performance
              on various platforms.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-8">
            <BlogFilters
              searchQuery={searchQuery}
              activeFilter={activeFilter}
              onSearchChange={setSearchQuery}
              onFilterChange={setActiveFilter}
            />
            {totalBlogs > 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                Showing {blogs.length} of {totalBlogs} blog{totalBlogs !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </AnimatedSection>

        <div
          id="blogs-grid"
          role="tabpanel"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))
            ) : (
              <BlogEmptyState
                searchQuery={searchQuery}
                activeFilter={activeFilter}
              />
            )}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
