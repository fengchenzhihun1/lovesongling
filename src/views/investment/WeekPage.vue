<template>
  <div class="week-page">
    <div class="container">
      <!-- 导航面包屑 -->
      <div class="breadcrumb">
        <router-link to="/investment" class="breadcrumb-link">📊 投资策略</router-link>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ weekInfo?.title || '加载中...' }}</span>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">正在加载投资策略内容...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3 class="error-title">加载失败</h3>
        <p class="error-message">{{ error }}</p>
        <button @click="retryLoad" class="retry-button">重试</button>
      </div>

      <!-- 周主页面内容 -->
      <div v-else-if="mainContent" v-html="mainContent" class="main-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { investmentService } from '@/services/investmentService'
import { HtmlLinkProcessor } from '@/utils/htmlLinkProcessor'
import '@/assets/footer-styles.css'

const route = useRoute()
const router = useRouter()
const weekId = ref(route.params.weekId as string)

const weekInfo = ref<any>(null)
const mainContent = ref<string>('')
const isLoading = ref<boolean>(true)
const error = ref<string>('')
let htmlProcessor = new HtmlLinkProcessor(weekId.value)

const loadContent = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // 更新htmlProcessor以使用新的weekId
    htmlProcessor = new HtmlLinkProcessor(weekId.value)
    
    weekInfo.value = await investmentService.getWeekInfo(weekId.value)
    const rawContent = await investmentService.getWeekMainContent(weekId.value)
    
    // 处理HTML内容中的链接
    mainContent.value = htmlProcessor.processHtmlContent(rawContent)
    
    // 等待DOM更新后添加点击事件监听器
    await nextTick()
    const mainContentElement = document.querySelector('.main-content')
    if (mainContentElement) {
      htmlProcessor.attachClickListeners(mainContentElement as HTMLElement, router)
    }
  } catch (err) {
    console.error('Failed to load week data:', err)
    error.value = err instanceof Error ? err.message : '加载内容时发生未知错误'
  } finally {
    isLoading.value = false
  }
}

const retryLoad = () => {
  loadContent()
}

// 监听路由参数变化
watch(
  () => route.params.weekId,
  (newWeekId) => {
    if (newWeekId && newWeekId !== weekId.value) {
      weekId.value = newWeekId as string
      loadContent()
    }
  }
)

onMounted(() => {
  loadContent()
})
</script>

<style scoped>
.week-page {
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
  margin: 0 15px;
  color: #666;
}

.breadcrumb-current {
  color: #ffffff;
  font-weight: bold;
}

.main-content {
  margin-bottom: 40px;
}

/* 加载状态样式 */
.loading-container {
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

.loading-text {
  color: #00d4ff;
  font-size: 1.1em;
  margin: 0;
}

/* 错误状态样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.error-icon {
  font-size: 3em;
  margin-bottom: 20px;
}

.error-title {
  color: #ff6b6b;
  font-size: 1.5em;
  margin-bottom: 10px;
}

.error-message {
  color: #ffffff;
  margin-bottom: 20px;
  opacity: 0.8;
}

.retry-button {
  padding: 12px 24px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .breadcrumb {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .loading-container,
  .error-container {
    padding: 40px 15px;
  }
  
  .error-icon {
    font-size: 2.5em;
  }
  
  .error-title {
    font-size: 1.3em;
  }
}
</style>

<style>
/* 全局样式用于渲染的HTML内容 */
.main-content * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-content body {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: transparent !important;
  color: #ffffff;
  line-height: 1.6;
}

.main-content .container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.main-content .header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
}

.main-content .section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .main-content .header {
    padding: 30px 15px;
    margin-bottom: 20px;
  }
  
  .main-content .header h1 {
    font-size: 1.8em !important;
  }
  
  .main-content .header p {
    font-size: 1em !important;
  }
  
  .main-content .section {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .main-content .section h2 {
    font-size: 1.4em !important;
  }
  
  .main-content .nav-menu {
    flex-direction: column !important;
    gap: 10px !important;
  }
  
  .main-content .nav-btn {
    padding: 10px 20px !important;
    font-size: 0.9em !important;
  }
  
  .main-content .strategy-grid {
    grid-template-columns: 1fr !important;
    gap: 15px !important;
  }
  
  .main-content .strategy-card {
    padding: 15px !important;
  }
  
  .main-content .timeline {
    padding-left: 20px !important;
  }
  
  .main-content .timeline-item {
    padding: 15px !important;
    margin-bottom: 20px !important;
  }
}

@media (max-width: 480px) {
  .main-content .header {
    padding: 20px 10px;
  }
  
  .main-content .header h1 {
    font-size: 1.5em !important;
  }
  
  .main-content .section {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .main-content .section h2 {
    font-size: 1.2em !important;
  }
  
  .main-content .nav-btn {
    padding: 8px 16px !important;
    font-size: 0.85em !important;
  }
  
  .main-content .strategy-card {
    padding: 12px !important;
  }
  
  .main-content .timeline-item {
    padding: 12px !important;
  }
}
</style>