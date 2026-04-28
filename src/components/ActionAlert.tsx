import { icons } from "../lib/icons";

interface ActionAlertProps {
  message: string;
  onAction: () => void;
}

export default function ActionAlert({ message, onAction }: ActionAlertProps) {
  const Icon = icons["Warning"];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-warning-border bg-warning-bg p-4">
      <Icon size={30} className={"text-warning-text"} />

      <div className="flex-1">
        <p className="text-sm font-medium text-warning-text">
          Aksiyon Gerekiyor
        </p>
        <p className="text-xs text-warning-text mt-0.5">{message}</p>
      </div>
    </div>
  );
}
