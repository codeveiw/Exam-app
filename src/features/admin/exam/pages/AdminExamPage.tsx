import { useState } from "react";
import { Plus, Settings2, ChevronsUp, ChevronsDown, Search, Loader2 } from "lucide-react";
import useExams from "../hooks/useExams";
import ExamTable from "../components/ExamTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAdminDiplomas from "../../hooks/useAdminDiplomas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import type { GetExamsParams } from "../api/getExam";

export default function AdminExamPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [diplomaFilter, setDiplomaFilter] = useState("all");
  const [appliedDiplomaFilter, setAppliedDiplomaFilter] = useState("all");
  const [immutableFilter, setImmutableFilter] = useState("all");
  const [appliedImmutableFilter, setAppliedImmutableFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  // Mapping sort string to API fields
  let sortBy: GetExamsParams["sortBy"] = undefined;
  let sortOrder: GetExamsParams["sortOrder"] = undefined;
  if (sort) {
    const [field, order] = sort.split("-");
    if (field === "newest") sortBy = "createdAt";
    else if (field === "questions") sortBy = "questions";
    else sortBy = "title";
    sortOrder = order as GetExamsParams["sortOrder"];
  }

  // Fetch Exams
  const { data, isLoading, isError } = useExams({
    page,
    limit: 20,
    search: appliedSearch,
    diplomaId: appliedDiplomaFilter !== "all" ? appliedDiplomaFilter : undefined,
    immutable: appliedImmutableFilter === "all" ? undefined : appliedImmutableFilter === "true",
    sortBy,
    sortOrder,
  });

  // Fetch Diplomas for the select menu
  const { data: diplomasData } = useAdminDiplomas({
    limit: 100, // Fetch enough to populate the dropdown
  });
  const diplomasList = diplomasData?.payload.data ?? [];

  const rawExams = data?.payload.data ?? [];
  const metadata = data?.payload.metadata;
  const totalElements = metadata?.total ?? 0;
  const totalPages = metadata?.totalPages ?? 1;

  // We rely on the backend sorting via params, but as a fallback/example we could sort locally
  // if the API doesn't support it. Assuming the API handles sorting based on the custom hooks.
  const exams = rawExams;

  const startItem = (page - 1) * 20 + 1;
  const endItem = Math.min(page * 20, totalElements);

  const handleApply = () => {
    setAppliedSearch(searchQuery);
    setAppliedDiplomaFilter(diplomaFilter);
    setAppliedImmutableFilter(immutableFilter);
    setPage(1);
  };

  const handleClear = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setDiplomaFilter("all");
    setAppliedDiplomaFilter("all");
    setImmutableFilter("all");
    setAppliedImmutableFilter("all");
    setSort("");
    setPage(1);
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4 md:p-6 w-full max-w-[1200px] mx-auto min-h-[800px]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Exams</p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              {totalElements > 0 ? `${startItem} - ${endItem} of ${totalElements}` : "0 items"}
            </span>
            <div className="flex items-center bg-gray-100 rounded overflow-hidden">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 hover:bg-gray-200 disabled:opacity-50 text-gray-500 font-medium text-sm border-r border-gray-200"
              >
                &lt;
              </button>
              <span className="px-4 py-1.5 text-sm font-medium bg-white text-gray-500 whitespace-nowrap">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 hover:bg-gray-200 disabled:opacity-50 text-gray-500 font-medium text-sm border-l border-gray-200"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <Button className="bg-[#00d084] hover:bg-[#00ba77] text-white rounded font-medium h-9 px-4 w-full sm:w-auto mt-2 sm:mt-0" onClick={() => navigate("/admin/exams/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      </div>

      <div className="border border-blue-600/20 rounded-md overflow-hidden mb-6">
        <div
          className="bg-[#2a75ff] flex items-center justify-between px-4 py-3 text-white cursor-pointer select-none"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <div className="flex items-center gap-3 font-semibold text-sm">
            <Settings2 className="h-4 w-4" />
            Search & Filters
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            {filtersOpen ? "Hide" : "Show"}
            {filtersOpen ? <ChevronsUp className="h-4 w-4" /> : <ChevronsDown className="h-4 w-4" />}
          </div>
        </div>

        {filtersOpen && (
          <div className="p-6 bg-white border-x border-b border-gray-200 space-y-6">
            <div className="space-y-4 max-w-3xl">
              <div className="relative flex items-center">
                <Input
                  placeholder="Search by title"
                  className="pr-10 border-gray-200 focus-visible:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                />
                <Search className="absolute right-3 h-4 w-4 text-gray-300" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Select value={diplomaFilter} onValueChange={setDiplomaFilter}>
                    <SelectTrigger className="w-full border-gray-200 focus:ring-blue-500 text-gray-500">
                      <SelectValue placeholder="Diploma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Diplomas</SelectItem>
                      {diplomasList.map(diploma => (
                        <SelectItem key={diploma.id} value={diploma.id}>
                          {diploma.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select value={immutableFilter} onValueChange={setImmutableFilter}>
                    <SelectTrigger className="w-full border-gray-200 focus:ring-blue-500 text-gray-500">
                      <SelectValue placeholder="Immutability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Immutable</SelectItem>
                      <SelectItem value="false">Mutable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="ghost" onClick={handleClear} className="font-semibold text-gray-700 hover:bg-gray-100 h-9 px-6 rounded">
                Clear
              </Button>
              <Button onClick={handleApply} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold h-9 px-6 rounded">
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        {isError && <div className="text-red-500 font-medium py-4">Failed to load exams</div>}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <ExamTable exams={exams} sort={sort} onSortChange={setSort} />
          </div>
        )}
      </div>
    </div>
  );
}