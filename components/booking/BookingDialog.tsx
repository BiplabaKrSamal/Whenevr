"use client";
import {
  createContext, useCallback, useContext, useEffect,
  useMemo, useRef, useState, type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { addMonths, format, isBefore, isSameDay, isSameMonth, startOfDay, startOfMonth } from "date-fns";
import { cn } from "@/lib/utils";

type Step = "date" | "details" | "done";
interface Ctx { open: () => void; }
const BookingContext = createContext<Ctx | null>(null);
export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within <BookingProvider>");
  return ctx;
};

const TIME_SLOTS = [
  "09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00",
  "15:30","16:00","16:30","17:00",
];

const detailsSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});
type DetailsValues = z.infer<typeof detailsSchema>;

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("date");
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [hour24, setHour24] = useState(false);
  const [confirmed, setConfirmed] = useState<{ name: string; email: string } | null>(null);

  const form = useForm<DetailsValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { name: "", email: "", note: "" },
  });

  const reset = useCallback(() => {
    setStep("date"); setDate(null); setTime(null); setConfirmed(null); form.reset();
  }, [form]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setTimeout(reset, 200);
  };

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const ctx = useMemo<Ctx>(() => ({ open: () => { reset(); setOpen(true); } }), [reset]);

  const onSubmit = (values: DetailsValues) => {
    setConfirmed({ name: values.name, email: values.email });
    setStep("done");
  };

  const formatTime = (t: string) => {
    if (hour24) return t;
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const hh = h % 12 || 12;
    return `${hh}:${m.toString().padStart(2, "0")}${period}`;
  };

  if (!open) return <BookingContext.Provider value={ctx}>{children}</BookingContext.Provider>;

  return (
    <BookingContext.Provider value={ctx}>
      {children}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => handleOpenChange(false)} />
        <div className="relative z-50 w-full max-w-[960px] max-h-[92vh] overflow-hidden rounded-3xl bg-[hsl(0_0%_6%)] text-[hsl(40_10%_95%)] shadow-2xl">
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid max-h-[92vh] md:grid-cols-[1.05fr_1fr]">
            {/* Left brand panel */}
            <div className="hidden flex-col justify-between p-8 md:flex">
              <div className="font-display text-2xl">whenevr<sup className="ml-0.5 align-super text-xs not-italic font-sans">®</sup></div>
              <div>
                <h2 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.04em]">
                  Design <span className="font-display font-normal">doesn't</span> need<br />to be complicated.
                </h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
                  Book a quick call and get a clear look at how Whenevr works, what's included, and whether it fits your pace.
                </p>
              </div>
              <div className="text-xs text-white/40">15 minutes · Google Meet</div>
            </div>

            {/* Right stepped panel */}
            <div className="relative flex max-h-[92vh] flex-col overflow-y-auto p-6 sm:p-8 md:border-l md:border-white/5">
              {step === "date" && (
                <DateStep
                  month={month} setMonth={setMonth}
                  date={date} setDate={(d) => { setDate(d); setTime(null); }}
                  time={time} setTime={setTime}
                  hour24={hour24} setHour24={setHour24}
                  formatTime={formatTime}
                  onContinue={() => setStep("details")}
                />
              )}
              {step === "details" && date && time && (
                <DetailsStep form={form} date={date} time={formatTime(time)} onBack={() => setStep("date")} onSubmit={onSubmit} />
              )}
              {step === "done" && date && time && confirmed && (
                <DoneStep date={date} time={formatTime(time)} email={confirmed.email} name={confirmed.name} onClose={() => handleOpenChange(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </BookingContext.Provider>
  );
};

/* ── Date Step ── */
interface DateStepProps {
  month: Date; setMonth: (d: Date) => void;
  date: Date | null; setDate: (d: Date) => void;
  time: string | null; setTime: (t: string) => void;
  hour24: boolean; setHour24: (v: boolean) => void;
  formatTime: (t: string) => string;
  onContinue: () => void;
}

const DateStep = ({ month, setMonth, date, setDate, time, setTime, hour24, setHour24, formatTime, onContinue }: DateStepProps) => {
  const today = startOfDay(new Date());
  const continueRef = useRef<HTMLButtonElement>(null);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (time && continueRef.current) continueRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [time]);

  const handleContinue = () => {
    if (!date || !time) { setAttempted(true); return; }
    onContinue();
  };

  const first = startOfMonth(month);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isAvailable = (d: Date) => {
    if (isBefore(d, today)) return false;
    const dow = d.getDay();
    return dow !== 0 && dow !== 6;
  };

  const tz = typeof window !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
  const ready = !!date && !!time;

  return (
    <div className="flex h-full flex-col">
      {/* Month nav */}
      <div className="mb-5 flex items-center justify-between">
        <div className="text-[15px]">
          <span className="font-medium">{format(month, "MMMM")}</span>{" "}
          <span className="text-white/40">{format(month, "yyyy")}</span>
        </div>
        <div className="flex gap-1">
          <button type="button" aria-label="Previous month" onClick={() => setMonth(addMonths(month, -1))}
            disabled={isSameMonth(month, today)}
            className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/5 disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next month" onClick={() => setMonth(addMonths(month, 1))}
            className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/5">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-white/40">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="aspect-square" />;
          const available = isAvailable(d);
          const selected = date && isSameDay(d, date);
          const isToday = isSameDay(d, today);
          return (
            <button key={i} type="button" disabled={!available} onClick={() => setDate(d)}
              className={cn(
                "relative aspect-square rounded-xl text-[14px] font-medium transition",
                "disabled:cursor-default disabled:bg-transparent disabled:text-white/35",
                available && !selected && "bg-white/[0.06] text-white hover:bg-white/[0.12]",
                selected && "bg-white text-black shadow-lg",
              )}>
              {d.getDate()}
              {isToday && !selected && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/70" />}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="mt-6 flex-1">
        {date ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[15px]">
                <span className="font-semibold text-[hsl(var(--accent))]">{format(date, "EEE")}</span>{" "}
                <span className="text-white/60">{format(date, "d")}</span>
              </div>
              <div className="flex rounded-full bg-white/[0.06] p-0.5 text-xs">
                {[{ v: false, l: "12h" }, { v: true, l: "24h" }].map(({ v, l }) => (
                  <button key={l} type="button" onClick={() => setHour24(v)}
                    className={cn("rounded-full px-3 py-1 transition", hour24 === v ? "bg-white text-black" : "text-white/60 hover:text-white")}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid max-h-[180px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
              {TIME_SLOTS.map((t) => {
                const sel = time === t;
                return (
                  <button key={t} type="button" onClick={() => setTime(t)}
                    className={cn(
                      "rounded-xl border border-white/10 py-2.5 text-sm transition",
                      sel ? "border-white bg-white text-black" : "bg-white/[0.03] text-white/85 hover:border-white/30 hover:bg-white/[0.07]",
                    )}>
                    {formatTime(t)}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center pt-10 text-sm text-white/40">
            Select a date to see available times
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[13px]">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-white/40">
          <span>Booking summary</span>
          <span className={cn("inline-flex items-center gap-1.5", ready ? "text-[hsl(var(--available))]" : "text-white/40")}>
            <span className={cn("h-1.5 w-1.5 rounded-full", ready ? "bg-[hsl(var(--available))]" : "bg-white/30")} />
            {ready ? "Ready" : "Incomplete"}
          </span>
        </div>
        <dl className="grid grid-cols-[88px_1fr] gap-y-1.5 text-white/80">
          <dt className="text-white/45">Date</dt>
          <dd>{date ? format(date, "EEE, MMM d, yyyy") : <span className="text-white/35">Not selected</span>}</dd>
          <dt className="text-white/45">Time</dt>
          <dd>{time ? formatTime(time) : <span className="text-white/35">Not selected</span>}</dd>
          <dt className="text-white/45">Timezone</dt>
          <dd className="truncate">{tz}</dd>
          <dt className="text-white/45">Meeting</dt>
          <dd>
            {ready ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--available))]" />Google Meet link will be generated
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />Pending selection
              </span>
            )}
          </dd>
        </dl>
      </div>

      {attempted && (!date || !time) && (
        <p className="mt-3 text-xs text-[hsl(0_85%_70%)]">
          {!date ? "Please select a date to continue." : "Please select a time slot to continue."}
        </p>
      )}

      <button ref={continueRef} type="button" onClick={handleContinue}
        className={cn("mt-6 h-12 w-full rounded-full bg-white text-black font-medium transition hover:bg-white/90 flex items-center justify-center gap-2", (!date || !time) && "opacity-40 cursor-not-allowed")}>
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

/* ── Details Step ── */
interface DetailsStepProps {
  form: ReturnType<typeof useForm<DetailsValues>>;
  date: Date; time: string;
  onBack: () => void;
  onSubmit: (v: DetailsValues) => void;
}

const DetailsStep = ({ form, date, time, onBack, onSubmit }: DetailsStepProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <button type="button" onClick={onBack} className="mb-4 inline-flex w-fit items-center gap-1.5 text-sm text-white/60 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/80">
        <span>{format(date, "EEE, MMM d")}</span>
        <span className="text-white/30">·</span>
        <span>{time}</span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight">Your details</h3>
      <p className="mt-1 text-sm text-white/50">A confirmation will be sent to your email.</p>
      <div className="mt-6 space-y-4">
        <Field id="name" label="Name" error={errors.name?.message}>
          <input id="name" placeholder="Jane Doe" maxLength={100} autoComplete="name"
            className="flex h-11 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            {...register("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <input id="email" type="email" placeholder="jane@company.com" maxLength={255} autoComplete="email"
            className="flex h-11 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            {...register("email")} />
        </Field>
        <Field id="note" label="What would you like to discuss? (optional)" error={errors.note?.message}>
          <textarea id="note" rows={3} maxLength={500} placeholder="A few words about your project…"
            className="flex w-full resize-none rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            {...register("note")} />
        </Field>
      </div>
      <button type="submit" disabled={isSubmitting}
        className="mt-8 h-12 w-full rounded-full bg-white text-black font-medium transition hover:bg-white/90 flex items-center justify-center gap-2 disabled:opacity-60">
        Confirm booking <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-xs font-medium text-white/70">{label}</label>
    {children}
    {error && <p className="text-xs text-[hsl(0_85%_70%)]">{error}</p>}
  </div>
);

/* ── Done Step ── */
const DoneStep = ({ date, time, email, name, onClose }: { date: Date; time: string; email: string; name: string; onClose: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center text-center py-12">
    <div className="grid h-14 w-14 place-items-center rounded-full bg-[hsl(142_70%_45%/0.15)] text-[hsl(var(--available))]">
      <Check className="h-7 w-7" />
    </div>
    <h3 className="mt-5 text-2xl font-semibold tracking-tight">You're booked, {name.split(" ")[0]}.</h3>
    <p className="mt-2 max-w-sm text-sm text-white/55">
      We've reserved <span className="text-white">{format(date, "EEEE, MMMM d")}</span> at{" "}
      <span className="text-white">{time}</span>. A calendar invite is on its way to{" "}
      <span className="text-white">{email}</span>.
    </p>
    <button onClick={onClose} className="mt-8 h-11 rounded-full bg-white px-6 text-black font-medium hover:bg-white/90 transition">
      Close
    </button>
  </div>
);
