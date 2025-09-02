import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { Article } from '@/lib/data/articles'

const parser = new Parser()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const rssUrl = process.env.MEDIUM_RSS_URL

    if (!rssUrl) {
      return NextResponse.json(
        { error: 'Medium RSS URL not configured' },
        { status: 500 }
      )
    }

    const feed = await parser.parseURL(rssUrl)
    
    let articles: Article[] = feed.items.map((item) => ({
      title: item.title || '',
      description: item.contentSnippet || item.content || '',
      url: item.link || '',
      publishedAt: item.pubDate || new Date().toISOString(),
      category: 'web3', // Default category, can be enhanced with content analysis
      tags: item.categories || [],
    }))

    // Filter by category if specified
    if (category) {
      articles = articles.filter((article) => {
        const content = `${article.title} ${article.description}`.toLowerCase()
        const categoryLower = category.toLowerCase()
        
        // Simple keyword matching - can be enhanced
        const categoryKeywords: Record<string, string[]> = {
          software: ['react', 'javascript', 'typescript', 'next.js', 'development'],
          web3: ['blockchain', 'web3', 'defi', 'nft', 'solidity', 'cairo'],
          arts: ['music', 'composition', 'culture', 'folkloric'],
          education: ['tutorial', 'guide', 'learning', 'community'],
        }
        
        const keywords = categoryKeywords[categoryLower] || []
        return keywords.some(keyword => content.includes(keyword))
      })
    }

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching Medium RSS:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
