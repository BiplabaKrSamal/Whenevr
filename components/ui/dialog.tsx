"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogContextValue { open: boolean; onOpenChange: (open: boolean) => void; }
const DialogContext = React.createContext<DialogContextValue>({ open: false, onOpenChange: () => {} });

export const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: React.ReactNode }) => (
  <DialogContext.Provider value={{ open, onOpenChange }}>
    {children}
  </DialogContext.Provider>
);

export const DialogContent = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const { open, onOpenChange } = React.useContext(DialogContext);
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className={cn("relative z-50 w-full mx-4", className)}>{children}</div>
    </div>
  );
};

export const DialogTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
);
export const DialogDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
);
