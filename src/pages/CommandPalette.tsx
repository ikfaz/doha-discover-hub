import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  FileText,
  Calculator,
  Scale,
  MapPin,
  CreditCard,
  GraduationCap,
  Car,
  Plane,
  Utensils,
  ShoppingBag,
  Briefcase,
  Home,
  Wine,
  Dog,
  UserCheck
} from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// Define the data structure
type Category = 'Guides' | 'Tools' | 'Legal'

interface CommandItem {
  id: string
  title: string
  href: string
  category: Category
  icon: React.ElementType
}

const items: CommandItem[] = [
  // Guides
  { id: 'metro', title: 'Doha Metro Guide 2025', href: '/blog/doha-metro-2025-guide', category: 'Guides', icon: MapPin },
  { id: 'visa', title: 'Work Visa & Residency Guide', href: '/blog/qatar-work-visa-guide-2025', category: 'Guides', icon: Briefcase },
  { id: 'alcohol', title: 'Alcohol Rules & Licenses', href: '/blog/alcohol-guide-doha', category: 'Guides', icon: Wine },
  { id: 'driving', title: 'Driving & Traffic Rules', href: '/blog/driving-doha-2025-guide', category: 'Guides', icon: Car },
  { id: 'housing', title: 'Housing & Rent Guide', href: '/blog/housing-rent-doha-2025', category: 'Guides', icon: Home },
  { id: 'schools', title: 'International Schools Guide', href: '/blog/international-schools-qatar-2025', category: 'Guides', icon: GraduationCap },
  { id: 'cost', title: 'Cost of Living Breakdown', href: '/blog/cost-of-living-doha-2025', category: 'Guides', icon: CreditCard },
  { id: 'airport', title: 'Hamad Airport Guide', href: '/blog/hamad-international-airport-guide', category: 'Guides', icon: Plane },
  { id: 'food', title: 'Qatari Food & Dining', href: '/blog/qatari-dishes-doha-culinary-guide', category: 'Guides', icon: Utensils },
  { id: 'souq', title: 'Souq Waqif Experience', href: '/blog/souq-waqif-night-experiences-haggling', category: 'Guides', icon: ShoppingBag },
  { id: 'pets', title: 'Pet Import Guide', href: '/blog/pet-import-qatar-guide', category: 'Guides', icon: Dog },
  { id: 'maids', title: 'Hiring Domestic Help', href: '/blog/hiring-maid-nanny-qatar-guide', category: 'Guides', icon: UserCheck },
  
  // Tools
  { id: 'budget', title: 'Expat Budget Planner', href: '/budget-planner', category: 'Tools', icon: Calculator },
  { id: 'gratuity', title: 'Gratuity Calculator', href: '/blog/end-of-service-gratuity-qatar-2025', category: 'Tools', icon: Calculator },
  { id: 'school-fees', title: 'School Fee Calculator', href: '/blog/international-schools-qatar-2025', category: 'Tools', icon: Calculator },
  
  // Legal
  { id: 'privacy', title: 'Privacy Policy', href: '/privacy-policy', category: 'Legal', icon: Scale },
  { id: 'terms', title: 'Terms of Service', href: '/terms-of-service', category: 'Legal', icon: FileText },
  { id: 'cookie', title: 'Cookie Policy', href: '/cookie-policy', category: 'Legal', icon: FileText },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Filter items
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<Category, CommandItem[]>)

  const handleSelect = (href: string) => {
    setOpen(false)
    navigate(href)
    setQuery('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="hidden sm:flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="py-14 text-center text-sm text-gray-500">
              No results found.
            </div>
          ) : (
            <>
              {(['Tools', 'Guides', 'Legal'] as Category[]).map((category) => {
                const categoryItems = groupedItems[category]
                if (!categoryItems?.length) return null

                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {category}
                    </div>
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        className="flex items-center px-4 py-3 mx-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-white group-hover:text-qatar-maroon transition-colors mr-3">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-white">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              })}
            </>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-800 flex justify-between">
          <span>
            <strong>Tip:</strong> Press <kbd className="font-sans">⌘K</kbd> to open anytime
          </span>
          <span>Experience Doha</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}