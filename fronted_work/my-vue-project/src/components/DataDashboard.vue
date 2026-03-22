<template>
  <div class="dashboard-container">
    <!-- 全屏大屏布局 -->
    <div class="dashboard-grid">
      <!-- 顶部状态栏 -->
      <div class="status-bar">
        <div class="status-item">
          <div class="status-icon">🌡️</div>
          <div class="status-info">
            <div class="status-value">{{ currentTemperature }}°C</div>
            <div class="status-label">当前温度</div>
          </div>
        </div>
        <div class="status-item">
          <div class="status-icon">💧</div>
          <div class="status-info">
            <div class="status-value">{{ currentHumidity }}%</div>
            <div class="status-label">当前湿度</div>
          </div>
        </div>
        <div class="status-item">
          <div class="status-icon">🌋</div>
          <div class="status-info">
            <div class="status-value">{{ earthquakeStatus }}</div>
            <div class="status-label">地震状态</div>
          </div>
        </div>

        <div class="status-item">
          <div class="status-icon">🕒</div>
          <div class="status-info">
            <div class="status-value">{{ currentTime }}</div>
            <div class="status-label">当前时间</div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="chart-area">
        <!-- 第一行：温度、湿度、地震饼图 -->
        <div class="chart-row">
          <div class="dashboard-chart-card">
            <div class="chart-title">温度变化趋势</div>
            <div id="dashboard-temperature-chart" class="dashboard-chart"></div>
          </div>
          <div class="dashboard-chart-card">
            <div class="chart-title">湿度变化趋势</div>
            <div id="dashboard-humidity-chart" class="dashboard-chart"></div>
          </div>
          <div class="dashboard-chart-card">
            <div class="chart-title">地震状态分布</div>
            <div id="dashboard-earthquake-pie" class="dashboard-chart"></div>
          </div>
        </div>

        <!-- 第二行：地震活动、加速度、倾斜角度 -->
        <div class="chart-row">
          <div class="dashboard-chart-card">
            <div class="chart-title">地震活动统计</div>
            <div id="dashboard-earthquake-chart" class="dashboard-chart"></div>
          </div>
          <div class="dashboard-chart-card">
            <div class="chart-title">加速度变化趋势</div>
            <div id="dashboard-acceleration-chart" class="dashboard-chart"></div>
          </div>
          <div class="dashboard-chart-card">
            <div class="chart-title">倾斜角度变化趋势</div>
            <div id="dashboard-tilt-chart" class="dashboard-chart"></div>
          </div>
        </div>
      </div>

      <!-- 控制栏 -->
      <div class="dashboard-controls">
        <el-button type="primary" @click="refreshData" :loading="isRefreshing">
          <el-icon><Refresh /></el-icon>
          刷新数据
        </el-button>
        <el-button @click="toggleFullscreen">
          <el-icon><FullScreen /></el-icon>
          {{ isFullscreen ? '退出全屏' : '全屏显示' }}
        </el-button>
        <el-select v-model="refreshInterval" @change="handleRefreshIntervalChange" style="width: 120px;">
          <el-option label="关闭" value="0"></el-option>
          <el-option label="10秒" value="10"></el-option>
          <el-option label="30秒" value="30"></el-option>
          <el-option label="1分钟" value="60"></el-option>
        </el-select>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="dashboard-loading">
      <el-skeleton :rows="10" animated />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import { Refresh, FullScreen } from '@element-plus/icons-vue'

export default {
  name: 'DataDashboard',
  components: {
    Refresh,
    FullScreen
  },
  data() {
    return {
      baseApiUrl: 'http://localhost:8080',
      loading: false,
      isRefreshing: false,
      refreshInterval: '30',
      refreshTimer: null,
      isFullscreen: false,
      
      // 实时数据
      currentTemperature: 0,
      currentHumidity: 0,
      earthquakeStatus: '正常',
      onlineDevices: 0,
      currentTime: '',
      
      // 图表实例
      temperatureChart: null,
      humidityChart: null,
      earthquakePieChart: null,
      earthquakeChart: null,
      accelerationChart: null,
      tiltChart: null,
      
      // 原始数据
      rawData: []
    }
  },
  mounted() {
    this.initCharts()
    this.loadChartData()
    this.startAutoRefresh()
    this.updateCurrentTime()
    setInterval(this.updateCurrentTime, 1000)
    
    // 监听全屏变化
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
  },
  beforeUnmount() {
    this.stopAutoRefresh()
    // 销毁图表实例
    if (this.temperatureChart) this.temperatureChart.dispose()
    if (this.humidityChart) this.humidityChart.dispose()
    if (this.earthquakePieChart) this.earthquakePieChart.dispose()
    if (this.earthquakeChart) this.earthquakeChart.dispose()
    if (this.accelerationChart) this.accelerationChart.dispose()
    if (this.tiltChart) this.tiltChart.dispose()
    
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
  },
  computed: {
    // 计算属性：处理后的图表数据（复用DataVisualization的逻辑）
    chartData() {
      if (!this.rawData.length) return {}
      
      const sortedData = [...this.rawData].sort((a, b) => 
        new Date(a.collectTime) - new Date(b.collectTime)
      )
      
      // 固定使用24小时数据
      const now = new Date()
      const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const filteredData = sortedData.filter(item => new Date(item.collectTime) >= startTime)
      
      return {
        temperature: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.temperatureC || 0)
        })),
        humidity: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.humidityRh || 0)
        })),
        acceleration: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.accelMagnitude || 0)
        })),
        tilt: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.tiltAngleDeg || 0)
        })),
        earthquake: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.earthquakeLevel || 0)
        })),
        earthquakeStatus: this.calculateEarthquakeStatusDistribution(filteredData)
      }
    }
  },
  methods: {
    // 初始化所有图表
    initCharts() {
      this.temperatureChart = echarts.init(document.getElementById('dashboard-temperature-chart'))
      this.humidityChart = echarts.init(document.getElementById('dashboard-humidity-chart'))
      this.earthquakePieChart = echarts.init(document.getElementById('dashboard-earthquake-pie'))
      this.earthquakeChart = echarts.init(document.getElementById('dashboard-earthquake-chart'))
      this.accelerationChart = echarts.init(document.getElementById('dashboard-acceleration-chart'))
      this.tiltChart = echarts.init(document.getElementById('dashboard-tilt-chart'))
      
      // 窗口调整时重绘图表
      window.addEventListener('resize', this.handleResize)
    },

    // 处理窗口大小变化
    handleResize() {
      this.temperatureChart?.resize()
      this.humidityChart?.resize()
      this.earthquakePieChart?.resize()
      this.earthquakeChart?.resize()
      this.accelerationChart?.resize()
      this.tiltChart?.resize()
    },

    // 加载图表数据（复用DataVisualization的逻辑）
    async loadChartData() {
      this.loading = true
      try {
        const response = await axios.get(`${this.baseApiUrl}/sensor/data`, {
          params: {
            page: 1,
            pageSize: 100
          }
        })
        
        if (response.data?.success) {
          const responseData = response.data.data
          const rawData = responseData.records || []
          
          this.rawData = rawData.map(item => ({
            id: item.id,
            collectTime: item.collect_time,
            temperatureC: item.temperature_c,
            humidityRh: item.humidity_rh,
            earthquakeStatus: item.earthquake_status,
            earthquakeLevel: item.earthquake_level,
            accelMagnitude: item.accel_magnitude,
            vibrationDurationMs: item.vibration_duration_ms,
            tiltAngleDeg: item.tilt_angle_deg,
            lineDetected: item.line_detected,
            isLandslideAlert: item.is_landslide_alert,
            personDetected: item.person_detected,
            createTime: item.create_time
          }))
          
          // 更新当前状态
          if (this.rawData.length > 0) {
            const latest = this.rawData[this.rawData.length - 1]
            this.currentTemperature = latest.temperatureC || 0
            this.currentHumidity = latest.humidityRh || 0
            this.earthquakeStatus = latest.earthquakeStatus || '正常'
          }
          
          this.onlineDevices = Math.min(5, Math.max(1, Math.floor(this.rawData.length / 20)))
          this.updateAllCharts()
        } else {
          throw new Error(response.data?.message || '数据加载失败')
        }
      } catch (error) {
        console.error('加载图表数据失败:', error)
        this.generateMockData()
        this.updateAllCharts()
      } finally {
        this.loading = false
        this.isRefreshing = false
      }
    },

    // 计算地震状态分布
    calculateEarthquakeStatusDistribution(data) {
      const statusCount = {}
      data.forEach(item => {
        const status = item.earthquakeStatus || '正常'
        statusCount[status] = (statusCount[status] || 0) + 1
      })
      
      return Object.entries(statusCount).map(([name, value]) => ({
        name,
        value
      }))
    },

    // 时间格式化
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`
    },

    padZero(num) {
      return num < 10 ? `0${num}` : num
    },

    // 更新当前时间
    updateCurrentTime() {
      const now = new Date()
      this.currentTime = `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}:${this.padZero(now.getSeconds())}`
    },

    // 生成模拟数据
    generateMockData() {
      const mockData = []
      const now = new Date()
      const statusOptions = ['正常', '微震', '小震', '中震']
      
      for (let i = 0; i < 50; i++) {
        const time = new Date(now.getTime() - (50 - i) * 10 * 60 * 1000)
        const statusIndex = Math.floor(Math.random() * statusOptions.length)
        const earthquakeStatus = statusOptions[statusIndex]
        
        mockData.push({
          id: i + 1,
          collectTime: time.toISOString(),
          temperatureC: 20 + Math.floor(Math.random() * 10),
          humidityRh: 40 + Math.floor(Math.random() * 30),
          earthquakeStatus: earthquakeStatus,
          earthquakeLevel: statusIndex,
          accelMagnitude: 0.1 + Math.random() * 0.5,
          tiltAngleDeg: Math.random() * 10,
          vibrationDurationMs: Math.floor(Math.random() * 100),
          lineDetected: Math.random() > 0.5 ? 1 : 0,
          isLandslideAlert: Math.random() > 0.9 ? 1 : 0,
          personDetected: Math.random() > 0.8 ? 1 : 0
        })
      }
      
      this.rawData = mockData
      this.onlineDevices = 3
      this.currentTemperature = mockData[mockData.length - 1].temperatureC
      this.currentHumidity = mockData[mockData.length - 1].humidityRh
      this.earthquakeStatus = mockData[mockData.length - 1].earthquakeStatus
    },

    // 更新所有图表（复用DataVisualization的图表配置）
    updateAllCharts() {
      this.updateTemperatureChart()
      this.updateHumidityChart()
      this.updateEarthquakePieChart()
      this.updateEarthquakeChart()
      this.updateAccelerationChart()
      this.updateTiltChart()
    },

    // 各个图表的更新方法（复用DataVisualization的配置）
    updateTemperatureChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}°C'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData.temperature.map(item => item.time)
        },
        yAxis: {
          type: 'value',
          name: '温度(°C)'
        },
        series: [{
          name: '温度',
          type: 'line',
          smooth: true,
          lineStyle: { width: 4 },
          itemStyle: { color: '#ff7f50' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 127, 80, 0.3)' },
              { offset: 1, color: 'rgba(255, 127, 80, 0.1)' }
            ])
          },
          data: this.chartData.temperature.map(item => item.value)
        }]
      }
      this.temperatureChart.setOption(option)
    },

    updateHumidityChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData.humidity.map(item => item.time)
        },
        yAxis: {
          type: 'value',
          name: '湿度(%)'
        },
        series: [{
          name: '湿度',
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#4876ff' },
              { offset: 1, color: '#83a5ff' }
            ])
          },
          data: this.chartData.humidity.map(item => item.value)
        }]
      }
      this.humidityChart.setOption(option)
    },

    updateEarthquakePieChart() {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: '#333'
          }
        },
        series: [{
          name: '地震状态分布',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { 
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          data: this.chartData.earthquakeStatus
        }]
      }
      this.earthquakePieChart.setOption(option)
    },

    updateEarthquakeChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}级'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData.earthquake.map(item => item.time)
        },
        yAxis: {
          type: 'value',
          name: '地震等级'
        },
        series: [{
          name: '地震活动',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#ff4d4f'
          },
          itemStyle: {
            color: '#ff4d4f'
          },
          data: this.chartData.earthquake.map(item => item.value)
        }]
      }
      this.earthquakeChart.setOption(option)
    },

    updateAccelerationChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}g'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData.acceleration.map(item => item.time)
        },
        yAxis: {
          type: 'value',
          name: '加速度(g)'
        },
        series: [{
          name: '加速度',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#722ed1'
          },
          itemStyle: {
            color: '#722ed1'
          },
          data: this.chartData.acceleration.map(item => item.value)
        }]
      }
      this.accelerationChart.setOption(option)
    },

    updateTiltChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}°'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData.tilt.map(item => item.time)
        },
        yAxis: {
          type: 'value',
          name: '倾斜角度(°)'
        },
        series: [{
          name: '倾斜角度',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#52c41a'
          },
          itemStyle: {
            color: '#52c41a'
          },
          data: this.chartData.tilt.map(item => item.value)
        }]
      }
      this.tiltChart.setOption(option)
    },

    // 刷新数据
    refreshData() {
      this.isRefreshing = true
      this.loadChartData()
    },

    // 全屏切换
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.log(`全屏请求错误: ${err.message}`)
        })
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    },

    // 处理全屏变化
    handleFullscreenChange() {
      this.isFullscreen = !!document.fullscreenElement
      // 全屏变化时重新调整图表大小
      setTimeout(() => {
        this.handleResize()
      }, 300)
    },

    // 刷新间隔改变
    handleRefreshIntervalChange() {
      this.stopAutoRefresh()
      if (this.refreshInterval !== '0') {
        this.startAutoRefresh()
      }
    },

    // 开始自动刷新
    startAutoRefresh() {
      if (this.refreshInterval !== '0') {
        this.refreshTimer = setInterval(() => {
          this.loadChartData()
        }, parseInt(this.refreshInterval) * 1000)
      }
    },

    // 停止自动刷新
    stopAutoRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f7ff 100%);
  color: #333;
  overflow: hidden;
  position: relative;
}

.dashboard-grid {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

/* 状态栏 */
.status-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  height: 100px;
}

.status-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e6f7ff;
  transition: all 0.3s ease;
  width: 100%;
  min-width: 0;
}

.status-item:hover {
  background: #e6f7ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(22, 93, 255, 0.15);
}

.status-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #e6f7ff;
  flex-shrink: 0;
}
.status-info {
  flex: 1;
  min-width: 0; /* 允许文本截断 */
}

.status-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-label {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图表区域 */
.chart-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  flex: 1;
}

.dashboard-chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e6f7ff;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.dashboard-chart-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(22, 93, 255, 0.15);
}

.chart-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.dashboard-chart {
  flex: 1;
  min-height: 0;
}


/* 控制栏 */
.dashboard-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e6f7ff;
}

/* 加载状态 */
.dashboard-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(240, 247, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .status-bar {
    grid-template-columns: repeat(3, 1fr);
    height: auto;
  }
  
  .chart-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .status-bar {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-row {
    grid-template-columns: 1fr;
  }
  
  .dashboard-grid {
    padding: 10px;
    gap: 10px;
  }
  
  .status-item {
    padding: 15px;
  }
  
  .status-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }
  
  .status-value {
    font-size: 1.5rem;
  }
}
</style>