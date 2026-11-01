'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import { industries, categories, type Industry } from '@/data/industries'
import IndustryModal from './IndustryModal'
import IndustryIcon from './IndustryIcon'

export default function IndustriesGrid() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<Industry | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return industries.filter((ind) => {
      const matchesQuery = !q || ind.name.toLowerCase().includes(q) || ind.category.toLowerCase().includes(q)
      const matchesCat = activeCategory === 'All' || ind.category === activeCategory
      return matchesQuery && matchesCat
    })
  }, [query, activeCategory])

  const allCategories = ['All', ...categories]

  return (
    <>
      {/* Search + filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search industries..."
            aria-label="Search industries"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 border-2 border-ggm-line focus:border-ggm-sage rounded-xl text-sm outline-none transition-colors bg-ggm-paper"
          />
          {query && (
            <button
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 text-ggm-muted" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-11 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-ggm-forest text-white border-ggm-forest'
                  : 'bg-ggm-paper text-ggm-muted border-ggm-line hover:border-ggm-sage hover:text-ggm-forest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-ggm-muted">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of {industries.length} industries
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Search className="mx-auto mb-4 h-8 w-8 text-ggm-sage" aria-hidden />
          <p className="text-ggm-muted font-medium">No industries match your search.</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('All') }}
            className="mt-4 text-ggm-forest hover:text-ggm-forest font-semibold text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((industry) => (
            <button
              key={industry.name}
              onClick={() => setSelected(industry)}
              className="group text-left bg-ggm-paper hover:bg-ggm-sage-surface border border-ggm-line hover:border-ggm-sage rounded-xl p-5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ggm-forest"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-ggm-forest/10 bg-ggm-sage-surface/40 text-ggm-forest"><IndustryIcon name={industry.name} category={industry.category} /></div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-ggm-forest transition-colors flex-shrink-0 mt-0.5" />
              </div>
              <div className="font-semibold text-ggm-forest text-[15px] mb-1 leading-snug">{industry.name}</div>
              <div className="text-[11px] font-semibold text-ggm-forest uppercase tracking-[0.12em] text-ggm-muted">{industry.category}</div>
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <IndustryModal industry={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
