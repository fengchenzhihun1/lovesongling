<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { calculateTimeDifference, calculateTotalDays } from '@/utils/timeCalculator'

// 计算相识和相爱的时间
const firstMeetDate = new Date('2007-09-01T00:00:00')
const loveStartDate = new Date('2024-05-04T00:00:00')
const currentTime = ref(new Date())

// 定时器更新当前时间
let timer = null

const timeSinceFirstMeet = computed(() => {
  return calculateTimeDifference(firstMeetDate, currentTime.value)
})

const timeSinceLove = computed(() => {
  return calculateTimeDifference(loveStartDate, currentTime.value)
})

// 为了兼容现有的告白文本，保留天数计算
const daysSinceFirstMeet = computed(() => {
  return calculateTotalDays(firstMeetDate, currentTime.value)
})

const daysSinceLove = computed(() => {
  return calculateTotalDays(loveStartDate, currentTime.value)
})

const showResponse = ref(false)
const responseResult = ref(false)

const confessionLines = [
  "亲爱的宋玲，",
  "从2007年9月1日我们初次相遇开始，",
  "已经过去了" + Math.floor(daysSinceFirstMeet.value / 365) + "年多的时光。",
  "那时的我们还是青涩的学生，",
  "坐在同一间教室里，种下了缘分的种子。",
  "",
  "十七年的时光荏苒，",
  "我们各自在人生的道路上成长，",
  "经历了求学、工作、人生的起起伏伏，",
  "但那份初识的美好一直深藏在我心底。",
  "",
  "2024年，命运让我们重新相遇，",
  "虽然开始是通过相亲的方式，",
  "但当我再次见到你时，",
  "那种熟悉的感觉瞬间涌上心头。",
  "",
  "没想到我们会在游戏的世界里重新找到彼此，",
  "那些一起游戏的日日夜夜，",
  "让我们重新认识了对方，",
  "在虚拟的世界里，我们的心却越来越真实地靠近。",
  "",
  "5月1日，我鼓起勇气去郑州见你，",
  "那是我们正式开始恋爱的日子，",
  "从那一刻起，我们不再是游戏中的伙伴，",
  "而是现实中相爱的恋人。",
  "",
  "6月，你来到我的城市，",
  "我们一起去了迪士尼、苏州、杭州，",
  "那些天里，我们像童话中的王子和公主，",
  "在最浪漫的地方留下了最美好的回忆。",
  "",
  "爱情的路上总有磕磕碰碰，",
  "但正是这些小小的摩擦让我们更加了解彼此，",
  "每一次的争吵后都是更深的理解，",
  "每一次的和好都让我们的爱更加真挚。",
  "",
  "宋玲，我爱你，",
  "不仅仅是现在这一刻，",
  "更是从2007年的那个秋天开始，",
  "直到永远...",
  "",
  "我想和你一起走过人生的每一个春夏秋冬，",
  "一起面对生活的酸甜苦辣，",
  "一起创造更多美好的回忆。",
  "",
  "愿意做我的女朋友吗？",
  "愿意和我一起书写我们的爱情故事吗？"
]

const handleResponse = (result) => {
  responseResult.value = result
  showResponse.value = true
  
  // 添加一些特效
  if (result) {
    // 成功的庆祝效果
    setTimeout(() => {
      createFireworks()
    }, 500)
  }
}

const createFireworks = () => {
  // 简单的烟花效果
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const firework = document.createElement('div')
      firework.innerHTML = ['🎉', '💕', '🎊', '💖', '✨'][Math.floor(Math.random() * 5)]
      firework.style.position = 'fixed'
      firework.style.left = Math.random() * window.innerWidth + 'px'
      firework.style.top = Math.random() * window.innerHeight + 'px'
      firework.style.fontSize = '2rem'
      firework.style.zIndex = '9999'
      firework.style.pointerEvents = 'none'
      firework.style.animation = 'firework 2s ease-out forwards'
      document.body.appendChild(firework)
      
      setTimeout(() => {
        document.body.removeChild(firework)
      }, 2000)
    }, i * 100)
  }
}

// 页面加载和定时器
onMounted(() => {
  // 启动定时器，每秒更新时间
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
  console.log('Confession page loaded for 宋玲')
})

// 清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="confession-container">
    <!-- 顶部时间显示区域 -->
    <div class="top-time-bar">
      <div class="top-time-content">
        <div class="time-section">
          <div class="time-title">💕 相识时光</div>
          <div class="compact-time-display">
            <span class="time-unit">{{ timeSinceFirstMeet.years }}年</span>
            <span class="time-unit">{{ timeSinceFirstMeet.months }}月</span>
            <span class="time-unit">{{ timeSinceFirstMeet.days }}日</span>
            <span class="time-highlight">{{ String(timeSinceFirstMeet.hours).padStart(2, '0') }}:{{ String(timeSinceFirstMeet.minutes).padStart(2, '0') }}:{{ String(timeSinceFirstMeet.seconds).padStart(2, '0') }}</span>
          </div>
        </div>
        <div class="time-section">
          <div class="time-title">💖 相爱时光</div>
          <div class="compact-time-display">
            <span class="time-unit">{{ timeSinceLove.years }}年</span>
            <span class="time-unit">{{ timeSinceLove.months }}月</span>
            <span class="time-unit">{{ timeSinceLove.days }}日</span>
            <span class="time-highlight">{{ String(timeSinceLove.hours).padStart(2, '0') }}:{{ String(timeSinceLove.minutes).padStart(2, '0') }}:{{ String(timeSinceLove.seconds).padStart(2, '0') }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="confession-header">
      <h1 class="confession-title">💖 给宋玲的告白 💖</h1>
      <p class="confession-subtitle">这些话我想对你说很久了，从2007年到2024年，从相识到相爱...</p>
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
              <span class="time-label">日</span>
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
              <span class="time-label">日</span>
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

      <div class="response-section">
        <h3>宋玲，你愿意...</h3>
        <div class="response-buttons">
          <button @click="handleResponse(true)" class="response-btn yes-btn">
            💕 我愿意和你在一起 💕
          </button>
          <button @click="handleResponse(false)" class="response-btn no-btn">
            💭 让我再想想 💭
          </button>
        </div>
      </div>

      <div v-if="showResponse" class="response-message">
        <div v-if="responseResult" class="happy-response">
          <h2>🎉 太好了！我们在一起了！🎉</h2>
          <p>从2007年的相识到2024年的相爱，我们终于走到了一起！</p>
          <p>我们一起创造更多美好的回忆，从郑州到迪士尼，从游戏世界到现实生活！</p>
          <div class="celebration">🎊💕🎊💕🎊</div>
        </div>
        <div v-else class="sad-response">
          <h2>😊 没关系，我理解...</h2>
          <p>就像我们从2007年等到2024年一样，我会继续等待</p>
          <p>无论多久，我的心都会为你而跳动</p>
          <div class="patience">⏰💙⏰💙⏰</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 顶部时间栏样式 */
.top-time-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(45, 58, 140, 0.95) 0%, rgba(74, 28, 92, 0.95) 50%, rgba(194, 24, 91, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.top-time-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.time-section {
  text-align: center;
}

.time-title {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.compact-time-display {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
}

.time-unit {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.time-highlight {
  font-size: 1.2rem;
  color: #ffeb3b;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  background: rgba(255, 235, 59, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  border: 2px solid rgba(255, 235, 59, 0.3);
  text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
  animation: timeGlow 2s ease-in-out infinite alternate;
}

@keyframes timeGlow {
  from {
    box-shadow: 0 0 5px rgba(255, 235, 59, 0.3);
  }
  to {
    box-shadow: 0 0 15px rgba(255, 235, 59, 0.6);
  }
}

.confession-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #2d3a8c 0%, #4a1c5c 25%, #5d2d7a 50%, #c2185b 75%, #e91e63 100%);
  padding: 8rem 2rem 2rem;
  position: relative;
  overflow-x: hidden;
  max-width: 100%;
  margin: 0 auto;
}

.confession-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.confession-title {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
  animation: titleGlow 3s ease-in-out infinite alternate;
  line-height: 1.2;
}

@keyframes titleGlow {
  from {
    text-shadow: 3px 3px 6px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.3);
  }
  to {
    text-shadow: 3px 3px 6px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.6);
  }
}

.confession-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.confession-content {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.confession-text {
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
}

.confession-text::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff6b8b, #ff4081, #e91e63, #ad1457);
  border-radius: 25px;
  z-index: -1;
  animation: borderGlow 3s ease-in-out infinite alternate;
}

@keyframes borderGlow {
  from { opacity: 0.5; }
  to { opacity: 1; }
}

.confession-text:hover {
  transform: translateY(-5px) rotateX(2deg);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
}

.text-line {
  font-size: 1.3rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.heart-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.heart {
  position: absolute;
  animation: floatUp 4s linear infinite;
  opacity: 0.6;
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.love-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.stat-section {
  background: rgba(255, 255, 255, 0.15);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255,255,255,0.3);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-style: preserve-3d;
}

.stat-section:hover {
  transform: translateY(-10px) rotateX(5deg) scale(1.02);
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  background: rgba(255, 255, 255, 0.25);
}

.stat-title {
  font-size: 1.8rem;
  color: #ffeb3b;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-weight: bold;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

.time-display {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.time-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 0.8rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-width: 80px;
  transition: all 0.3s ease;
}

.time-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.time-number {
  display: block;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffeb3b;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 0.3rem;
  animation: numberPulse 2s ease-in-out infinite;
}

.time-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.infinity-display {
  text-align: center;
  padding: 1rem;
}

.infinity-symbol {
  display: block;
  font-size: 3rem;
  color: #ffeb3b;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 0.5rem;
  animation: infinityGlow 3s ease-in-out infinite alternate;
}

.infinity-label {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

@keyframes numberPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes infinityGlow {
  from {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,235,59,0.3);
  }
  to {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 40px rgba(255,235,59,0.6);
  }
}

.response-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  border: 2px solid rgba(255,255,255,0.2);
  transform-style: preserve-3d;
}

.response-section:hover {
  transform: translateY(-5px) rotateX(2deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.response-section h3 {
  font-size: 2.2rem;
  color: #ffeb3b;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-weight: bold;
}

.response-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.response-btn {
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transform-style: preserve-3d;
  min-width: 200px;
}

.yes-btn {
  background: linear-gradient(45deg, #ff6b8b, #ff4081);
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
}

.yes-btn:hover {
  transform: translateY(-5px) rotateX(5deg) scale(1.05);
  box-shadow: 0 20px 40px rgba(255,107,139,0.4);
  background: linear-gradient(45deg, #ff4081, #e91e63);
}

.no-btn {
  background: linear-gradient(45deg, #9c27b0, #673ab7);
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
}

.no-btn:hover {
  transform: translateY(-5px) rotateX(5deg) scale(1.05);
  box-shadow: 0 20px 40px rgba(156,39,176,0.4);
  background: linear-gradient(45deg, #673ab7, #3f51b5);
}

.response-message {
  margin-top: 2rem;
  padding: 3rem;
  border-radius: 25px;
  text-align: center;
  animation: fadeIn 1s ease-out;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255,255,255,0.2);
  transform-style: preserve-3d;
}

.happy-response {
  background: linear-gradient(145deg, rgba(76,175,80,0.3), rgba(139,195,74,0.2));
  color: white;
}

.happy-response:hover {
  transform: translateY(-5px) rotateX(2deg);
  box-shadow: 0 20px 40px rgba(76,175,80,0.3);
}

.sad-response {
  background: linear-gradient(145deg, rgba(63,81,181,0.3), rgba(103,58,183,0.2));
  color: white;
}

.sad-response:hover {
  transform: translateY(-5px) rotateX(2deg);
  box-shadow: 0 20px 40px rgba(63,81,181,0.3);
}

.response-message h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-weight: bold;
}

.response-message p {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.celebration, .patience {
  font-size: 2rem;
  margin-top: 1rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 烟花效果 */
@keyframes firework {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}

/* PC端大屏幕优化 */
@media (min-width: 1200px) {
  .confession-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 3rem;
  }
  
  .confession-header {
    padding-top: 10rem;
    margin-bottom: 4rem;
  }
  
  .confession-title {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  
  .confession-subtitle {
    font-size: 1.4rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .confession-content {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .text-line {
    font-size: 1.3rem;
    line-height: 2.2;
    margin-bottom: 1.5rem;
    padding: 1rem 2rem;
  }
  
  .love-stats {
    gap: 4rem;
    margin: 4rem 0;
  }
  
  .stat-section {
    padding: 3rem;
    border-radius: 25px;
  }
  
  .stat-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .stat-display {
    gap: 2rem;
  }
  
  .stat-item {
    padding: 1.5rem;
    min-width: 100px;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
  }
  
  .response-section {
    margin-top: 4rem;
  }
  
  .response-buttons {
    gap: 3rem;
  }
  
  .response-btn {
    padding: 1.5rem 3rem;
    font-size: 1.3rem;
    border-radius: 20px;
  }
  
  .response-btn:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
}

@media (min-width: 1024px) and (max-width: 1199px) {
  .confession-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .confession-header {
    padding-top: 9rem;
  }
  
  .confession-title {
    font-size: 3.5rem;
  }
  
  .text-line {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }
}

/* PC端顶部时间栏优化 */
@media (min-width: 1024px) {
  .top-time-bar {
    padding: 1.5rem 0;
  }
  
  .top-time-content {
    max-width: 1400px;
    margin: 0 auto;
    gap: 5rem;
    padding: 0 2rem;
  }
  
  .time-section {
    text-align: center;
    min-width: 300px;
  }
  
  .time-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  .compact-time-display {
    gap: 1.5rem;
    justify-content: center;
  }
  
  .time-unit {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    min-width: 60px;
    border-radius: 12px;
    font-weight: 600;
  }
  
  .time-highlight {
    font-size: 1.6rem;
    padding: 0.8rem 1.5rem;
    min-width: 140px;
    border-radius: 15px;
    font-weight: 800;
  }
}

/* 中等屏幕优化 */
@media (max-width: 1023px) {
  .confession-container {
    padding: 1.5rem;
  }
  
  .confession-title {
    font-size: 3rem;
  }
  
  .love-stats {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .top-time-content {
    flex-direction: column;
    gap: 1rem;
    padding: 0 0.5rem;
  }

  .time-title {
    font-size: 0.9rem;
  }

  .compact-time-display {
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .time-unit {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }

  .time-highlight {
    font-size: 1rem;
    padding: 0.3rem 0.6rem;
  }

  .confession-container {
    padding: 10rem 1rem 1rem; /* 移动端需要更多顶部间距 */
  }
  
  .confession-header {
    padding-top: 1rem;
    margin-bottom: 2rem;
  }
  
  .confession-title {
    font-size: 2.5rem;
  }
  
  .confession-subtitle {
    font-size: 1.1rem;
  }
  
  .confession-text {
    padding: 2rem;
  }
  
  .text-line {
    font-size: 1.2rem;
  }
  
  .love-stats {
    gap: 1.5rem;
  }
  
  .stat-section {
    padding: 1.5rem;
  }
  
  .stat-title {
    font-size: 1.5rem;
  }
  
  .time-display {
    gap: 1rem;
  }
  
  .time-item {
    min-width: 70px;
    padding: 0.8rem 0.6rem;
  }
  
  .time-number {
    font-size: 1.8rem;
  }
  
  .time-label {
    font-size: 0.9rem;
  }
  
  .infinity-symbol {
    font-size: 2.5rem;
  }
  
  .infinity-label {
    font-size: 1.1rem;
  }
  
  .response-section {
    padding: 2rem;
  }
  
  .response-section h3 {
    font-size: 1.8rem;
  }
  
  .response-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .response-btn {
    padding: 1.2rem 2.5rem;
    font-size: 1.2rem;
    min-width: 180px;
    width: 100%;
    max-width: 300px;
  }
  
  .response-message {
    padding: 2rem;
  }
  
  .response-message h2 {
    font-size: 2rem;
  }
  
  .response-message p {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .confession-title {
    font-size: 2rem;
  }
  
  .confession-subtitle {
    font-size: 1rem;
  }
  
  .confession-text {
    padding: 1.5rem;
  }
  
  .text-line {
    font-size: 1.1rem;
  }
  
  .stat-item {
    padding: 1rem;
    min-width: 140px;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .response-section {
    padding: 1.5rem;
  }
  
  .response-section h3 {
    font-size: 1.6rem;
  }
  
  .response-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    min-width: 160px;
  }
  
  .response-message {
    padding: 1.5rem;
  }
  
  .response-message h2 {
    font-size: 1.8rem;
  }
  
  .response-message p {
    font-size: 1.1rem;
  }
  
  .celebration, .patience {
    font-size: 1.5rem;
  }
}
</style>