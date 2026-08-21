import { useState, useMemo } from "react";
import { Plus, Settings2, ChevronsUp, ChevronsDown, Search, Loader2 } from "lucide-react";
import useAdminDiplomas from "../hooks/useAdminDiplomas";
import DiplomaTable from "../../diplomas/component/DiplomaTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";




import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [immutableFilter, setImmutableFilter] = useState("all");
  const [appliedImmutable, setAppliedImmutable] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sort, setSort] = useState("");
  const navigate =useNavigate()


  const { data, isLoading, isError } = useAdminDiplomas({
    page,
    limit: 20,
    search: appliedSearch,
    sort, 
    immutable: appliedImmutable,
  });

  const rawDiplomas = data?.payload.data ?? [];
  const metadata = data?.payload.metadata;
  const totalElements = metadata?.total ?? 0;
  const totalPages = metadata?.totalPages ?? 1;


  const diplomas = useMemo(() => {
    if (!sort) return rawDiplomas;
    return [...rawDiplomas].sort((a, b) => {
      if (sort === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sort === "newest-asc") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (sort === "newest-desc") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      return 0;
    });
  }, [rawDiplomas, sort]);

  const startItem = (page - 1) * 20 + 1;
  const endItem = Math.min(page * 20, totalElements);

  const handleApply = () => {
    setAppliedSearch(searchQuery);
    setAppliedImmutable(immutableFilter);
    setPage(1);
  };

  const handleClear = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setImmutableFilter("all");
    setAppliedImmutable("all");
    setSort("");
    setPage(1);
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6 w-full max-w-[1200px] mx-auto min-h-[800px]">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Diplomas</p>
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
        <Button className="bg-[#00d084] hover:bg-[#00ba77] text-white rounded font-medium h-9 px-4"  onClick={() => navigate("/admin/diplomas/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Diploma
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
        {isError && <div className="text-red-500 font-medium py-4">Failed to load diplomas</div>}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
          </div>
        ) : (
          <DiplomaTable diplomas={diplomas} sort={sort} onSortChange={setSort} />
        )}
      </div>
    </div>
  );
}