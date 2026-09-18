import type { Kind, ProjectStatus } from "./content";

export function kindLabel(kind: Kind): string {
  if (kind === "thought") return "Thought";
  if (kind === "project") return "Project";
  return "Article";
}

export function statusLabel(status?: ProjectStatus): string {
  if (status === "now") return "In progress";
  if (status === "paused") return "Paused";
  return "Shipped";
}
