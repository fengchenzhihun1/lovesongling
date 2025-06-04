<script setup lang="ts">
import { ref, computed } from 'vue'
import HomeButton from '@/components/HomeButton.vue'

// 定义基金数据类型接口
interface Fund {
  id: number;
  name: string;
  code: string;
  type: string;
  risk: string;
  manager: string;
  scale: string;
  netWorth: number;
  dayGrowth: number;
  weekGrowth: number;
  monthGrowth: number;
  yearGrowth: number;
  threeYearGrowth: number;
  fiveYearGrowth: number;
  establishDate: string;
  description: string;
}

// 基金数据
const fundList = ref<Fund[]>([
  {
    id: 1,
    name: '易方达蓝筹精选混合',
    code: '005827',
    type: '混合型',
    risk: '中高风险',
    manager: '张坤',
    scale: '1,023.45亿元',
    netWorth: 2.4567,
    dayGrowth: 0.87,
    weekGrowth: 2.34,
    monthGrowth: -1.23,
    yearGrowth: 15.67,
    threeYearGrowth: 87.65,
    fiveYearGrowth: 156.78,
    establishDate: '2018-05-09',
    description: '该基金主要投资于具有核心竞争力的蓝筹股票，通过深入研究，精选个股，力求获取长期稳健的投资回报。'
  },
  {
    id: 2,
    name: '广发创新升级混合',
    code: '002939',
    type: '混合型',
    risk: '中高风险',
    manager: '刘格菘',
    scale: '876.32亿元',
    netWorth: 3.1245,
    dayGrowth: -0.23,
    weekGrowth: 1.56,
    monthGrowth: 3.45,
    yearGrowth: 21.34,
    threeYearGrowth: 92.45,
    fiveYearGrowth: 178.23,
    establishDate: '2016-08-24',
    description: '该基金重点关注科技创新和产业升级带来的投资机会，布局未来高成长性行业，追求资本的长期增值。'
  },
  {
    id: 3,
    name: '富国中证500指数增强',
    code: '161017',
    type: '指数型',
    risk: '中风险',
    manager: '王保合',
    scale: '345.67亿元',
    netWorth: 1.8765,
    dayGrowth: 1.23,
    weekGrowth: -0.45,
    monthGrowth: 2.67,
    yearGrowth: 12.34,
    threeYearGrowth: 56.78,
    fiveYearGrowth: 98.76,
    establishDate: '2015-03-13',
    description: '该基金采用指数增强策略，以中证500指数为基准，通过量化模型优选个股，力求超越指数表现。'
  },
  {
    id: 4,
    name: '南方消费活力混合',
    code: '001955',
    type: '混合型',
    risk: '中高风险',
    manager: '蒋秋洁',
    scale: '234.56亿元',
    netWorth: 2.7654,
    dayGrowth: 0.45,
    weekGrowth: 1.87,
    monthGrowth: 4.56,
    yearGrowth: 18.76,
    threeYearGrowth: 76.54,
    fiveYearGrowth: 134.56,
    establishDate: '2017-11-15',
    description: '该基金重点投资于消费升级相关行业，把握居民消费结构升级和消费模式变革带来的投资机会。'
  },
  {
    id: 5,
    name: '华夏创新前沿混合',
    code: '002980',
    type: '混合型',
    risk: '高风险',
    manager: '王怡欢',
    scale: '187.65亿元',
    netWorth: 3.5678,
    dayGrowth: -0.56,
    weekGrowth: 2.45,
    monthGrowth: 5.67,
    yearGrowth: 23.45,
    threeYearGrowth: 98.76,
    fiveYearGrowth: 187.65,
    establishDate: '2016-10-20',
    description: '该基金聚焦科技创新前沿领域，重点投资于人工智能、生物科技、新能源等未来科技发展方向的优质企业。'
  }
])

// 当前选中的基金
const selectedFund = ref<Fund | null>(null)

// 显示基金详情
function showFundDetail(fund: Fund) {
  selectedFund.value = fund
}

// 关闭基金详情
function closeFundDetail() {
  selectedFund.value = null
}

// 搜索功能
const searchQuery = ref('')
const filteredFunds = computed(() => {
  if (!searchQuery.value) return fundList.value
  
  const query = searchQuery.value.toLowerCase()
  return fundList.value.filter(fund => 
    fund.name.toLowerCase().includes(query) || 
    fund.code.includes(query)
  )
})

// 排序功能
const sortOptions = [
  { label: '按日涨跌排序', value: 'dayGrowth' },
  { label: '按月涨跌排序', value: 'monthGrowth' },
  { label: '按年涨跌排序', value: 'yearGrowth' },
  { label: '按规模排序', value: 'scale' }
]

const currentSort = ref('dayGrowth')
const sortDirection = ref('desc')

function toggleSortDirection() {
  sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
}

const sortedFunds = computed(() => {
  const funds = [...filteredFunds.value]
  
  return funds.sort((a, b) => {
    let comparison = 0
    
    if (currentSort.value === 'scale') {
      // 处理规模排序（字符串格式）
      const scaleA = parseFloat(a.scale.replace(/,/g, ''))
      const scaleB = parseFloat(b.scale.replace(/,/g, ''))
      comparison = scaleA - scaleB
    } else {
      // 处理涨跌幅排序（数字格式）
      comparison = a[currentSort.value as keyof Fund] as number - (b[currentSort.value as keyof Fund] as number)
    }
    
    return sortDirection.value === 'desc' ? -comparison : comparison
  })
})

// 风险等级过滤
const riskLevels = ['低风险', '中低风险', '中风险', '中高风险', '高风险']
const selectedRiskLevels = ref<string[]>([])

const finalFilteredFunds = computed(() => {
  if (selectedRiskLevels.value.length === 0) return sortedFunds.value
  
  return sortedFunds.value.filter(fund => 
    selectedRiskLevels.value.includes(fund.risk)
  )
})

// 切换风险等级选择
function toggleRiskLevel(level: string) {
  const index = selectedRiskLevels.value.indexOf(level)
  if (index === -1) {
    selectedRiskLevels.value.push(level)
  } else {
    selectedRiskLevels.value.splice(index, 1)
  }
}

// 格式化百分比
function formatPercentage(value: number) {
  return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`
}

// 获取涨跌颜色
function getGrowthColor(value: number) {
  return value > 0 ? '#f56c6c' : value < 0 ? '#67c23a' : '#909399'
}
</script>

<template>
  <div class="investment-home">
    <div class="fund-filters">
      <div class="search-bar">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="搜索基金名称或代码..."
          class="search-input"
        />
      </div>
      
      <div class="sort-options">
        <select v-model="currentSort" class="sort-select">
          <option 
            v-for="option in sortOptions" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        
        <button @click="toggleSortDirection" class="sort-direction-btn">
          {{ sortDirection === 'desc' ? '↓' : '↑' }}
        </button>
      </div>
      
      <div class="risk-filter">
        <div class="risk-filter-label">风险等级：</div>
        <div class="risk-filter-options">
          <button 
            v-for="level in riskLevels" 
            :key="level"
            class="risk-filter-btn"
            :class="{ active: selectedRiskLevels.includes(level) }"
            @click="toggleRiskLevel(level)"
          >
            {{ level }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="fund-list">
      <div 
        v-for="fund in finalFilteredFunds" 
        :key="fund.id"
        class="fund-card"
        @click="showFundDetail(fund)"
      >
        <div class="fund-header">
          <div class="fund-name-code">
            <h3 class="fund-name">{{ fund.name }}</h3>
            <span class="fund-code">{{ fund.code }}</span>
          </div>
          <div class="fund-type-risk">
            <span class="fund-type">{{ fund.type }}</span>
            <span class="fund-risk" :class="`risk-${fund.risk}`">{{ fund.risk }}</span>
          </div>
        </div>
        
        <div class="fund-body">
          <div class="fund-worth">
            <div class="worth-value">{{ fund.netWorth.toFixed(4) }}</div>
            <div 
              class="worth-growth" 
              :style="{ color: getGrowthColor(fund.dayGrowth) }"
            >
              {{ formatPercentage(fund.dayGrowth) }}
            </div>
          </div>
          
          <div class="fund-growth-chart">
            <div class="growth-item">
              <div class="growth-label">近1周</div>
              <div 
                class="growth-value" 
                :style="{ color: getGrowthColor(fund.weekGrowth) }"
              >
                {{ formatPercentage(fund.weekGrowth) }}
              </div>
            </div>
            
            <div class="growth-item">
              <div class="growth-label">近1月</div>
              <div 
                class="growth-value" 
                :style="{ color: getGrowthColor(fund.monthGrowth) }"
              >
                {{ formatPercentage(fund.monthGrowth) }}
              </div>
            </div>
            
            <div class="growth-item">
              <div class="growth-label">近1年</div>
              <div 
                class="growth-value" 
                :style="{ color: getGrowthColor(fund.yearGrowth) }"
              >
                {{ formatPercentage(fund.yearGrowth) }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="fund-footer">
          <div class="fund-manager">
            <span class="manager-label">基金经理：</span>
            <span class="manager-name">{{ fund.manager }}</span>
          </div>
          <div class="fund-scale">
            <span class="scale-label">规模：</span>
            <span class="scale-value">{{ fund.scale }}</span>
          </div>
        </div>
      </div>
      
      <div v-if="finalFilteredFunds.length === 0" class="no-funds-found">
        没有找到符合条件的基金
      </div>
    </div>
    
    <!-- 基金详情弹窗 -->
    <div v-if="selectedFund" class="fund-detail-modal">
      <div class="modal-content">
        <button class="close-button" @click="closeFundDetail">&times;</button>
        
        <div class="modal-header">
          <h2>{{ selectedFund.name }}</h2>
          <div class="fund-code-type">
            <span class="fund-code">{{ selectedFund.code }}</span>
            <span class="fund-type">{{ selectedFund.type }}</span>
            <span class="fund-risk" :class="`risk-${selectedFund.risk}`">{{ selectedFund.risk }}</span>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="fund-worth-detail">
            <div class="worth-box">
              <div class="worth-label">最新净值</div>
              <div class="worth-value">{{ selectedFund.netWorth.toFixed(4) }}</div>
              <div 
                class="worth-growth" 
                :style="{ color: getGrowthColor(selectedFund.dayGrowth) }"
              >
                {{ formatPercentage(selectedFund.dayGrowth) }}
              </div>
            </div>
            
            <div class="worth-date">2024-05-20</div>
          </div>
          
          <div class="fund-growth-detail">
            <h3>业绩表现</h3>
            <div class="growth-table">
              <div class="growth-row">
                <div class="growth-period">近1周</div>
                <div 
                  class="growth-value" 
                  :style="{ color: getGrowthColor(selectedFund.weekGrowth) }"
                >
                  {{ formatPercentage(selectedFund.weekGrowth) }}
                </div>
              </div>
              
              <div class="growth-row">
                <div class="growth-period">近1月</div>
                <div 
                  class="growth-value" 
                  :style="{ color: getGrowthColor(selectedFund.monthGrowth) }"
                >
                  {{ formatPercentage(selectedFund.monthGrowth) }}
                </div>
              </div>
              
              <div class="growth-row">
                <div class="growth-period">近1年</div>
                <div 
                  class="growth-value" 
                  :style="{ color: getGrowthColor(selectedFund.yearGrowth) }"
                >
                  {{ formatPercentage(selectedFund.yearGrowth) }}
                </div>
              </div>
              
              <div class="growth-row">
                <div class="growth-period">近3年</div>
                <div 
                  class="growth-value" 
                  :style="{ color: getGrowthColor(selectedFund.threeYearGrowth) }"
                >
                  {{ formatPercentage(selectedFund.threeYearGrowth) }}
                </div>
              </div>
              
              <div class="growth-row">
                <div class="growth-period">近5年</div>
                <div 
                  class="growth-value" 
                  :style="{ color: getGrowthColor(selectedFund.fiveYearGrowth) }"
                >
                  {{ formatPercentage(selectedFund.fiveYearGrowth) }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="fund-info-detail">
            <h3>基金信息</h3>
            
            <div class="info-row">
              <div class="info-label">基金经理</div>
              <div class="info-value">{{ selectedFund.manager }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">基金规模</div>
              <div class="info-value">{{ selectedFund.scale }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">成立日期</div>
              <div class="info-value">{{ selectedFund.establishDate }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">基金描述</div>
              <div class="info-value description">{{ selectedFund.description }}</div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="action-button buy">购买</button>
          <button class="action-button add-to-portfolio">加入自选</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 使用通用返回首页按钮组件 -->
  <HomeButton />
</template>

<style scoped>
.investment-home {
  padding: 1rem 0;
}

/* 过滤器样式 */
.fund-filters {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-bar {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
  outline: none;
  flex-grow: 1;
}

.sort-direction-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-direction-btn:hover {
  background-color: #e9ecef;
}

.risk-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.risk-filter-label {
  font-weight: 500;
  color: #333;
}

.risk-filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.risk-filter-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.risk-filter-btn:hover {
  background-color: #e9ecef;
}

.risk-filter-btn.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

/* 基金列表样式 */
.fund-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.fund-card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fund-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.fund-name-code {
  flex-grow: 1;
}

.fund-name {
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  line-height: 1.4;
}

.fund-code {
  font-size: 0.8rem;
  color: #666;
  background-color: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.fund-type-risk {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.fund-type {
  font-size: 0.8rem;
  color: #666;
  background-color: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.fund-risk {
  font-size: 0.8rem;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.risk-低风险 {
  background-color: #67c23a;
}

.risk-中低风险 {
  background-color: #e6a23c;
}

.risk-中风险 {
  background-color: #f56c6c;
}

.risk-中高风险 {
  background-color: #f56c6c;
}

.risk-高风险 {
  background-color: #cc0033;
}

.fund-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.fund-worth {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.worth-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.worth-growth {
  font-size: 1rem;
  font-weight: 500;
}

.fund-growth-chart {
  display: flex;
  gap: 1rem;
}

.growth-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.growth-label {
  font-size: 0.8rem;
  color: #666;
}

.growth-value {
  font-size: 0.9rem;
  font-weight: 500;
}

.fund-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fund-manager, .fund-scale {
  font-size: 0.9rem;
  color: #666;
}

.manager-name, .scale-value {
  font-weight: 500;
  color: #333;
}

.no-funds-found {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 详情弹窗样式 */
.fund-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  z-index: 10;
}

.modal-header {
  padding: 2rem;
  background-color: #f5f9fc;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

.modal-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
}

.fund-code-type {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.modal-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.fund-worth-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.worth-box {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.worth-label {
  font-size: 0.9rem;
  color: #666;
}

.worth-value {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.worth-date {
  font-size: 0.8rem;
  color: #999;
}

.fund-growth-detail h3, .fund-info-detail h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.growth-table {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.growth-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #f0f0f0;
}

.growth-period {
  font-size: 0.9rem;
  color: #666;
}

.info-row {
  display: flex;
  margin-bottom: 0.75rem;
}

.info-label {
  width: 80px;
  font-size: 0.9rem;
  color: #666;
  flex-shrink: 0;
}

.info-value {
  font-size: 0.9rem;
  color: #333;
  flex-grow: 1;
}

.info-value.description {
  line-height: 1.6;
}

.modal-footer {
  padding: 1.5rem 2rem;
  background-color: #f5f9fc;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-button {
  padding: 0.75rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-button.buy {
  background-color: #3498db;
  color: white;
}

.action-button.buy:hover {
  background-color: #2980b9;
}

.action-button.add-to-portfolio {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #e0e0e0;
}

.action-button.add-to-portfolio:hover {
  background-color: #e9ecef;
}

/* 返回首页按钮 */
.home-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
}

.home-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.6);
}

.home-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.home-text {
  font-size: 1rem;
  font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .fund-body {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .fund-growth-chart {
    width: 100%;
    justify-content: space-between;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .home-btn {
    padding: 0.8rem 1.5rem;
  }
}
</style>