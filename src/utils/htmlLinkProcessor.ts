/**
 * HTML链接处理器
 * 将静态HTML中的链接转换为Vue路由链接
 */

export interface LinkMapping {
  [key: string]: string
}

export class HtmlLinkProcessor {
  private weekId: string
  private linkMappings: LinkMapping

  constructor(weekId: string) {
    this.weekId = weekId
    this.linkMappings = {
      'investment_themes.html': `/investment/week/${weekId}/theme/investment_themes`,
      'market_analysis.html': `/investment/week/${weekId}/theme/market_analysis`,
      'active_users.html': `/investment/week/${weekId}/theme/active_users`
    }
  }

  /**
   * 处理HTML内容，将静态链接转换为Vue路由链接
   */
  processHtmlContent(htmlContent: string): string {
    let processedContent = htmlContent

    // 替换静态HTML链接为Vue路由链接
    Object.entries(this.linkMappings).forEach(([staticLink, vueRoute]) => {
      const regex = new RegExp(`href="${staticLink}"`, 'g')
      processedContent = processedContent.replace(regex, `href="${vueRoute}" data-vue-router="true"`)
    })

    return processedContent
  }

  /**
   * 为处理后的HTML内容添加点击事件监听器
   */
  attachClickListeners(container: HTMLElement, router: any) {
    const links = container.querySelectorAll('a[data-vue-router="true"]')
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = (e.target as HTMLAnchorElement).getAttribute('href')
        if (href) {
          console.log('Navigating to:', href)
          router.push(href)
        }
      })
    })
  }

  /**
   * 获取链接映射
   */
  getLinkMappings(): LinkMapping {
    return { ...this.linkMappings }
  }

  /**
   * 添加自定义链接映射
   */
  addLinkMapping(staticLink: string, vueRoute: string) {
    this.linkMappings[staticLink] = vueRoute
  }
}

export default HtmlLinkProcessor