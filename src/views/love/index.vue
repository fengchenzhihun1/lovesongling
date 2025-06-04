<script setup lang="ts" name="LoveIndex">
import HomeButton from '@/components/HomeButton.vue'

// 爱情模块的导航项
const navItems = [
  { name: '爱情首页', path: '/love', icon: '🏠', description: '我们爱情的起点' },
  { name: '表白信', path: '/love/confession', icon: '💌', description: '给你的一封情书' },
  { name: '我的回忆', path: '/love/memories', icon: '📸', description: '记录我们的美好时光' }
]
</script>

<template>
  <div class="love-module-container">
    <div class="love-header">
      <h1 class="love-title">爱的空间</h1>
      <p class="love-subtitle">我和宋玲的爱情故事</p>
    </div>
    
    <div class="love-nav">
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
    
    <div class="love-content">
      <router-view />
    </div>
    
    <!-- 返回首页按钮 -->
    <HomeButton />
  </div>
</template>

<style scoped>
.love-module-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #2d3a8c 0%, #4a1c5c 25%, #5d2d7a 50%, #c2185b 75%, #e91e63 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.love-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 1s ease-out;
}

.love-title {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
  font-family: 'Dancing Script', cursive;
}

.love-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
}

.love-nav {
  position: relative;
  z-index: 10;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
}

.nav-link {
  text-decoration: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 3px;
  background: #ff6b9d;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 80%;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(255, 107, 157, 0.3);
  transform: translateY(-3px);
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.nav-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.love-content {
  width: 100%;
  max-width: 1200px;
  flex: 1;
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