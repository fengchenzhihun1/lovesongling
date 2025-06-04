<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { calculateTimeDifference } from '@/utils/timeCalculator'
import HomeButton from '@/components/HomeButton.vue'

// 计算相识和相爱的时间
const firstMeetDate = new Date('2006-09-01T00:00:00')
const loveStartDate = new Date('2024-05-04T00:00:00')
const currentTime = ref(new Date())

// 定时器更新当前时间
let timer: ReturnType<typeof setInterval> | null = null

// 表白信内容
const confessionLines = [
  '亲爱的宋玲：',
  '当我写下这封信的时候，窗外的星星正闪烁着，就像你的眼睛一样明亮。',
  '十八年前，我们在校园里初次相遇，那时的我们还很年轻，懵懂而纯真。',
  '命运让我们分别了很长时间，但冥冥之中，我们又在人海中重逢。',
  '这一次，我不想再让你从我的生命中溜走。',
  '记得我们在郑州的那次约会吗？你穿着淡蓝色的连衣裙，笑容如春风般温暖。',
  '在迪士尼的那天，看着你开心的样子，我就知道我想和你一起创造更多这样的回忆。',
  '宋玲，你是我生命中最美丽的意外，是我漫长旅途中最温暖的港湾。',
  '我喜欢你认真工作的样子，喜欢你开怀大笑的样子，喜欢你安静思考的样子。',
  '我喜欢和你一起散步，一起看电影，一起分享生活中的点点滴滴。',
  '我知道爱情需要经营，需要包容，需要理解。',
  '我愿意为了我们的爱情去学习，去成长，去做一个更好的人。',
  '宋玲，我想告诉你，我爱你。',
  '不是一时冲动的喜欢，而是经过时间沉淀爱。',
  '我希望能牵着你的手，走过春夏秋冬，走过生命中的每一个日升月落。',
  '无论是快乐还是悲伤，无论是成功还是失败，我都想和你一起面对。',
  '这是我的真心告白，也是我对未来的承诺。',
  '你愿意接受我的爱，和我一起书写我们的爱情故事吗？',
  '',
  '永远爱你的人',
  '2024年5月4日'
]

// 响应状态
const hasResponded = ref(false)
const response = ref('')

// 计算时间差
const timeSinceFirstMeet = computed(() => {
  return calculateTimeDifference(firstMeetDate, currentTime.value)
})

const timeSinceLove = computed(() => {
  return calculateTimeDifference(loveStartDate, currentTime.value)
})

// 处理响应
function handleResponse(answer: string) {
  hasResponded.value = true
  response.value = answer
  
  if (answer === 'yes') {
    createFireworks()
  }
}

// 创建烟花效果
function createFireworks() {
  const fireworksContainer = document.createElement('div')
  fireworksContainer.className = 'fireworks-container'
  document.body.appendChild(fireworksContainer)
  
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const firework = document.createElement('div')
      firework.className = 'firework'
      firework.style.left = Math.random() * 100 + '%'
      firework.style.top = Math.random() * 50 + '%'
      firework.style.animationDuration = (Math.random() * 1 + 0.5) + 's'
      firework.style.setProperty('--hue', Math.floor(Math.random() * 360) + 'deg')
      
      fireworksContainer.appendChild(firework)
      
      setTimeout(() => {
        firework.remove()
      }, 1500)
    }, i * 300)
  }
  
  setTimeout(() => {
    fireworksContainer.remove()
  }, 6000)
}

// 页面加载和卸载
onMounted(() => {
  // 启动定时器，每秒更新时间
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
  
  console.log('Confession page loaded for 宋玲')
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="confession-container">
    <!-- 顶部时间栏 -->
    <div class="top-time-bar">
      <div class="top-time-content">
        <div class="time-section">
          <div class="time-title">💕 相识时光 💕</div>
          <div class="compact-time-display">
            <span class="time-unit">{{ timeSinceFirstMeet.years }}年</span>
            <span class="time-unit">{{ timeSinceFirstMeet.months }}月</span>
            <span class="time-unit">{{ timeSinceFirstMeet.days }}天</span>
            <span class="time-highlight">{{ String(timeSinceFirstMeet.hours).padStart(2, '0') }}:{{ String(timeSinceFirstMeet.minutes).padStart(2, '0') }}:{{ String(timeSinceFirstMeet.seconds).padStart(2, '0') }}</span>
          </div>
        </div>
        
        <div class="time-section">
          <div class="time-title">❤️ 相爱时光 ❤️</div>
          <div class="compact-time-display">
            <span class="time-unit">{{ timeSinceLove.years }}年</span>
            <span class="time-unit">{{ timeSinceLove.months }}月</span>
            <span class="time-unit">{{ timeSinceLove.days }}天</span>
            <span class="time-highlight">{{ String(timeSinceLove.hours).padStart(2, '0') }}:{{ String(timeSinceLove.minutes).padStart(2, '0') }}:{{ String(timeSinceLove.seconds).padStart(2, '0') }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="confession-header">
      <h1 class="confession-title">💖 给宋玲的告白 💖</h1>
      <p class="confession-subtitle">这些话我想对你说很久了，从2006年到2024年，从相识到相爱...</p>
    </div>

    <div class="confession-content">
      <div class="confession-text">
        <div class="text-line" v-for="(line, index) in confessionLines" :key="index" 
             :style="{ animationDelay: index * 0.8 + 's' }">
          {{ line }}
        </div>
      </div>

      <div class="heart-decoration">
        <div class="heart" v-for="n in 25" :key="n" 
             :style="{ 
               left: Math.random() * 100 + '%', 
               animationDelay: Math.random() * 4 + 's',
               fontSize: (Math.random() * 25 + 15) + 'px'
             }">
          💕
        </div>
      </div>

      <div class="love-stats">
        <div class="stat-section">
          <h3 class="stat-title">💕 相识时光 💕</h3>
          <div class="time-display">
            <div class="time-item">
              <span class="time-number">{{ timeSinceFirstMeet.years }}</span>
              <span class="time-label">年</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceFirstMeet.months }}</span>
              <span class="time-label">月</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceFirstMeet.days }}</span>
              <span class="time-label">天</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceFirstMeet.hours }}</span>
              <span class="time-label">时</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceFirstMeet.minutes }}</span>
              <span class="time-label">分</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceFirstMeet.seconds }}</span>
              <span class="time-label">秒</span>
            </div>
          </div>
        </div>
        
        <div class="stat-section">
          <h3 class="stat-title">❤️ 相爱时光 ❤️</h3>
          <div class="time-display">
            <div class="time-item">
              <span class="time-number">{{ timeSinceLove.years }}</span>
              <span class="time-label">年</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceLove.months }}</span>
              <span class="time-label">月</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceLove.days }}</span>
              <span class="time-label">天</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceLove.hours }}</span>
              <span class="time-label">时</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceLove.minutes }}</span>
              <span class="time-label">分</span>
            </div>
            <div class="time-item">
              <span class="time-number">{{ timeSinceLove.seconds }}</span>
              <span class="time-label">秒</span>
            </div>
          </div>
        </div>
        
        <div class="stat-section">
          <h3 class="stat-title">💖 永恒的爱 💖</h3>
          <div class="infinity-display">
            <span class="infinity-symbol">∞</span>
            <span class="infinity-label">爱你的时间</span>
          </div>
        </div>
      </div>
      
      <!-- 响应按钮 -->
      <div v-if="!hasResponded" class="response-buttons">
        <button class="response-btn yes-btn" @click="handleResponse('yes')">
          我愿意 💖
        </button>
        <button class="response-btn no-btn" @click="handleResponse('no')">
          再考虑一下
        </button>
      </div>
      
      <!-- 响应消息 -->
      <div v-if="hasResponded" class="response-message" :class="{ 'yes-response': response === 'yes', 'no-response': response === 'no' }">
        <template v-if="response === 'yes'">
          <h2>💖 谢谢你接受我的爱 💖</h2>
          <p>我会用一生的时间来证明，这是你做过的最好的决定</p>
          <div class="love-stats">
            <div class="stat-section">
              <div class="stat-title">我们的爱情故事</div>
              <div class="time-display">
                <div class="time-item">
                  <div class="time-number">∞</div>
                  <div class="time-label">永恒</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <h2>我会等你准备好的那一天 💕</h2>
          <p>爱是耐心和等待，我会给你足够的时间和空间</p>
          <button class="reconsider-btn" @click="hasResponded = false">重新考虑</button>
        </template>
      </div>
    </div>
  </div>
  
  <!-- 使用通用返回首页按钮组件 -->
  <HomeButton />
</template>

<style scoped>
/* 关键帧动画定义 */
@keyframes timeGlow {
  0%, 100% { text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700; }
  50% { text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
}

@keyframes titleGlow {
  0%, 100% { text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4; }
  50% { text-shadow: 0 0 20px #ff69b4, 0 0 30px #ff69b4, 0 0 40px #ff69b4; }
}

@keyframes borderGlow {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 105, 180, 0.5), inset 0 0 5px rgba(255, 105, 180, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.8), inset 0 0 10px rgba(255, 105, 180, 0.4); }
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

@keyframes floatUp {
  0% {
    opacity: 0.8;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(1.5);
  }
}

@keyframes numberPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes infinityGlow {
  0%, 100% { 
    color: #ffd700;
    text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;
  }
  50% { 
    color: #ff69b4;
    text-shadow: 0 0 20px #ff69b4, 0 0 30px #ff69b4;
  }
}

/* 主容器样式 */
.confession-container {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #f5576c 75%, 
    #4facfe 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  padding: 0;
  color: white;
  font-family: 'Microsoft YaHei', 'Arial', sans-serif;
  position: relative;
  overflow-x: hidden;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 顶部时间栏样式 */
.top-time-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  padding: 15px 0;
}

.top-time-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.time-section {
  text-align: center;
  flex: 1;
}

.time-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fff;
}

.compact-time-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.time-unit {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.time-highlight {
  background: linear-gradient(45deg, #ffd700, #ff69b4);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  animation: timeGlow 2s ease-in-out infinite;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* 表白标题样式 */
.confession-header {
  text-align: center;
  padding: 120px 20px 40px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 0;
}

.confession-title {
  font-size: 3.5em;
  margin-bottom: 20px;
  animation: titleGlow 3s ease-in-out infinite;
  font-weight: bold;
  letter-spacing: 2px;
}

.confession-subtitle {
  font-size: 1.3em;
  opacity: 0.9;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 表白内容样式 */
.confession-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.confession-text {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 60px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: borderGlow 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.confession-text::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff69b4, #ffd700, #ff69b4);
  border-radius: 25px;
  z-index: -1;
  opacity: 0.3;
}

.text-line {
  margin-bottom: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  border-left: 4px solid #ffd700;
  line-height: 1.8;
  font-size: 1.1em;
  animation: fadeInUp 1s ease-out both, textGlow 3s ease-in-out infinite;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.text-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
  animation-delay: var(--shimmer-delay, 0s);
}

.text-line:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(10px) scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 215, 0, 0.3);
  border-left-color: #ff69b4;
}

.text-line:nth-child(odd) {
  --shimmer-delay: 0.5s;
}

.text-line:nth-child(even) {
  --shimmer-delay: 1s;
}

/* 爱心装饰样式 */
.heart-decoration {
  position: relative;
  height: 200px;
  margin: 60px 0;
  overflow: hidden;
  pointer-events: none;
}

.heart {
  position: absolute;
  animation: floatUp 6s linear infinite;
  cursor: default;
  user-select: none;
}

/* 爱情统计样式 */
.love-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.stat-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.stat-section:hover::before {
  left: 100%;
}

.stat-section:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.stat-title {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #ffd700;
  font-weight: bold;
}

.time-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.time-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px 10px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.time-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.time-number {
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: #ffd700;
  animation: numberPulse 2s ease-in-out infinite;
  margin-bottom: 5px;
}

.time-label {
  font-size: 0.9em;
  opacity: 0.8;
  color: #fff;
}

.infinity-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
}

.infinity-symbol {
  font-size: 4em;
  animation: infinityGlow 3s ease-in-out infinite;
  margin-bottom: 10px;
  font-weight: bold;
}

.infinity-label {
  font-size: 1.2em;
  color: #fff;
  opacity: 0.9;
}

/* 响应按钮 */
.response-section {
  text-align: center;
  margin-top: 60px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.response-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.response-btn {
  padding: 15px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.response-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  z-index: -1;
  transition: all 0.4s ease;
}

.yes-btn {
  background: linear-gradient(45deg, #ff6b6b, #ffd93d);
  color: white;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.yes-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(255, 107, 107, 0.6);
}

.no-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.no-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(102, 126, 234, 0.6);
}

.response-message {
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: bold;
  animation: fadeInUp 1s ease-out;
}

.happy-response {
  background: linear-gradient(45deg, #ff6b6b, #ffd93d);
  color: white;
  animation: pulse 2s infinite;
}

.sad-response {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes textGlow {
  0%, 100% { 
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 105, 180, 0.3);
  }
  50% { 
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 105, 180, 0.6), 0 0 30px rgba(255, 255, 255, 0.3);
  }
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .confession-title {
    font-size: 2.8em;
  }
  
  .love-stats {
    grid-template-columns: 1fr;
  }
  
  .time-display {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .top-time-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .time-section {
    width: 100%;
  }
  
  .compact-time-display {
    justify-content: center;
  }
  
  .confession-header {
    padding: 140px 15px 30px;
  }
  
  .confession-title {
    font-size: 2.2em;
  }
  
  .confession-subtitle {
    font-size: 1.1em;
  }
  
  .confession-text {
    padding: 25px;
    margin-bottom: 40px;
  }
  
  .text-line {
    padding: 12px 15px;
    font-size: 1em;
  }
  
  .love-stats {
    gap: 20px;
    margin-top: 40px;
  }
  
  .stat-section {
    padding: 20px;
  }
  
  .time-display {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .time-number {
    font-size: 1.5em;
  }
  
  .infinity-symbol {
    font-size: 3em;
  }
  
  .response-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .response-btn {
    width: 80%;
  }
}

@media (max-width: 480px) {
  .confession-content {
    padding: 20px 10px;
  }
  
  .confession-text {
    padding: 20px;
  }
  
  .text-line {
    padding: 10px 12px;
    font-size: 0.95em;
  }
  
  .time-display {
    grid-template-columns: 1fr;
  }
  
  .compact-time-display {
    gap: 5px;
  }
  
  .time-unit, .time-highlight {
    font-size: 12px;
    padding: 3px 6px;
  }
}

/* 烟花效果 */
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.firework {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, white, transparent);
  box-shadow: 0 0 20px 10px var(--color, hsl(var(--hue), 100%, 60%));
  --color: hsl(var(--hue), 100%, 60%);
  transform: scale(0);
  animation: explode 1s ease-out forwards;
}

@keyframes explode {
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* 返回首页按钮 */
.home-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #ff6b6b, #e91e63);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(233, 30, 99, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
}

.home-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(233, 30, 99, 0.6);
}

.home-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.home-text {
  font-size: 1rem;
  font-weight: bold;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .confession-content {
    padding: 2rem 1.5rem;
  }
  
  .confession-header h1 {
    font-size: 2rem;
  }
  
  .confession-header h1::before,
  .confession-header h1::after {
    width: 50px;
  }
  
  .text-line {
    font-size: 1rem;
  }
  
  .response-buttons {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .response-btn {
    width: 80%;
  }
  
  .home-btn {
    padding: 0.8rem 1.5rem;
  }
}
</style>