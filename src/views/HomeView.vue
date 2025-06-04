<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showModules = ref(false)

// 模块数据
const modules = [
  {
    id: 'love',
    title: '爱的空间',
    subtitle: '我和宋玲的爱情故事',
    icon: '💖',
    color: '#ff6b8b',
    gradient: 'linear-gradient(135deg, #ff6b8b 0%, #ffb6c1 100%)',
    description: '包含爱情首页、表白信和我的回忆的完整爱情空间',
    route: '/love'
  },
  {
    id: 'investment',
    title: '基金投资',
    subtitle: '理财规划与投资分析',
    icon: '💰',
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
    description: '专业的基金投资分析和理财规划建议',
    route: '/investment'
  },
  {
    id: 'ultraman',
    title: '奥特曼专区',
    subtitle: '光之战士的世界',
    icon: '⚡',
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
    description: '探索奥特曼的精彩世界，了解光之战士的故事',
    route: '/ultraman'
  }
]

const navigateToModule = (route: string) => {
  router.push(route)
}

onMounted(() => {
  setTimeout(() => {
    showModules.value = true
  }, 500)
})
</script>

<template>
  <div class="home-container">
    <!-- 主标题区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">
          <span class="title-line">欢迎来到</span>
          <span class="title-highlight">我的个人空间</span>
        </h1>
        <p class="hero-subtitle">
          这里有我的爱情故事、投资心得和童年回忆
        </p>
        <div class="hero-decoration">
          <div class="floating-icon">🌟</div>
          <div class="floating-icon">✨</div>
          <div class="floating-icon">💫</div>
        </div>
      </div>
    </section>

    <!-- 模块卡片区域 -->
    <section class="modules-section">
      <div class="modules-container">
        <h2 class="section-title">探索不同的世界</h2>
        <div class="modules-grid" :class="{ 'show': showModules }">
          <div 
            v-for="(module, index) in modules" 
            :key="module.id"
            class="module-card"
            :style="{ '--delay': index * 0.2 + 's', '--gradient': module.gradient }"
            @click="navigateToModule(module.route)"
          >
            <div class="card-header">
              <div class="module-icon">{{ module.icon }}</div>
              <div class="card-glow"></div>
            </div>
            <div class="card-content">
              <h3 class="module-title">{{ module.title }}</h3>
              <p class="module-subtitle">{{ module.subtitle }}</p>
              <p class="module-description">{{ module.description }}</p>
            </div>
            <div class="card-footer">
              <button class="explore-btn">
                <span>探索</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 装饰性背景元素 -->
    <div class="background-decoration">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

/* 主标题区域 */
.hero-section {
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.title-line {
  display: block;
  opacity: 0.9;
}

.title-highlight {
  display: block;
  background: linear-gradient(45deg, #ff6b8b, #4ecdc4, #45b7d1);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-decoration {
  position: relative;
  height: 60px;
}

.floating-icon {
  position: absolute;
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

.floating-icon:nth-child(1) {
  left: 20%;
  animation-delay: 0s;
}

.floating-icon:nth-child(2) {
  left: 50%;
  animation-delay: 1s;
}

.floating-icon:nth-child(3) {
  left: 80%;
  animation-delay: 2s;
}

/* 模块区域 */
.modules-section {
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.modules-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 3rem;
  font-weight: 600;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.module-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
}

.modules-grid.show .module-card {
  opacity: 1;
  transform: translateY(0);
  animation: slideInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

.module-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 20px;
}

.module-card:hover::before {
  opacity: 0.1;
}

.card-header {
  position: relative;
  text-align: center;
  margin-bottom: 1.5rem;
}

.module-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: inline-block;
  position: relative;
  z-index: 2;
}

.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: var(--gradient);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(20px);
  z-index: 1;
}

.card-content {
  text-align: center;
  margin-bottom: 2rem;
}

.module-title {
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.module-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.module-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.card-footer {
  text-align: center;
}

.explore-btn {
  background: var(--gradient);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.explore-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.explore-btn:hover .btn-arrow {
  transform: translateX(5px);
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: floatCircle 20s linear infinite;
}

.bg-circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.bg-circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 7s;
}

.bg-circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 14s;
}

/* 动画 */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatCircle {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-50px) rotate(180deg);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .module-card {
    padding: 1.5rem;
  }
  
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
