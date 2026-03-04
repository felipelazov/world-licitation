'use client'

interface CategoryTabsProps {
  categories: { id: string; name: string }[]
  selected: string
  onSelect: (categoryId: string) => void
  counts?: Map<string, { total: number; valido: number; vencido: number }>
}

export function CategoryTabs({ categories, selected, onSelect, counts }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      <button
        onClick={() => onSelect('')}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
          selected === ''
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
            : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => {
        const count = counts?.get(cat.id)
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selected === cat.id
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
            }`}
          >
            {cat.name}
            {count && <span className="ml-1 opacity-70">({count.total})</span>}
          </button>
        )
      })}
    </div>
  )
}
