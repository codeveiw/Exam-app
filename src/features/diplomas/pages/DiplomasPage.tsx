import { useEffect, useRef } from "react";
import useDiplomas from "../hooks/useDiplomas";
import DiplomaGrid from "../component/DiplomaGrid";
import capIcon from "../../../assets/icons/graduation-cap.png";
import { Loader2 } from "lucide-react";

export default function DiplomasPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiplomas();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load diplomas</div>;
  }

  const diplomas = data?.pages.flatMap((page) => page.payload.data) ?? [];

  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold flex items-center bg-blue-600 py-3 ps-3">
        <img src={capIcon} alt="Graduation Cap" />
        <h1 className="ml-2 font-semibold text-3xl text-white">Diplomas</h1>
      </div>

      <DiplomaGrid diplomas={diplomas} />


      <div ref={sentinelRef} className="h-8" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      )}

      {!hasNextPage && diplomas.length > 0 && (
        <p className="text-center text-sm text-muted-foreground pb-6">
          No more diplomas to load
        </p>
      )}
    </div>
  );
}
