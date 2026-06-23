import StatusBadge from "./StatusBadge";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: number; is_deleted: number; pending_request_id: number | null }> {
  columns: ColumnDef<T>[];
  rows: T[];
  loading: boolean;
  error: string;
  onRequestDelete: (row: T) => void;
  canRequestDelete: boolean;
  emptyLabel: string;
}

export default function DataTable<T extends { id: number; is_deleted: number; pending_request_id: number | null }>({
  columns,
  rows,
  loading,
  error,
  onRequestDelete,
  canRequestDelete,
  emptyLabel,
}: DataTableProps<T>) {
  if (loading) {
    return <p className="text-[#5d5b5b] text-center py-16 text-sm">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center py-16 text-sm">{error}</p>;
  }
  if (rows.length === 0) {
    return <p className="text-[#5d5b5b] text-center py-16 text-sm">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-[16px] border border-[#c8d8e8] bg-white">
      <table className="w-full text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <thead>
          <tr className="border-b border-[#e0eaf3] bg-[#f7faFD]">
            <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">ID</th>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">
                {col.header}
              </th>
            ))}
            <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Status</th>
            <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#f7faFD] transition-colors">
              <td className="px-4 py-3 text-[#5d5b5b] font-semibold whitespace-nowrap">#{row.id}</td>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">
                  {col.render(row)}
                </td>
              ))}
              <td className="px-4 py-3 whitespace-nowrap">
                {row.is_deleted ? (
                  <StatusBadge label="Deleted" tone="deleted" />
                ) : row.pending_request_id ? (
                  <StatusBadge label="Delete Pending" tone="pending" />
                ) : (
                  <StatusBadge label="Active" tone="active" />
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {canRequestDelete && !row.is_deleted && !row.pending_request_id && (
                  <button
                    onClick={() => onRequestDelete(row)}
                    className="text-[#D78A78] text-xs font-medium hover:underline"
                  >
                    Request Delete
                  </button>
                )}
                {row.pending_request_id && !row.is_deleted && (
                  <span className="text-[#5d5b5b] text-xs italic">Awaiting review</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
