import { ref, computed } from 'vue'

export interface ParsedHtmlContent {
  title: string
  sections: HtmlSection[]
  rawHtml: string
  metadata: HtmlMetadata
}

export interface HtmlSection {
  id: string
  title: string
  content: string
  type: 'header' | 'content' | 'chart' | 'list' | 'table'
  level: number
}

export interface HtmlMetadata {
  description?: string
  keywords?: string[]
  author?: string
  date?: string
}

class HtmlParser {
  /**
   * 解析HTML内容为结构化数据
   */
  parseHtml(htmlContent: string): ParsedHtmlContent {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    
    // 提取标题
    const title = this.extractTitle(doc)
    
    // 提取元数据
    const metadata = this.extractMetadata(doc)
    
    // 解析内容结构
    const sections = this.extractSections(doc)
    
    return {
      title,
      sections,
      rawHtml: htmlContent,
      metadata
    }
  }

  /**
   * 提取页面标题
   */
  private extractTitle(doc: Document): string {
    // 优先级：h1 > title > 默认
    const h1 = doc.querySelector('h1')
    if (h1?.textContent) {
      return h1.textContent.trim()
    }
    
    const title = doc.querySelector('title')
    if (title?.textContent) {
      return title.textContent.trim()
    }
    
    return '未命名文档'
  }

  /**
   * 提取元数据
   */
  private extractMetadata(doc: Document): HtmlMetadata {
    const metadata: HtmlMetadata = {}
    
    // 提取描述
    const description = doc.querySelector('meta[name="description"]')
    if (description) {
      metadata.description = description.getAttribute('content') || undefined
    }
    
    // 提取关键词
    const keywords = doc.querySelector('meta[name="keywords"]')
    if (keywords) {
      const keywordContent = keywords.getAttribute('content')
      if (keywordContent) {
        metadata.keywords = keywordContent.split(',').map(k => k.trim())
      }
    }
    
    // 提取作者
    const author = doc.querySelector('meta[name="author"]')
    if (author) {
      metadata.author = author.getAttribute('content') || undefined
    }
    
    return metadata
  }

  /**
   * 提取内容结构
   */
  private extractSections(doc: Document): HtmlSection[] {
    const sections: HtmlSection[] = []
    const body = doc.body || doc.documentElement
    
    // 查找所有标题和内容区域
    const elements = body.querySelectorAll('h1, h2, h3, h4, h5, h6, .section, .content, .container')
    
    let currentSection: HtmlSection | null = null
    let sectionCounter = 0
    
    elements.forEach((element, index) => {
      const tagName = element.tagName.toLowerCase()
      
      if (tagName.match(/^h[1-6]$/)) {
        // 处理标题
        const level = parseInt(tagName.charAt(1))
        const title = element.textContent?.trim() || ''
        
        if (title) {
          // 保存之前的section
          if (currentSection) {
            sections.push(currentSection)
          }
          
          // 创建新的section
          currentSection = {
            id: `section-${++sectionCounter}`,
            title,
            content: '',
            type: 'header',
            level
          }
        }
      } else if (element.classList.contains('section') || 
                 element.classList.contains('content') ||
                 element.classList.contains('container')) {
        // 处理内容区域
        const content = this.extractElementContent(element)
        
        if (content.trim()) {
          if (currentSection) {
            currentSection.content += content
            currentSection.type = 'content'
          } else {
            // 创建默认section
            sections.push({
              id: `section-${++sectionCounter}`,
              title: '内容',
              content,
              type: 'content',
              level: 1
            })
          }
        }
      }
    })
    
    // 添加最后一个section
    if (currentSection) {
      sections.push(currentSection)
    }
    
    // 如果没有找到任何section，创建一个默认的
    if (sections.length === 0) {
      sections.push({
        id: 'section-1',
        title: '内容',
        content: body.innerHTML,
        type: 'content',
        level: 1
      })
    }
    
    return sections
  }

  /**
   * 提取元素内容
   */
  private extractElementContent(element: Element): string {
    // 克隆元素以避免修改原始DOM
    const cloned = element.cloneNode(true) as Element
    
    // 移除脚本标签
    cloned.querySelectorAll('script').forEach(script => script.remove())
    
    // 移除样式标签（保留内联样式）
    cloned.querySelectorAll('style').forEach(style => style.remove())
    
    return cloned.innerHTML
  }

  /**
   * 生成目录结构
   */
  generateToc(sections: HtmlSection[]): TocItem[] {
    const toc: TocItem[] = []
    const stack: TocItem[] = []
    
    sections.forEach(section => {
      if (section.type === 'header') {
        const tocItem: TocItem = {
          id: section.id,
          title: section.title,
          level: section.level,
          children: []
        }
        
        // 找到合适的父级
        while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
          stack.pop()
        }
        
        if (stack.length === 0) {
          toc.push(tocItem)
        } else {
          stack[stack.length - 1].children.push(tocItem)
        }
        
        stack.push(tocItem)
      }
    })
    
    return toc
  }

  /**
   * 清理HTML内容，移除不安全的元素
   */
  sanitizeHtml(html: string): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // 移除危险元素
    const dangerousElements = ['script', 'iframe', 'object', 'embed', 'form']
    dangerousElements.forEach(tag => {
      doc.querySelectorAll(tag).forEach(el => el.remove())
    })
    
    // 移除危险属性
    const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover']
    doc.querySelectorAll('*').forEach(el => {
      dangerousAttrs.forEach(attr => {
        if (el.hasAttribute(attr)) {
          el.removeAttribute(attr)
        }
      })
    })
    
    return doc.body?.innerHTML || html
  }
}

export interface TocItem {
  id: string
  title: string
  level: number
  children: TocItem[]
}

export const htmlParser = new HtmlParser()
export default htmlParser