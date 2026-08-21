import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Clock3, CircleHelp } from "lucide-react";
import useExams from "../hooks/useExam";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Exam } from "../types/diploma";

// ── Single Exam row card ──────────────────────────────────────────────────────
const DESCRIPTION_LIMIT = 200;

function ExamCard({ exam }: { exam: Exam }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const isLong = exam.description.length > DESCRIPTION_LIMIT;
  const displayedDesc =
    expanded || !isLong
      ? exam.description
      : exam.description.slice(0, DESCRIPTION_LIMIT) + "...";

  return (
    <Card className="flex flex-row gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow">

      <div className="shrink-0 w-24 h-24 rounded-md overflow-hidden border border-border bg-muted">
        <img
          src={exam.image}
          alt={exam.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="flex-1 p-0 flex flex-col gap-1">
  
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-semibold text-blue-600 font-mono text-lg">
            {exam.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
            <span className="flex items-center gap-1">
              <CircleHelp className="w-4 h-4" />
              {exam.questionsCount} Questions
            </span>
            <span className="flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              {exam.duration} minutes
            </span>
          </div>
        </div>


        <p className="text-sm text-muted-foreground leading-relaxed">
          {displayedDesc}
          {isLong && (
            <button
              onClick={() => setExpanded((p) => !p)}
              className="ml-1 text-blue-600 font-semibold hover:underline focus:outline-none"
            >
              {expanded ? "See Less" : "See More"}
            </button>
          )}
        </p>

     
        <div className="mt-auto flex items-center justify-end">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 cursor-pointer"
            onClick={() => navigate(`/dashboard/exams/${exam.id}`)}
          >
            START →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DiplomaDetailsPage() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useExams(id!);

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Failed to load exams</div>
    );
  }

  const exams = data?.pages.flatMap((page) => page.payload.data) ?? [];

  return (
    <div className="space-y-4">
      {/* Exam list */}
      <div className="flex flex-col gap-3 px-4">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>

      {/* Scroll sentinel */}
      <div ref={sentinelRef} className="h-8" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      )}

      {!hasNextPage && exams.length > 0 && (
        <p className="text-center text-sm text-muted-foreground pb-6">
          End of list
        </p>
      )}
    </div>
  );
}