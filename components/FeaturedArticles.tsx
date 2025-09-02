'use client'

import { motion } from 'framer-motion'
import { ExternalLink, TrendingUp, Building2, Calendar, Heart, Book } from 'lucide-react'

interface FeaturedArticle {
  id: string
  title: string
  description: string
  year: number
  link: string
  type: 'popular' | 'company' | 'educational'
  company?: string
  claps?: number
  category: string
}

interface FeaturedArticlesProps {
  articles: FeaturedArticle[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'popular': return <TrendingUp className="h-4 w-4" />
      case 'company': return <Building2 className="h-4 w-4" />
      case 'educational': return <Book className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'popular': return 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400'
      case 'company': return 'from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-400'
      case 'educational': return 'from-green-500/20 to-lime-500/20 border-green-500/30 text-green-400'
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-4">Featured Articles</h3>
        <p className="text-white/60 max-w-2xl mx-auto">
          Highlighted content showcasing technical expertise and community recognition
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              boxShadow: "0 20px 40px -12px rgba(0, 229, 255, 0.2)"
            }}
            className="card p-6 border-l-4 border-l-accent/50 relative overflow-hidden group"
          >
            {/* Type Badge */}
            <div className={`absolute top-4 right-4 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${getTypeColor(article.type)} text-xs font-medium`}>
              {getTypeIcon(article.type)}
              <span className="capitalize">{article.type}</span>
            </div>

            {/* Year Badge */}
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">
                {article.year}
              </div>
            </div>

            {/* Content */}
            <div className="mt-8 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.claps && (
                  <div className="flex items-center space-x-1 text-accent">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">{article.claps}+ claps</span>
                  </div>
                )}
              </div>

              {article.company && (
                <p className="text-primary/80 text-sm font-medium">
                  Published by: {article.company}
                </p>
              )}

              <p className="text-white/70 text-sm leading-relaxed">
                {article.description}
              </p>

              <div className="pt-4 relative z-10">
                <motion.a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-primary/30 hover:border-primary/50"
                >
                  {article.type === 'educational' ? (
                    <>
                      <Book className="h-3 w-3" />
                      <span>Slideshare E-Book</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-3 w-3" />
                      <span>Read Medium Article</span>
                    </>
                  )}
                </motion.a>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
