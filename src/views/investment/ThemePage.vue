<template>
  <div class="theme-page">
    <div class="container">
      <!-- 导航面包屑 -->
      <div class="breadcrumb">
        <router-link to="/investment" class="breadcrumb-link">📊 投资策略</router-link>
        <span class="breadcrumb-separator">></span>
        <router-link :to="`/investment/week/${weekId}`" class="breadcrumb-link">{{ weekInfo?.title }}</router-link>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ themeInfo?.title }}</span>
      </div>

      <!-- 主题内容 -->
      <div v-if="themeContent" v-html="themeContent" class="theme-content"></div>
      
      <!-- 加载状态 -->
      <div v-else class="loading">
        <div class="loading-spinner"></div>
        <p>正在加载主题内容...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { investmentService } from '@/services/investmentService'
import { HtmlLinkProcessor } from '@/utils/htmlLinkProcessor'
import '@/assets/footer-styles.css'

const route = useRoute()
const weekId = route.params.weekId as string
const themeId = route.params.themeId as string

const weekInfo = ref<any>(null)
const themeInfo = ref<any>(null)
const themeContent = ref<string>('')

onMounted(async () => {
  try {
    weekInfo.value = await investmentService.getWeekInfo(weekId)
    themeInfo.value = await investmentService.getThemeInfo(weekId, themeId)
    themeContent.value = await investmentService.getThemeContent(weekId, themeId)
  } catch (error) {
    console.error('Failed to load theme data:', error)
  }
})
</script>

<style scoped>
.theme-page {
  color: #ffffff;
  padding: 20px 0;
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  flex-wrap: wrap;
  gap: 10px;
}

.breadcrumb-link {
  color: #00d4ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #ffffff;
}

.breadcrumb-separator {
  margin: 0 5px;
  color: #666;
}

.breadcrumb-current {
  color: #ffffff;
  font-weight: bold;
}

.theme-content {
  animation: fadeInUp 0.6s ease-out;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 212, 255, 0.3);
  border-top: 4px solid #00d4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .breadcrumb {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<style>
/* 全局样式用于渲染的HTML内容 */
.theme-content * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.theme-content body {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: transparent !important;
  color: #ffffff;
  line-height: 1.6;
}

.theme-content .container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.theme-content .header {
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.theme-content .back-btn {
  display: none;
}

.theme-content .theme-section,
.theme-content .analysis-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.theme-content .section-title,
.theme-content .theme-title {
  color: #00d4ff;
  font-size: 1.8em;
  margin-bottom: 20px;
  border-bottom: 2px solid #00d4ff;
  padding-bottom: 10px;
}

.theme-content .logic-box,
.theme-content .strategy-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 10px;
  margin: 15px 0;
  border-left: 4px solid #00d4ff;
}

.theme-content .targets-grid,
.theme-content .market-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.theme-content .target-card,
.theme-content .market-card {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  transition: transform 0.3s ease;
}

.theme-content .target-card:hover,
.theme-content .market-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
}

.theme-content .discussion-box,
.theme-content .quote-box {
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
  border-left: 3px solid #ff6b6b;
}

.theme-content .risk-warning {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.theme-content .timeline {
  position: relative;
  padding-left: 30px;
}

.theme-content .timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #00d4ff, #0099cc);
}

.theme-content .timeline-item {
  position: relative;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid #00d4ff;
}

.theme-content .timeline-item::before {
  content: '';
  position: absolute;
  left: -38px;
  top: 25px;
  width: 12px;
  height: 12px;
  background: #00d4ff;
  border-radius: 50%;
  border: 3px solid #1a1a2e;
}
</style>