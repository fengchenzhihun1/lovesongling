<template>
  <div class="memories-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-element" v-for="n in 8" :key="n"></div>
    </div>

    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 标题区域 -->
      <div class="header-section">
        <h1 class="memories-title">💕 我们的美好回忆 💕</h1>
        <p class="memories-subtitle">记录每一个珍贵的瞬间</p>
      </div>

      <!-- 爱情计数器 -->
      <div class="love-counter">
        <div class="counter-row">
          <div class="counter-item">
            <div class="counter-icon">💑</div>
            <div class="counter-content">
              <div class="counter-label">我们相识了</div>
              <div class="counter-value">{{ daysKnown }}</div>
              <div class="counter-unit">天</div>
            </div>
          </div>
          
          <div class="counter-item">
            <div class="counter-icon">💖</div>
            <div class="counter-content">
              <div class="counter-label">我们相爱了</div>
              <div class="counter-value">{{ daysInLove }}</div>
              <div class="counter-unit">天</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 无穷符号显示 -->
      <div class="infinity-display">
        <div class="infinity-symbol">∞</div>
        <div class="infinity-label">我们的爱将持续到永远</div>
      </div>

      <!-- 回忆照片墙 -->
      <div class="photo-wall">
        <div class="photo-grid">
          <div class="photo-item" v-for="(photo, index) in photos" :key="index">
            <div class="photo-frame">
              <div class="photo-placeholder">
                <span class="photo-icon">📷</span>
                <p class="photo-text">{{ photo.title }}</p>
                <span class="photo-date">{{ photo.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 爱情时间轴 -->
      <div class="timeline-section">
        <h2 class="timeline-title">💝 我们的爱情时间轴 💝</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="(event, index) in timelineEvents" :key="index">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ event.date }}</div>
              <div class="timeline-title">{{ event.title }}</div>
              <div class="timeline-description">{{ event.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="navigation">
        <router-link to="/love" class="home-btn">
          <span class="btn-icon">🏠</span>
          <span class="btn-text">返回首页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { calculateDaysBetween } from '@/utils/timeCalculator'

// 响应式数据
const daysKnown = ref(0)
const daysInLove = ref(0)

// 重要日期（请根据实际情况修改）
const FIRST_MET_DATE = '2023-01-15' // 第一次见面的日期
const LOVE_START_DATE = '2023-02-14' // 开始恋爱的日期

// 照片数据
const photos = ref([
  { title: '第一次约会', date: '2023-02-14' },
  { title: '一起看电影', date: '2023-03-01' },
  { title: '春游踏青', date: '2023-04-05' },
  { title: '生日惊喜', date: '2023-05-20' },
  { title: '海边漫步', date: '2023-07-15' },
  { title: '秋日约会', date: '2023-10-01' }
])

// 时间轴事件
const timelineEvents = ref([
  {
    date: '2023-01-15',
    title: '初次相遇',
    description: '那一刻，时间仿佛停止了，我知道你就是我要找的人'
  },
  {
    date: '2023-02-14',
    title: '确定关系',
    description: '在这个特殊的日子里，我们正式成为了彼此的唯一'
  },
  {
    date: '2023-06-01',
    title: '第一次旅行',
    description: '我们一起去了梦想中的地方，留下了美好的回忆'
  },
  {
    date: '2023-12-25',
    title: '第一个圣诞节',
    description: '在雪花飞舞的夜晚，我们许下了永远在一起的诺言'
  }
])

// 计算天数
const calculateDays = () => {
  daysKnown.value = calculateDaysBetween(FIRST_MET_DATE, new Date().toISOString().split('T')[0])
  daysInLove.value = calculateDaysBetween(LOVE_START_DATE, new Date().toISOString().split('T')[0])
}

// 组件挂载时计算天数
onMounted(() => {
  calculateDays()
})
</script>

<style scoped>
.memories-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  position: relative;
  overflow-x: hidden;
  padding: 20px 0;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 8s infinite linear;
}

.floating-element:nth-child(1) { left: 10%; animation-delay: 0s; }
.floating-element:nth-child(2) { left: 20%; animation-delay: 1s; }
.floating-element:nth-child(3) { left: 30%; animation-delay: 2s; }
.floating-element:nth-child(4) { left: 40%; animation-delay: 3s; }
.floating-element:nth-child(5) { left: 60%; animation-delay: 4s; }
.floating-element:nth-child(6) { left: 70%; animation-delay: 5s; }
.floating-element:nth-child(7) { left: 80%; animation-delay: 6s; }
.floating-element:nth-child(8) { left: 90%; animation-delay: 7s; }

@keyframes float {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
}

.memories-title {
  font-size: 48px;
  color: #e91e63;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1), 0 0 10px rgba(233, 30, 99, 0.3);
  }
  to {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(233, 30, 99, 0.6);
  }
}

.memories-subtitle {
  font-size: 20px;
  color: #666;
  margin: 0;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.love-counter {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 50px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  animation: zoomIn 1s ease-out;
}

.counter-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  flex-wrap: wrap;
}

.counter-item {
  flex: 1;
  min-width: 300px;
  max-width: 450px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.counter-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
}

.counter-item::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s;
  opacity: 0;
}

.counter-item:hover::before {
  animation: shine 0.6s ease-in-out;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

.counter-icon {
  font-size: 48px;
  margin-bottom: 15px;
  animation: pulse 2s infinite;
}

.counter-content {
  position: relative;
  z-index: 1;
}

.counter-label {
  font-size: 18px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.counter-value {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 5px;
  font-family: 'Arial', sans-serif;
}

.counter-unit {
  font-size: 16px;
  opacity: 0.8;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.infinity-display {
  text-align: center;
  margin: 60px 0;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.infinity-symbol {
  font-size: 80px;
  color: #e91e63;
  margin-bottom: 20px;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.infinity-label {
  font-size: 24px;
  color: #333;
  font-weight: 500;
}

.photo-wall {
  margin: 60px 0;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.photo-item {
  animation: fadeInUp 1s ease-out;
}

.photo-frame {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.photo-frame:hover {
  transform: translateY(-5px);
}

.photo-placeholder {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.photo-icon {
  font-size: 48px;
  margin-bottom: 15px;
  opacity: 0.7;
}

.photo-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.photo-date {
  font-size: 14px;
  color: #666;
  opacity: 0.8;
}

.timeline-section {
  margin: 80px 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.timeline-title {
  text-align: center;
  font-size: 36px;
  color: #e91e63;
  margin-bottom: 50px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
  padding-right: 40px;
  text-align: right;
}

.timeline-item:nth-child(even) {
  left: 50%;
  padding-left: 40px;
  text-align: left;
}

.timeline-marker {
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  background: #e91e63;
  border: 4px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #e91e63;
}

.timeline-item:nth-child(odd) .timeline-marker {
  right: -10px;
}

.timeline-item:nth-child(even) .timeline-marker {
  left: -10px;
}

.timeline-content {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-3px);
}

.timeline-date {
  font-size: 14px;
  color: #e91e63;
  font-weight: bold;
  margin-bottom: 10px;
}

.timeline-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.timeline-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.navigation {
  text-align: center;
  margin-top: 60px;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  font-size: 20px;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .memories-title {
    font-size: 32px;
  }
  
  .counter-row {
    flex-direction: column;
    gap: 20px;
  }
  
  .counter-item {
    min-width: 280px;
  }
  
  .photo-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 50px !important;
    padding-right: 0 !important;
    text-align: left !important;
  }
  
  .timeline-marker {
    left: 10px !important;
    right: auto !important;
  }
  
  .timeline-section {
    padding: 30px 20px;
  }
  
  .main-content {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .memories-title {
    font-size: 28px;
  }
  
  .counter-value {
    font-size: 36px;
  }
  
  .infinity-symbol {
    font-size: 60px;
  }
  
  .timeline-title {
    font-size: 28px;
  }
  
  .love-counter {
    padding: 30px 20px;
  }
}
</style>