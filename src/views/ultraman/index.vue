<script setup lang="ts" name="UltramanIndex">
import HomeButton from '@/components/HomeButton.vue'

// 奥特曼模块的导航项
const navItems = [
  { name: '奥特曼首页', path: '/ultraman', icon: '🦸‍♂️', description: '奥特曼系列介绍' },
  { name: '奥特曼图鉴', path: '/ultraman/gallery', icon: '📚', description: '各代奥特曼详细资料' },
  { name: '怪兽图鉴', path: '/ultraman/monsters', icon: '👾', description: '经典怪兽介绍' }
]
</script>

<template>
  <div class="ultraman-module-container">
    <div class="ultraman-header">
      <h1 class="ultraman-title">奥特曼专区</h1>
      <p class="ultraman-subtitle">光之国的守护者们</p>
    </div>
    
    <div class="ultraman-nav">
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
    
    <div class="ultraman-content">
      <router-view />
    </div>
    
    <!-- 返回首页按钮 -->
    <HomeButton />
  </div>
</template>

<style scoped>
.ultraman-module-container {
  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f8ff;
  background-image: linear-gradient(to bottom, #e6f2ff, #f0f8ff);
}

.ultraman-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 1s ease-out;
}

.ultraman-title {
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ultraman-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
}

.ultraman-nav {
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
  background-color: #e6f2ff;
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: #0066cc;
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

.ultraman-content {
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