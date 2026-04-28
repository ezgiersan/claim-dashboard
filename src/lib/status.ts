import { z } from "zod";

export const StatusEnum = z.enum([
  "Completed",
  "Report Completed",
  "In Progress",
  "Pending",
  "Note",
  "Attachment",
]);

export type Status = z.infer<typeof StatusEnum>;


export interface StatusMeta {
  label: string;
  dotClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  ringClass?: string;
}

export const statusMeta: Record<Status, StatusMeta> = {
  Completed: {
    label: "Tamamlandı",
    dotClass: "bg-success",
    bgClass: "bg-success/10",
    textClass: "text-success",
    borderClass: "border-success/30",
  },

  "Report Completed": {
    label: "Rapor Tamamlandı",
    dotClass: "bg-success",
    bgClass: "bg-success/10",
    textClass: "text-success",
    borderClass: "border-success/30",
  },

  "In Progress": {
    label: "Devam Ediyor",
    dotClass: "bg-info",
    bgClass: "bg-info/10",
    textClass: "text-info",
    borderClass: "border-info/40",
    ringClass: "animate-pulse",
  },

  Pending: {
    label: "Beklemede",
    dotClass: "bg-muted-foreground",
    bgClass: "bg-muted/40",
    textClass: "text-muted-foreground",
    borderClass: "border-border",
  },

  Note: {
    label: "Not",
    dotClass: "bg-yellow-500",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
    borderClass: "border-yellow-300",
  },

  Attachment: {
    label: "Dosya",
    dotClass: "bg-purple-500",
    bgClass: "bg-purple-100",
    textClass: "text-purple-700",
    borderClass: "border-purple-300",
  },
};

export const getStatusMeta = (status: Status): StatusMeta => {
  return statusMeta[status];
};

export const isCompleted = (status: Status): boolean => {
  return status === "Completed" || status === "Report Completed";
};

export const isActive = (status: Status): boolean => {
  return status === "In Progress";
};
