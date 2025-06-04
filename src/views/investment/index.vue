<script setup lang="ts" name="InvestmentIndex">
import HomeButton from '@/components/HomeButton.vue'

// 基金投资模块的导航项
const navItems = [
  { name: '基金首页', path: '/investment', icon: '📊', description: '基金投资概览' },
  { name: '基金详情', path: '/investment/details', icon: '📈', description: '基金详细信息' },
  { name: '投资组合', path: '/investment/portfolio', icon: '💼', description: '我的投资组合' }
]
</script>

<template>
  <div class="investment-module-container">
    <div class="investment-header">
      <h1 class="investment-title">基金投资</h1>
      <p class="investment-subtitle">智慧理财，稳健增值</p>
    </div>
    
    <div class="investment-nav">
      <div class="nav-links">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path" 
          class="nav-link" 
          :class="{ active: $route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
    
    <div class="investment-content">
      <router-view />
    </div>
    
    <!-- 返回首页按钮 -->
    <HomeButton />
  </div>
</template>

<style scoped>
.investment-module-container {
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f9fc;
  background-image: linear-gradient(to bottom, #f0f7fc, #f5f9fc);
}

.investment-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 1s ease-out;
}

.investment-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.investment-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
}

.investment-nav {
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #f0f7fc;
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: #3498db;
  color: white;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.nav-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.investment-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 60vh;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 返回首页按钮样式已移除，使用通用的HomeButton组件 */
</style>