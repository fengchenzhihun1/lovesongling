<template>
  <div class="investment-layout">
    <!-- 移动端菜单按钮 -->
    <button class="mobile-menu-btn" v-if="isMobile" @click="toggleMobileMenu">
      <span class="hamburger-icon">☰</span>
    </button>
    
    <!-- 左侧树形导航 -->
    <TreeNavigation ref="treeNavRef" />
    
    <!-- 主内容区域 -->
    <main class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TreeNavigation from './TreeNavigation.vue'

const sidebarOpen = ref(true)
const isMobile = ref(false)
const treeNavRef = ref<InstanceType<typeof TreeNavigation> | null>(null)

// 监听侧边栏切换事件
const handleSidebarToggle = (event: any) => {
  sidebarOpen.value = event.detail.open
  console.log('Layout received sidebar toggle:', sidebarOpen.value)
  
  // 强制更新主内容区域的样式
  const mainContent = document.querySelector('.main-content')
  if (mainContent) {
    if (sidebarOpen.value) {
      mainContent.classList.add('sidebar-open')
      mainContent.classList.remove('sidebar-closed')
    } else {
      mainContent.classList.remove('sidebar-open')
      mainContent.classList.add('sidebar-closed')
    }
  }
}

// 移动端相关方法
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const toggleMobileMenu = () => {
  if (treeNavRef.value) {
    // 调用TreeNavigation组件的toggleSidebar方法
    treeNavRef.value.toggleSidebar()
  }
}

onMounted(() => {
  window.addEventListener('sidebar-toggle', handleSidebarToggle)
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('sidebar-toggle', handleSidebarToggle)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.investment-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #2d3748;
  border-radius: 8px;
  color: #e2e8f0;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.mobile-menu-btn:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: #00d4ff;
  color: #00d4ff;
}

.hamburger-icon {
  font-size: 18px;
  display: block;
}

.main-content {
  flex: 1;
  margin-left: 220px;
  transition: margin-left 0.3s ease;
  overflow-x: hidden;
}

.main-content:not(.sidebar-open) {
  margin-left: 50px;
}

.main-content.sidebar-closed {
  margin-left: 50px;
}

.content-wrapper {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .main-content.sidebar-open {
    margin-left: 0;
  }
}

/* 全局样式覆盖，确保内容区域正确显示 */
:deep(.container) {
  max-width: 100%;
  padding: 0;
}

:deep(.week-page),
:deep(.theme-page),
:deep(.investment-home) {
  background: transparent;
  min-height: auto;
}

:deep(.week-page .container),
:deep(.theme-page .container),
:deep(.investment-home .container) {
  padding: 0;
}
</style>