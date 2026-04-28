import {
    Truck,
    FileText,
    ClipboardCheck,
    Car,
    FolderSearch,
    Scissors,
    CreditCard,
    CheckCircle,
    StickyNote,
    Paperclip,
    AlertTriangle,
    Clock,
    Sparkles,
    ChevronRight,
  } from "lucide-react";
  
  import { FC } from "react";
  
  export const icons: Record<
    string,
    FC<{ size?: number; className?: string }>
  > = {
    "Towing Service": Truck,
    "Claim Notification": FileText,
    Appraisal: ClipboardCheck,
    "Substitute Rental Vehicle": Car,
    "File Review": FolderSearch,
    "Deduction Reason": Scissors,
    "Payment Information": CreditCard,
    Closed: CheckCircle,
    Note: StickyNote,
    Attachment: Paperclip,
    Warning: AlertTriangle,
    "Clock": Clock,
    AI: Sparkles,
    "ChevronRight": ChevronRight,
  };
  