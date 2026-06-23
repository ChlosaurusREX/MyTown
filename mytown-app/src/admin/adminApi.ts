// admin/adminApi.ts — types and fetch helpers for the Admin panel.
import { apiGet, apiPost } from "../app/api";

export interface AdminAccount {
  id: number;
  name: string;
  email: string;
  role: "admin" | "super_admin";
}

export type TableName = "users" | "events" | "tickets";

export interface UserRecord {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  created_at: string;
  updated_at: string;
  is_deleted: number;
  pending_request_id: number | null;
}

export interface EventRecord {
  id: number;
  name: string;
  category: string;
  event_date: string;
  location: string;
  price: string;
  tickets_total: number;
  tickets_remaining: number;
  created_at: string;
  is_deleted: number;
  pending_request_id: number | null;
}

export interface TicketRecord {
  id: number;
  ticket_code: string;
  user_id: number;
  event_id: number;
  holder_name: string;
  email: string;
  event_name: string;
  category: string;
  event_date: string;
  location: string;
  unit_price: string;
  quantity: number;
  total_price: string;
  purchased_at: string;
  is_deleted: number;
  pending_request_id: number | null;
}

export interface DeleteRequest {
  id: number;
  target_table: TableName;
  target_id: number;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  requested_by: number;
  requested_by_name: string;
  requested_at: string;
  resolved_by: number | null;
  resolved_by_name: string | null;
  resolved_at: string | null;
}

export interface ActionLog {
  id: number;
  admin_id: number;
  admin_name: string;
  admin_role: "admin" | "super_admin";
  action: string;
  target_table: TableName | null;
  target_id: number | null;
  delete_request_id: number | null;
  details: string | null;
  created_at: string;
}

export interface DashboardStats {
  total_revenue: number;
  total_tickets_sold: number;
  total_users: number;
  total_events: number;
  pending_proposals: number;
  ticket_trend: { day: string; sold: number }[];
  events_by_category: { category: string; count: number }[];
  top_events: { name: string; sold: number; revenue: number }[];
}

export interface EventProposal {
  id: number;
  proposed_by: number;
  proposed_by_name: string;
  name: string;
  category: string;
  event_date: string;
  location: string;
  price: number;
  tickets_total: number;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  reviewed_by: number | null;
  reviewed_by_name: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export interface TrashRecord {
  users: UserRecord[];
  events: EventRecord[];
  tickets: TicketRecord[];
}

// ── Existing API calls ──────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  return apiPost<{ success: boolean; message: string; admin?: AdminAccount }>("admin/login.php", {
    email,
    password,
  });
}

export async function getRecords<T = any>(table: TableName) {
  return apiGet<{ success: boolean; table: TableName; records: T[] }>("admin/get_records.php", { table });
}

export async function requestDelete(adminId: number, table: TableName, targetId: number, reason: string) {
  return apiPost<{ success: boolean; message: string; requestId?: number }>("admin/request_delete.php", {
    adminId,
    table,
    targetId,
    reason,
  });
}

export async function resolveDeleteRequest(adminId: number, requestId: number, decision: "approve" | "reject") {
  return apiPost<{ success: boolean; message: string }>("admin/resolve_delete_request.php", {
    adminId,
    requestId,
    decision,
  });
}

export async function getDeleteRequests(status: "pending" | "approved" | "rejected" | "all") {
  return apiGet<{ success: boolean; requests: DeleteRequest[] }>("admin/get_delete_requests.php", { status });
}

export async function getActionLog() {
  return apiGet<{ success: boolean; logs: ActionLog[] }>("admin/get_action_log.php");
}

// ── New API calls ───────────────────────────────────────────────────

export async function getDashboard() {
  return apiGet<{ success: boolean } & DashboardStats>("admin/get_dashboard.php");
}

export async function proposeEvent(
  adminId: number,
  data: {
    name: string;
    category: string;
    event_date: string;
    location: string;
    price: number;
    tickets_total: number;
    notes?: string;
  }
) {
  return apiPost<{ success: boolean; message: string; event_id?: number; proposal_id?: number }>(
    "admin/propose_event.php",
    { adminId, ...data }
  );
}

export async function getEventProposals(status: "pending" | "approved" | "rejected" | "all" = "all") {
  return apiGet<{ success: boolean; proposals: EventProposal[] }>("admin/get_event_proposals.php", { status });
}

export async function resolveEventProposal(adminId: number, proposalId: number, decision: "approve" | "reject") {
  return apiPost<{ success: boolean; message: string; event_id?: number }>(
    "admin/resolve_event_proposal.php",
    { adminId, proposalId, decision }
  );
}

export async function getTrash(table: TableName | "all" = "all") {
  return apiGet<{ success: boolean; trash: Partial<TrashRecord> }>("admin/get_trash.php", { table });
}

export async function restoreRecord(adminId: number, table: TableName, targetId: number) {
  return apiPost<{ success: boolean; message: string }>("admin/restore_record.php", {
    adminId,
    table,
    targetId,
  });
}
