"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  getDay,
  addDays,
  subDays,
  isWithinInterval,
  parseISO,
} from "date-fns";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface YearCalendarProps {
  year?: number;
  selectedDate?: string | null;
  onSelect?: (date: string) => void;
  bookedRanges?: { startDate: string; endDate: string }[];
}

export default function YearCalendar({
  year = new Date().getFullYear(),
  selectedDate,
  onSelect,
  bookedRanges = [],
}: YearCalendarProps) {
  const bookedIntervals = bookedRanges
    .map((range) => {
      try {
        const start = parseISO(range.startDate);
        const end = parseISO(range.endDate);
        return { start, end };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as { start: Date; end: Date }[];

  const isBooked = (date: Date) =>
    bookedIntervals.some((interval) =>
      isWithinInterval(date, {
        start: interval.start,
        end: interval.end,
      })
    );

  const handleClick = (date: Date) => {
    if (isBooked(date)) return;
    onSelect?.(format(date, "yyyy-MM-dd"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Year {year}</h3>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="inline-block h-3 w-3 rounded-sm bg-rose-500" />
          Taken
          <span className="ml-2 inline-block h-3 w-3 rounded-sm border border-rose-500 bg-rose-50 dark:bg-rose-950" />
          Selected
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {MONTHS.map((monthName, monthIndex) => {
          const monthStart = startOfMonth(new Date(year, monthIndex, 1));
          const monthEnd = endOfMonth(monthStart);
          const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
          const startDayIndex = getDay(monthStart);
          const leadingDays = Array.from({ length: startDayIndex }, (_, i) =>
            subDays(monthStart, startDayIndex - i)
          );
          const totalCells = 42;
          const trailingDays = Array.from(
            { length: totalCells - days.length - leadingDays.length },
            (_, i) => addDays(monthEnd, i + 1)
          );
          const cells = [...leadingDays, ...days, ...trailingDays];

          return (
            <div
              key={monthName}
              className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
            >
              <h4 className="mb-2 text-center font-medium">{monthName}</h4>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-500">
                {WEEKDAYS.map((d, i) => (
                  <div key={`${d}-${i}`}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((date, idx) => {
                  const inMonth = isSameMonth(date, monthStart);
                  const booked = inMonth && isBooked(date);
                  const selected = selectedDate
                    ? isSameDay(date, parseISO(selectedDate))
                    : false;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={!inMonth || booked}
                      onClick={() => handleClick(date)}
                      className={`aspect-square rounded-md text-xs transition ${
                        !inMonth
                          ? "text-zinc-300 dark:text-zinc-700"
                          : booked
                          ? "cursor-not-allowed bg-rose-500 font-medium text-white"
                          : selected
                          ? "border border-rose-500 bg-rose-50 font-bold text-rose-600 dark:bg-rose-950 dark:text-rose-300"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {format(date, "d")}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
