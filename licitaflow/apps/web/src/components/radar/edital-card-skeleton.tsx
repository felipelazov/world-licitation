export function EditalCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 rounded-full bg-[var(--muted)]" />
            <div className="h-4 w-12 rounded bg-[var(--muted)]" />
            <div className="h-5 w-10 rounded-full bg-[var(--muted)]" />
          </div>
          <div className="mt-2 h-4 w-3/4 rounded bg-[var(--muted)]" />
          <div className="mt-2 space-y-1.5">
            <div className="h-3.5 w-full rounded bg-[var(--muted)]" />
            <div className="h-3.5 w-5/6 rounded bg-[var(--muted)]" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="h-3.5 w-32 rounded bg-[var(--muted)]" />
        <div className="h-3.5 w-24 rounded bg-[var(--muted)]" />
        <div className="h-3.5 w-36 rounded bg-[var(--muted)]" />
        <div className="h-3.5 w-20 rounded bg-[var(--muted)]" />
      </div>
    </div>
  )
}
