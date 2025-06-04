<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <!-- 返回首页按钮 -->
  <button class="home-btn" @click="goHome">
    <span class="home-icon">🏠</span>
    <span class="home-text">返回首页</span>
  </button>
</template>

<style scoped>
/* 返回首页按钮样式 */
.home-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #ff6b8b, #ff4081);
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 107, 139, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  color: white;
  font-weight: bold;
}

.home-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(255, 107, 139, 0.6);
}

.home-icon {
  font-size: 1.2rem;
}

.home-text {
  font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .home-btn {
    padding: 8px 16px;
    bottom: 20px;
    right: 20px;
  }
  
  .home-icon {
    font-size: 1rem;
  }
  
  .home-text {
    font-size: 0.8rem;
  }
}
</style>