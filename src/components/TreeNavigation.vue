<template>
  <div class="tree-navigation" :class="{ 'collapsed': !sidebarOpen, 'mobile-open': mobileMenuOpen }">
    <div class="nav-content">
      <!-- 移动端返回按钮 -->
      <div class="mobile-header" v-if="isMobile">
        <button class="back-button" @click="goBack">
          <span class="back-icon">←</span>
          <span>返回</span>
        </button>
        <button class="close-button" @click="closeMobileMenu">
          <span>✕</span>
        </button>
      </div>
      
      <!-- 总览链接和折叠按钮 -->
      <div class="nav-overview-container">
        <router-link to="/investment" class="nav-item nav-overview" :class="{ active: $route.path === '/investment' }">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">总览</span>
        </router-link>
        <button class="nav-toggle" @click="toggleSidebar">
          <span class="hamburger" :class="{ 'active': !sidebarOpen }"></span>
        </button>
      </div>
      
      <!-- 年份树形结构 -->
      <div class="tree-structure">
        <div v-for="year in treeData" :key="year.year" class="year-node">
          <div class="year-header" @click="toggleYear(year.year)">
            <span class="expand-icon" :class="{ expanded: year.expanded }">▶</span>
            <span class="year-label">{{ year.year }}年</span>
          </div>
          
          <div v-if="year.expanded" class="year-content">
            <div v-for="month in year.months" :key="month.month" class="month-node">
              <div class="month-header" @click="toggleMonth(year.year, month.month)">
                <span class="expand-icon" :class="{ expanded: month.expanded }">▶</span>
                <span class="month-label">{{ month.month }}月</span>
              </div>
              
              <div v-if="month.expanded" class="month-content">
                <router-link 
                  v-for="week in month.weeks" 
                  :key="week.id"
                  :to="`/investment/week/${week.id}`"
                  class="nav-item week-item"
                  :class="{ active: isWeekActive(week.id) }"
                >
                  <span class="nav-icon">📅</span>
                  <span class="nav-text">{{ week.title }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { investmentService, type WeekData } from '@/services/investmentService'

const route = useRoute()
const router = useRouter()
const weeks = ref<WeekData[]>([])
const sidebarOpen = ref(true)
const mobileMenuOpen = ref(false)
const isMobile = ref(false)

// 树形数据结构
interface WeekNode {
  id: string
  title: string
  dateRange: string
}

interface MonthNode {
  month: number
  expanded: boolean
  weeks: WeekNode[]
}

interface YearNode {
  year: number
  expanded: boolean
  months: MonthNode[]
}

const treeData = ref<YearNode[]>([])

// 解析日期范围，提取年月信息
const parseWeekData = (weeks: WeekData[]): YearNode[] => {
  const yearMap = new Map<number, Map<number, WeekNode[]>>()
  
  weeks.forEach(week => {
    // 从weekId中解析日期 (格式: 20250728-20250802)
    const startDate = week.id.split('-')[0]
    const year = parseInt(startDate.substring(0, 4))
    const month = parseInt(startDate.substring(4, 6))
    
    if (!yearMap.has(year)) {
      yearMap.set(year, new Map())
    }
    
    const monthMap = yearMap.get(year)!
    if (!monthMap.has(month)) {
      monthMap.set(month, [])
    }
    
    monthMap.get(month)!.push({
      id: week.id,
      title: getWeekTitle(week.title),
      dateRange: week.dateRange
    })
  })
  
  // 转换为树形结构
  const result: YearNode[] = []
  
  for (const [year, monthMap] of yearMap) {
    const months: MonthNode[] = []
    
    for (const [month, weekList] of monthMap) {
      months.push({
        month,
        expanded: false,
        weeks: weekList.sort((a, b) => a.id.localeCompare(b.id))
      })
    }
    
    result.push({
      year,
      expanded: false,
      months: months.sort((a, b) => a.month - b.month)
    })
  }
  
  return result.sort((a, b) => b.year - a.year) // 最新年份在前
}

// 简化周标题显示
const getWeekTitle = (fullTitle: string): string => {
  // 从 "2025年7月28日 - 8月2日" 提取 "第4周" 或类似格式
  const match = fullTitle.match(/(\d+)月(\d+)日\s*-\s*(\d+)月?(\d+)日/)
  if (match) {
    const startMonth = parseInt(match[1])
    const startDay = parseInt(match[2])
    const endMonth = parseInt(match[3]) || startMonth
    const endDay = parseInt(match[4])
    
    // 计算是第几周（简化计算）
    const weekNum = Math.ceil(startDay / 7)
    return `第${weekNum}周`
  }
  return fullTitle
}

// 切换年份展开状态
const toggleYear = (year: number) => {
  console.log('Toggling year:', year)
  const yearNode = treeData.value.find(y => y.year === year)
  if (yearNode) {
    yearNode.expanded = !yearNode.expanded
    console.log('Year expanded state:', yearNode.expanded)
    // 强制触发响应式更新
    treeData.value = [...treeData.value]
  }
}

// 切换月份展开状态
const toggleMonth = (year: number, month: number) => {
  console.log('Toggling month:', year, month)
  const yearNode = treeData.value.find(y => y.year === year)
  if (yearNode) {
    const monthNode = yearNode.months.find(m => m.month === month)
    if (monthNode) {
      monthNode.expanded = !monthNode.expanded
      console.log('Month expanded state:', monthNode.expanded)
      // 强制触发响应式更新
      treeData.value = [...treeData.value]
    }
  }
}

// 检查周是否为当前活跃状态
const isWeekActive = (weekId: string): boolean => {
  return route.params.weekId === weekId
}

// 切换侧边栏
const toggleSidebar = () => {
  if (isMobile.value) {
    mobileMenuOpen.value = !mobileMenuOpen.value
  } else {
    sidebarOpen.value = !sidebarOpen.value
  }
  console.log('Sidebar toggled:', sidebarOpen.value, 'Mobile menu:', mobileMenuOpen.value)
  
  // 通知父组件状态变化
  const event = new CustomEvent('sidebar-toggle', {
    detail: { open: sidebarOpen.value }
  })
  window.dispatchEvent(event)
  
  // 强制DOM更新
  document.querySelector('.tree-navigation')?.classList.toggle('collapsed', !sidebarOpen.value)
}

// 移动端相关方法
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    mobileMenuOpen.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// 加载数据
onMounted(async () => {
  // 检查是否为移动端
  checkMobile()
  window.addEventListener('resize', checkMobile)
  try {
    weeks.value = await investmentService.getWeeks()
    treeData.value = parseWeekData(weeks.value)
    
    // 自动展开当前活跃的年月
    const currentWeekId = route.params.weekId as string
    if (currentWeekId) {
      const startDate = currentWeekId.split('-')[0]
      const year = parseInt(startDate.substring(0, 4))
      const month = parseInt(startDate.substring(4, 6))
      
      const yearNode = treeData.value.find(y => y.year === year)
      if (yearNode) {
        yearNode.expanded = true
        const monthNode = yearNode.months.find(m => m.month === month)
        if (monthNode) {
          monthNode.expanded = true
        }
      }
    }
  } catch (error) {
    console.error('Failed to load weeks data:', error)
  }
})

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// 暴露方法给父组件
defineExpose({
  toggleSidebar
})
</script>

<style scoped>
.tree-navigation {
  width: 220px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  border-right: 1px solid #2d3748;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow: hidden;
  transition: width 0.3s ease, transform 0.3s ease;
}

.tree-navigation.collapsed {
  width: 50px;
}

.tree-navigation.collapsed .nav-text,
.tree-navigation.collapsed .year-label,
.tree-navigation.collapsed .month-label {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.tree-navigation.collapsed .nav-content {
  overflow: hidden;
}

.tree-navigation.collapsed .tree-structure {
  display: none;
}

.tree-navigation.collapsed .nav-overview-container {
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
}

.tree-navigation.collapsed .nav-overview {
  justify-content: center;
  padding: 8px 5px;
  margin-bottom: 5px;
  width: 100%;
}

.tree-navigation.collapsed .nav-icon {
  margin-right: 0;
}

.tree-navigation.collapsed .nav-toggle {
  padding: 5px;
  margin: 0;
}

.nav-overview-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #2d3748;
}

.nav-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hamburger {
  display: block;
  width: 20px;
  height: 2px;
  background: currentColor;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: currentColor;
  transition: transform 0.3s ease;
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  top: 6px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  transform: rotate(45deg) translate(4px, 4px);
}

.hamburger.active::after {
  transform: rotate(-45deg) translate(4px, -4px);
}

.nav-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.nav-overview {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #cbd5e0;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  flex: 1;
}

.nav-overview:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.nav-overview.active {
  background-color: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border-left-color: #00d4ff;
}

.nav-icon {
  margin-right: 10px;
  font-size: 1.1em;
}

.nav-text {
  font-size: 0.95em;
  font-weight: 500;
}

.tree-structure {
  margin-top: 10px;
}

.year-node {
  margin-bottom: 5px;
}

.year-header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  color: #e2e8f0;
  font-weight: 600;
  transition: background-color 0.2s;
}

.year-header:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.year-content {
  padding-left: 10px;
}

.month-node {
  margin-bottom: 3px;
}

.month-header {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  cursor: pointer;
  color: #cbd5e0;
  font-weight: 500;
  transition: background-color 0.2s;
}

.month-header:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.month-content {
  padding-left: 10px;
}

.expand-icon {
  margin-right: 8px;
  font-size: 0.8em;
  transition: transform 0.2s;
  color: #a0aec0;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.year-label,
.month-label {
  font-size: 0.9em;
}

.week-item {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  font-size: 0.85em;
}

.week-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #cbd5e0;
}

.week-item.active {
  background-color: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border-left-color: #00d4ff;
}

.week-item .nav-icon {
  font-size: 0.9em;
  margin-right: 8px;
}

.week-item .nav-text {
  font-size: 0.9em;
}

/* 滚动条样式 */
.nav-content::-webkit-scrollbar {
  width: 6px;
}

.nav-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.nav-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.nav-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 移动端头部样式 */
.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #2d3748;
  background: rgba(0, 0, 0, 0.2);
}

.back-button, .close-button {
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-button:hover, .close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #00d4ff;
}

.back-icon {
  font-size: 18px;
  font-weight: bold;
}

.close-button {
  font-size: 20px;
  padding: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tree-navigation {
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 9999;
  }
  
  .tree-navigation.mobile-open {
    transform: translateX(0);
  }
  
  .nav-overview-container {
    margin-top: 0;
  }
  
  .nav-toggle {
    display: none;
  }
}
</style>