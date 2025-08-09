<template>
  <div class="investment-home">
    <div class="container">
      <div class="header">
        <h1>📊 投资策略分析系统</h1>
        <p>伺机而动不急不躁（正）投资策略总结</p>
      </div>

      <div class="weeks-grid">
        <div 
          v-for="week in weeks" 
          :key="week.id"
          class="week-card"
          @click="navigateToWeek(week.id)"
        >
          <div class="week-header">
            <div class="week-icon">📅</div>
            <div class="week-info">
              <h3>{{ week.title }}</h3>
              <p class="week-date">{{ week.dateRange }}</p>
            </div>
          </div>
          
          <div class="week-preview">
            <p>本周基金讨论要点：{{ week.fundDiscussion }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { investmentService } from '@/services/investmentService'

const router = useRouter()
const weeks = ref<any[]>([])

const navigateToWeek = (weekId: string) => {
  router.push(`/investment/week/${weekId}`)
}

onMounted(async () => {
  weeks.value = await investmentService.getWeeks()
})
</script>

<style scoped>
.investment-home {
  color: #ffffff;
  padding: 20px 0;
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.header {
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  margin-bottom: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.header p {
  font-size: 1.2em;
  opacity: 0.9;
}

.weeks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
  padding: 0 10px;
}

.week-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.week-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
  border-color: rgba(0, 212, 255, 0.5);
}

.week-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.week-icon {
  font-size: 2.5em;
  margin-right: 15px;
}

.week-info h3 {
  color: #00d4ff;
  font-size: 1.4em;
  margin-bottom: 5px;
}

.week-date {
  color: #ccc;
  font-size: 0.9em;
}


.week-preview {
  color: #ddd;
  font-size: 0.9em;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .investment-home {
    padding: 10px 0;
  }
  
  .container {
    padding: 0 10px;
  }
  
  .header {
    padding: 30px 15px;
    margin-bottom: 20px;
  }
  
  .header h1 {
    font-size: 1.8em;
    margin-bottom: 8px;
  }
  
  .header p {
    font-size: 1em;
  }
  
  .weeks-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 20px;
    padding: 0;
  }
  
  .week-card {
    padding: 20px;
    margin: 0 5px;
  }
  
  .week-header {
    margin-bottom: 15px;
  }
  
  .week-icon {
    font-size: 2em;
    margin-right: 12px;
  }
  
  .week-info h3 {
    font-size: 1.2em;
  }
  
  .week-preview {
    font-size: 0.85em;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.6em;
  }
  
  .header p {
    font-size: 0.9em;
  }
  
  .week-card {
    padding: 15px;
  }
  
  .week-icon {
    font-size: 1.8em;
    margin-right: 10px;
  }
  
  .week-info h3 {
    font-size: 1.1em;
  }
  
  .week-preview {
    font-size: 0.8em;
  }
}
</style>