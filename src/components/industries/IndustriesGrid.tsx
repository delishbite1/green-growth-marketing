'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import { industries, categories, type Industry } from '@/data/industries'
import IndustryModal from './IndustryModal'

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 border-2 border-gray-200 focus:border-green-500 rounded-xl text-sm outline-none transition-colors bg-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of {industries.length} industries
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 font-medium">No industries match your search.</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('All') }}
            className="mt-4 text-green-600 hover:text-green-700 font-semibold text-sm"
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
              className="group text-left bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-2xl p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="text-2xl">{industry.icon}</div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5" />
              </div>
              <div className="font-bold text-gray-900 text-sm mb-1 leading-snug">{industry.name}</div>
              <div className="text-[11px] font-semibold text-green-600 uppercase tracking-wide">{industry.category}</div>
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
