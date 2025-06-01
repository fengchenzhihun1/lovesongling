<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const firstMeetDate = new Date('2007-09-01T00:00:00')
const loveStartDate = new Date('2024-05-04T00:00:00')
const currentTime = ref(new Date())
let timerId = null

const formatDuration = (startDate) => {
  const ms = currentTime.value.getTime() - startDate.getTime();
  if (ms < 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  const originalDate = new Date(startDate);
  let years = currentTime.value.getFullYear() - originalDate.getFullYear();
  let months = currentTime.value.getMonth() - originalDate.getMonth();
  
  // Adjust days based on current date's day vs start date's day for month calculation
  let currentDays = currentTime.value.getDate();
  let startDays = originalDate.getDate();

  if (months < 0 || (months === 0 && currentDays < startDays)) {
    years--;
    months += 12;
  }

  // Recalculate days based on the adjusted years and months
  // This is a simplified approach for days, a more precise library might be needed for perfect month/day boundaries
  // For now, we'll use the total days and then derive Y/M from it for a more intuitive display
  
  // Let's refine the year/month/day calculation
  let tempCurrentDate = new Date(currentTime.value);
  let tempStartDate = new Date(startDate);

  let y = tempCurrentDate.getFullYear() - tempStartDate.getFullYear();
  let m = tempCurrentDate.getMonth() - tempStartDate.getMonth();
  let d = tempCurrentDate.getDate() - tempStartDate.getDate();

  if (d < 0) {
    m--;
    // Get days in the previous month of current time
    const daysInLastMonth = new Date(tempCurrentDate.getFullYear(), tempCurrentDate.getMonth(), 0).getDate();
    d += daysInLastMonth;
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  
  return {
    years: y,
    months: m,
    days: d,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

const timeSinceFirstMeet = computed(() => formatDuration(firstMeetDate))
const timeSinceLove = computed(() => formatDuration(loveStartDate))

const showMemories = ref(false)
const currentMemory = ref(0)

const memories = [
  {
    title: '初次相遇 - 同窗时光',
    date: '2007年9月1日',
    content: '那一年我们还是青涩的学生，坐在同一间教室里。那时的我们还不知道，这份相识会在多年后开花结果。青春年少的我们，在最美好的年华里种下了缘分的种子。',
    emoji: '📚',
    color: '#ffb6c1'
  },
  {
    title: '时光荏苒 - 各自成长',
    date: '2007-2024年',
    content: '十七年的时光里，我们各自在人生的道路上前行。经历了求学、工作、成长的种种，虽然分别，但那份初识的美好的一直深藏在心底，等待着重逢的那一天。',
    emoji: '🌱',
    color: '#ff9999'
  },
  {
    title: '命运安排 - 再次相遇',
    date: '2024年初',
    content: '十七年后的重逢，虽然是通过相亲的方式，但当我们再次见面时，那种熟悉的感觉瞬间涌上心头。也许当时我们都还在犹豫，但命运的齿轮已经开始转动。',
    emoji: '🎭',
    color: '#87ceeb'
  },
  {
    title: '游戏相逢 - 心有灵犀',
    date: '2024年春',
    content: '没想到我们会在游戏的世界里重新找到彼此。那些一起游戏的日日夜夜，让我们重新认识了对方。在虚拟的世界里，我们的心却越来越真实地靠近。',
    emoji: '🎮',
    color: '#b0e0e6'
  },
  {
    title: '郑州之约 - 爱的开始',
    date: '2024年5月4日',
    content: '那一天我鼓起勇气去郑州见你，那是我们正式开始恋爱的日子。从那一刻起，我们不再是游戏中的伙伴，而是现实中相爱的恋人。这一天，标志着我们爱情的故事真正开始。',
    emoji: '💕',
    color: '#ff6b8b'
  },
  {
    title: '浪漫之旅 - 迪士尼的童话',
    date: '2024年6月',
    content: '你来到我的城市，我们一起去了迪士尼、苏州、杭州。那些天里，我们像童话中的王子和公主，在最浪漫的地方留下了最美好的回忆。每一张照片，每一个拥抱，都是我们爱情的见证。',
    emoji: '🏰',
    color: '#ffb6c1'
  },
  {
    title: '真挚之爱 - 磕磕碰碰中成长',
    date: '至今',
    content: '爱情的路上总有磕磕碰碰，但正是这些小小的摩擦让我们更加了解彼此。每一次的争吵后都是更深的理解，每一次的和好都让我们的爱更加真挚。我们的爱情在现实中扎根，在时间中成长。',
    emoji: '💖',
    color: '#ff9999'
  }
]

const timeline = [
  {
    title: '初识同窗',
    date: '2007.09.01',
    description: '青春年少的我们在同一间教室里相遇，那时还不知道这是命运的开始'
  },
  {
    title: '各自成长',
    date: '2007-2024',
    description: '十七年的时光里，我们在各自的人生道路上成长，积累着重逢时的美好'
  },
  {
    title: '重逢相识',
    date: '2024年初',
    description: '命运让我们在最合适的时候重新相遇，虽然开始有些陌生，但心中的熟悉感从未消失'
  },
  {
    title: '游戏相伴',
    date: '2024年春',
    description: '在游戏的世界里我们重新找到了彼此，那些一起度过的时光让我们的心越来越近'
  },
  {
    title: '郑州定情',
    date: '2024.05.04',
    description: '我去郑州见你的那一天，我们正式确定了恋爱关系，从此开始了我们的爱情故事'
  },
  {
    title: '浪漫之旅',
    date: '2024.06',
    description: '一起去迪士尼、苏州、杭州的美好时光，每一个地方都留下了我们甜蜜的回忆'
  },
  {
    title: '真挚相爱',
    date: '至今',
    description: '磕磕碰碰中我们的爱越来越真挚，愿与你携手走过人生的每一个春夏秋冬'
  }
]

const nextMemory = () => {
  if (currentMemory.value < memories.length - 1) {
    currentMemory.value++
  } else {
    currentMemory.value = 0
  }
}

const prevMemory = () => {
  if (currentMemory.value > 0) {
    currentMemory.value--
  } else {
    currentMemory.value = memories.length - 1
  }
}

onMounted(() => {
  timerId = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
  setTimeout(() => {
    showMemories.value = true
  }, 500)
})

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
})
</script>

<template>
  <div class="memories-container">
    <div class="memories-header">
      <h1 class="memories-title">💕 我和宋玲的爱情回忆 💕</h1>
      <p class="memories-subtitle">从2007年的初识到2024年的相爱，每一个瞬间都是命运的安排</p>
      <div class="love-counter">
        <div class="counter-item">
          <span class="counter-number">{{ timeSinceFirstMeet.years }}年 {{ timeSinceFirstMeet.months }}月 {{ timeSinceFirstMeet.days }}天</span>
          <span class="counter-detail">{{ timeSinceFirstMeet.hours }}时 {{ timeSinceFirstMeet.minutes }}分 {{ timeSinceFirstMeet.seconds }}秒</span>
          <span class="counter-label">我们相识了</span>
        </div>
        <div class="counter-item">
          <span class="counter-number">{{ timeSinceLove.years }}年 {{ timeSinceLove.months }}月 {{ timeSinceLove.days }}天</span>
          <span class="counter-detail">{{ timeSinceLove.hours }}时 {{ timeSinceLove.minutes }}分 {{ timeSinceLove.seconds }}秒</span>
          <span class="counter-label">我们相爱了</span>
        </div>
      </div>
    </div>

    <div class="memories-gallery">
      <div class="memory-card" v-for="(memory, index) in memories" :key="index">
        <div class="memory-content">
          <h3 class="memory-title">{{ memory.title }}</h3>
          <p class="memory-date">{{ memory.date }}</p>
          <p class="memory-text">{{ memory.content }}</p>
          <div class="memory-emoji">{{ memory.emoji }}</div>
        </div>
      </div>
    </div>

    <div class="timeline">
      <h2 class="timeline-title">💖 我们的爱情时光轴 💖</h2>
      <div class="timeline-item" v-for="(item, index) in timeline" :key="index" :class="index % 2 === 0 ? 'left' : 'right'">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h4>{{ item.title }}</h4>
          <span class="timeline-date">{{ item.date }}</span>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <div class="love-message">
      <h2>💝 给宋玲的话 💝</h2>
      <div class="love-quotes">
        <p>"宋玲，从2007年我们初次相遇到现在，已经过去了 {{ timeSinceFirstMeet.years }} 年 {{ timeSinceFirstMeet.months }} 个月 {{ timeSinceFirstMeet.days }} 天 {{ timeSinceFirstMeet.hours }} 小时 {{ timeSinceFirstMeet.minutes }} 分钟 {{ timeSinceFirstMeet.seconds }} 秒。"</p>
        <p>"虽然中间我们各自经历了人生的起起伏伏，但命运最终还是让我们在2024年重新相遇。"</p>
        <p>"从游戏中的相逢到现实中的相爱，每一步都像是上天的安排。"</p>
        <p>"磕磕碰碰中我们的爱越来越真挚，我想和你一起走过人生的每一个春夏秋冬。"</p>
        <p class="signature">"愿我们的爱情如这些美好的回忆一样，永远闪闪发光，直到永远..."</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.memories-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #4a5bb8 0%, #5d4e75 25%, #764ba2 50%, #e91e63 75%, #f093fb 100%);
  position: relative;
  overflow-x: hidden;
}

.memories-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 1s ease-out;
}

.memories-title {
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  background: linear-gradient(45deg, #fff, #ffcdd2, #f8bbd9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
  to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,107,139,0.5); }
}

.memories-subtitle {
  font-size: 1.8rem;
  color: #ffcdd2;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: fadeInUp 1s ease-out 0.5s backwards;
}

.love-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
  padding: 3rem;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1);
  animation: zoomIn 1s ease-out;
  transform-style: preserve-3d;
  border: 2px solid rgba(255,255,255,0.2);
}

.counter-item {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  max-width: 500px;
  transform-style: preserve-3d;
  border: 1px solid rgba(255,255,255,0.3);
}

.counter-item:hover {
  transform: translateY(-10px) rotateX(5deg) scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  background: linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1));
}

.counter-number {
  display: block;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffeb3b;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 0.5rem;
}

.counter-detail {
  display: block;
  font-size: 1.4rem;
  color: #fff9c4;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.counter-label {
  font-size: 1.2rem;
  color: #ffcdd2;
  font-weight: 500;
}

.memories-gallery {
  margin-bottom: 5rem;
  perspective: 2000px;
}

.memory-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 3rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.2);
  margin-bottom: 3rem;
  text-align: center;
  color: #fff;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}

.memory-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.memory-card:hover::before {
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
}

.memory-card:hover {
  transform: translateY(-15px) rotateY(8deg) rotateX(5deg) scale(1.02);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
  background: linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
}

.memory-emoji {
  font-size: 5rem;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.memory-title {
  font-size: 2.5rem;
  color: #ffeb3b;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-weight: bold;
}

.memory-date {
  font-size: 1.2rem;
  color: #ffcdd2;
  margin-bottom: 2rem;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.memory-text {
  font-size: 1.3rem;
  line-height: 1.8;
  color: #f5f5f5;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.timeline {
  position: relative;
  padding: 3rem 0;
  margin-bottom: 5rem;
}

.timeline-title {
  text-align: center;
  font-size: 3rem;
  color: #ffeb3b;
  margin-bottom: 3rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  font-weight: bold;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(to bottom, #ffeb3b, #ff4081, #e91e63, #ad1457);
  border-radius: 3px;
  transform: translateX(-50%);
  box-shadow: 0 0 20px rgba(255,235,59,0.8), inset 0 0 10px rgba(255,255,255,0.3);
  animation: timelineGlow 3s ease-in-out infinite alternate;
}

@keyframes timelineGlow {
  from { box-shadow: 0 0 20px rgba(255,235,59,0.8); }
  to { box-shadow: 0 0 30px rgba(255,235,59,1), 0 0 40px rgba(255,64,129,0.8); }
}

.timeline-item {
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
  backdrop-filter: blur(15px);
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  position: relative;
  width: calc(50% - 3rem);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-style: preserve-3d;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.2);
}

.timeline-item:hover {
  transform: translateX(15px) rotateY(-8deg) scale(1.03);
  box-shadow: 0 25px 50px rgba(0,0,0,0.4);
  background: linear-gradient(145deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3));
}

.timeline-item.right:hover {
  transform: translateX(-15px) rotateY(8deg) scale(1.03);
}

.timeline-item.left {
  left: 0;
  text-align: right;
  transform-origin: right center;
}

.timeline-item.right {
  left: calc(50% + 3rem);
  text-align: left;
  transform-origin: left center;
}

.timeline-dot {
  position: absolute;
  top: 30px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ffeb3b, #ff4081);
  border: 4px solid rgba(255,255,255,0.9);
  z-index: 10;
  box-shadow: 0 0 20px 3px rgba(255,235,59,0.8), 0 0 0 8px rgba(255,255,255,0.3);
  transition: all 0.4s ease;
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); box-shadow: 0 0 25px 5px rgba(255,235,59,1); }
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.4);
  box-shadow: 0 0 30px 5px rgba(255,235,59,1);
}

.timeline-item.left .timeline-dot {
  right: -37px;
}

.timeline-item.right .timeline-dot {
  left: -37px;
}

.timeline-content h4 {
  font-size: 1.8rem;
  color: #ffeb3b;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.timeline-date {
  font-weight: bold;
  color: #ffcdd2;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.timeline-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #f0f0f0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.love-message {
  margin-top: 5rem;
  padding: 4rem;
  background: linear-gradient(145deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3));
  backdrop-filter: blur(20px);
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.1);
  color: #fff;
  animation: fadeIn 2s ease-out;
  transform-style: preserve-3d;
  border: 2px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
}

.love-message::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff6b8b, #ff4081, #e91e63, #ad1457);
  border-radius: 30px;
  z-index: -1;
  animation: borderGlow 3s ease-in-out infinite alternate;
}

@keyframes borderGlow {
  from { opacity: 0.5; }
  to { opacity: 1; }
}

.love-message h2 {
  font-size: 3.2rem;
  color: #ffeb3b;
  margin-bottom: 2.5rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  transform: translateZ(20px);
  font-weight: bold;
}

.love-quotes p {
  font-size: 1.4rem;
  line-height: 2;
  color: #f5f5f5;
  margin-bottom: 1.5rem;
  font-style: italic;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  transform: translateZ(10px);
}

.signature {
  font-size: 1.6rem !important;
  color: #ffeb3b !important;
  font-weight: bold !important;
  margin-top: 2rem !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5) !important;
}

/* 动画关键帧 */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .memories-container {
    max-width: 100%;
    padding: 1.5rem;
  }
  
  .memories-title {
    font-size: 2.8rem;
  }
  
  .timeline-item {
    width: calc(50% - 2rem);
  }
  
  .timeline-item.right {
    left: calc(50% + 2rem);
  }
}

@media (max-width: 768px) {
  .memories-container {
    padding: 1rem;
  }
  
  .memories-title {
    font-size: 2.2rem;
  }
  
  .memories-subtitle {
    font-size: 1.4rem;
  }
  
  .love-counter {
    padding: 2rem;
    gap: 1.5rem;
  }
  
  .counter-number {
    font-size: 1.8rem;
  }
  
  .counter-detail {
    font-size: 1.2rem;
  }
  
  .memory-card {
    padding: 2rem;
  }
  
  .memory-emoji {
    font-size: 4rem;
  }
  
  .memory-title {
    font-size: 2rem;
  }
  
  .timeline {
    padding: 2rem 0;
  }
  
  .timeline-title {
    font-size: 2.2rem;
  }
  
  .timeline::before {
    left: 30px;
    transform: none;
  }
  
  .timeline-item {
    width: calc(100% - 4rem);
    left: 4rem !important;
    text-align: left !important;
  }
  
  .timeline-item .timeline-dot {
    left: -37px !important;
    right: auto !important;
  }
  
  .love-message {
    padding: 2.5rem;
  }
  
  .love-message h2 {
    font-size: 2.5rem;
  }
  
  .love-quotes p {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .memories-title {
    font-size: 1.8rem;
  }
  
  .memories-subtitle {
    font-size: 1.2rem;
  }
  
  .counter-number {
    font-size: 1.5rem;
  }
  
  .counter-detail {
    font-size: 1rem;
  }
  
  .memory-title {
    font-size: 1.6rem;
  }
  
  .timeline-title {
    font-size: 1.8rem;
  }
  
  .love-message h2 {
    font-size: 2rem;
  }
  
  .love-quotes p {
    font-size: 1.1rem;
  }
}
</style>