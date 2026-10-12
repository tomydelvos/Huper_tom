import { LuChevronRight } from "react-icons/lu";
import { Link } from "../lib/router";
import { Badge } from "./ui";
import { KINDS } from "../services/projectService";
import { formatDate } from "../lib/format";

const KIND_LABEL = Object.fromEntries(KINDS.map((k) => [k.id, k.label]));

export function projectStatus(project) {
  if (project.status === "selesai") return { tone: "success", label: "Selesai" };
  if (project.priority === "tinggi") return { tone: "caution", label: "Prioritas tinggi" };
  return { tone: "primary", label: "Berjalan" };
}

export function ProjectRow({ project }) {
  const status = projectStatus(project);
  return (
    <Link to={`/proyek/${project.id}`} className="flex items-center gap-4 py-3.5 hover:opacity-90">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sunken text-[17px] font-extrabold text-ink-soft" aria-hidden="true">
        {project.name.charAt(0).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-bold">{project.name}</span>
        <span className="tabular mt-0.5 block text-sm text-muted">
          {KIND_LABEL[project.kind]}, dibuat {formatDate(project.createdAt)}
        </span>
        <Badge tone={status.tone} className="mt-1.5">
          {status.label}
        </Badge>
      </span>
      <LuChevronRight size={20} className="shrink-0 text-muted" aria-hidden="true" />
    </Link>
  );
}
