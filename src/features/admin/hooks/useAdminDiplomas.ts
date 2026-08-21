import { useQuery } from "@tanstack/react-query";
import { getDiplomas } from "../../diplomas/api/getDiplomas";

export default function useAdminDiplomas({
    page = 1,
    limit = 20,
    search = "",
    sort = "",
    immutable = "all",
}: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    immutable?: string;
} = {}) {
    return useQuery({
        queryKey: ["admin_diplomas", { page, limit, search, sort, immutable }],
        queryFn: () => getDiplomas({ page, limit, search, sort, immutable }),
    });
}
