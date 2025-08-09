import { ref } from 'vue'

export interface WeekData {
  id: string
  title: string
  dateRange: string
  description: string
  status: 'active' | 'completed' | 'archived'
  themes: string[]
  reports: number
  summary: string
  fundDiscussion: string
}

export interface ThemeData {
  id: string
  title: string
  description: string
  icon: string
  type: string
  status: 'active' | 'analysis' | 'discussion'
  statusText: string
}

class InvestmentService {
  private weeks = ref<WeekData[]>([])
  private resourcePath = 'd:/trae/myappp/resource'

  constructor() {
    this.initializeWeeks()
  }

  private initializeWeeks() {
    // 初始化周数据
    this.weeks.value = [
      {
        id: '20250728-20250802',
        title: '2025年7月28日 - 8月2日',
        dateRange: '2025-07-28 至 2025-08-02',
        description: '本周投资策略分析与市场洞察',
        status: 'completed',
        themes: ['investment_summary_main', 'active_users', 'market_analysis', 'investment_themes'],
        reports: 4,
        summary: '本周投资策略分析与市场洞察总结',
        fundDiscussion: '群内讨论了量化三公子策略（中信保诚多策略、诺安多策略、建信灵活），港股通科技基金配置，易方达蓝筹、富国天惠等传统基金表现分析，科创200指数基金vs博道科创综指增强基金对比，以及基金购买平台选择（天天基金vs支付宝vs且慢）等话题。群友们还就主动基金与指数基金的投资策略进行了深入交流，特别是关于最大回撤买入法在不同类型基金中的适用性讨论。'
      },
      {
        id: '20250803-20250809',
        title: '2025年8月3日 - 8月9日',
        dateRange: '2025-08-03 至 2025-08-09',
        description: '八月第一周投资策略分析，包含逃顶策略、量化定制、AI与半导体等热点主题',
        status: 'active',
        themes: ['investment_summary_main', 'active_users', 'market_analysis', 'investment_themes'],
        reports: 4,
        summary: '八月第一周投资策略总结：市场震荡调整期的投资机会与风险控制',
        fundDiscussion: '群内重点讨论了创新药基金配置策略，包括长城、华安、永赢三只港A两市创新药基金的投资逻辑和持仓比重调整；探讨了主观多头基金经理的调研重要性，特别是富国创新药基金经理的研发背景优势；分析了人形机器人主题基金（019458）的产业链布局，涵盖三花智控、奥比中光、兆威机电等核心零部件企业；讨论了基金定制化服务和投顾集合资金模式；对比了指数基金与主动基金的表现，认为科创200、创业板人工智能、CS创新药等指数配置今年表现优异；还涉及杨思亮离职对宝盈基金的影响、港股ETF资金流向分析、以及基金转换和平台选择等实操话题。'
      }
    ]
  }

  async getWeeks(): Promise<WeekData[]> {
    return this.weeks.value
  }

  async getWeekInfo(weekId: string): Promise<WeekData | null> {
    return this.weeks.value.find(week => week.id === weekId) || null
  }

  async getWeekMainContent(weekId: string): Promise<string> {
    try {
      // 读取 investment_summary_main.html 文件内容
      const response = await fetch(`/${weekId}/investment_summary_main.html`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.text()
    } catch (error) {
      console.error('Error loading main content:', error)
      return this.getDefaultMainContent(weekId)
    }
  }

  async getWeekThemes(weekId: string): Promise<ThemeData[]> {
    const themes: ThemeData[] = [
      {
        id: 'active_users',
        title: '活跃用户分析',
        description: '本周群内活跃用户统计与分析，了解投资者参与度和讨论热点',
        icon: '👥',
        type: '用户分析',
        status: 'active',
        statusText: '活跃'
      },
      {
        id: 'market_analysis',
        title: '市场分析与策略',
        description: '深度市场分析，包含宏观经济环境、行业趋势和投资策略建议',
        icon: '📈',
        type: '市场分析',
        status: 'analysis',
        statusText: '分析中'
      },
      {
        id: 'investment_themes',
        title: '投资主题深度分析',
        description: '本周重点投资主题的深入研究，包含逻辑分析和目标推荐',
        icon: '🎯',
        type: '主题分析',
        status: 'discussion',
        statusText: '讨论中'
      }
    ]
    return themes
  }

  async getThemeInfo(weekId: string, themeId: string): Promise<ThemeData | null> {
    const themes = await this.getWeekThemes(weekId)
    return themes.find(theme => theme.id === themeId) || null
  }

  async getThemeContent(weekId: string, themeId: string): Promise<string> {
    try {
      // 读取对应的HTML文件内容
      const response = await fetch(`/${weekId}/${themeId}.html`)
      if (!response.ok) {
        throw new Error('Failed to fetch theme content')
      }
      return await response.text()
    } catch (error) {
      console.error('Error loading theme content:', error)
      return this.getDefaultThemeContent(themeId)
    }
  }

  private getDefaultMainContent(weekId: string): string {
    return `
      <div class="container">
        <div class="header">
          <h1>📊 投资策略总结</h1>
          <p class="subtitle">${weekId}</p>
        </div>
        
        <div class="section">
          <h2>📈 本周市场概览</h2>
          <p>正在加载本周投资策略总结内容...</p>
        </div>
        
        <div class="section">
          <h2>🎯 核心策略</h2>
          <p>内容加载中，请稍候...</p>
        </div>
      </div>
    `
  }

  private getDefaultThemeContent(themeId: string): string {
    const themeNames: Record<string, string> = {
      'active_users': '活跃用户分析',
      'market_analysis': '市场分析与策略',
      'investment_themes': '投资主题深度分析'
    }

    return `
      <div class="container">
        <div class="header">
          <h1>${themeNames[themeId] || '主题分析'}</h1>
        </div>
        
        <div class="section">
          <h2>内容加载中</h2>
          <p>正在加载 ${themeNames[themeId] || themeId} 的详细内容...</p>
        </div>
      </div>
    `
  }
}

export const investmentService = new InvestmentService()
export default investmentService