'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar } from 'lucide-react'
import { Article } from '@/lib/data/articles'
import { formatDate } from '@/lib/utils'

interface ArticleListProps {
  categories?: string[]
}

export function ArticleList({ categories }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (categories && categories.length > 0) {
          params.append('category', categories[0])
        }
        
        const response = await fetch(`/api/medium?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        
        const data = await response.json()
        setArticles(data.articles || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [categories])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="dark:text-white/60 light:text-gray-600 mt-4">Loading articles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="dark:text-white/40 light:text-gray-500 text-sm mt-2">
          Check out my Medium profile for the latest content.
        </p>
        <a
          href="https://medium.com/@alegomez"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mt-4"
        >
          <span>Visit Medium</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="dark:text-white/60 light:text-gray-600">No articles found for the selected categories.</p>
        <a
          href="https://medium.com/@alegomez"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mt-4"
        >
          <span>Browse all articles on Medium</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <motion.article
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold dark:text-white light:text-gray-900 mb-2">
                {article.title}
              </h3>
              <p className="dark:text-white/70 light:text-gray-600 mb-3 text-sm">
                {article.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 dark:text-white/40 light:text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                {article.category && (
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                    {article.category}
                  </span>
                )}
              </div>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 p-2 dark:text-white/40 light:text-gray-500 hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
