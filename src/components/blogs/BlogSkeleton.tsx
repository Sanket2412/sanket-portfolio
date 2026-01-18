import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogSkeleton() {
  return (
    <Card className="h-full bg-card/80 border-border/50 overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-full mt-2" />
      </CardContent>
    </Card>
  );
}

export function BlogSkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogSkeleton key={i} />
      ))}
    </div>
  );
}
