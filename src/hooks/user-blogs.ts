import { useState, useMemo } from "react";
import { blogs } from "@/data/blogs";
import type { Platform } from "@/data/blogs";
const BLOGS_PER_PAGE = 9;

export function useBlogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Platform>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    // Filter by platform
    if (activeFilter !== "All") {
      result = result.filter((blog) => blog.platform === activeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((blog) =>
        blog.title.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, activeFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handleFilterChange = (filter: Platform) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blogs section
    document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    blogs: paginatedBlogs,
    totalBlogs: filteredBlogs.length,
    searchQuery,
    activeFilter,
    currentPage,
    totalPages,
    setSearchQuery: handleSearchChange,
    setActiveFilter: handleFilterChange,
    setCurrentPage: handlePageChange,
  };
}
