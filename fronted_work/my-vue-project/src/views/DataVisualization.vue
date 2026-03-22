<template>
  <div class="data-visualization-container">
    <!-- 顶部装饰条 -->
    <div class="top-decoration"></div>
    
    <h2 class="page-title">数据可视化展示</h2>
    
    <!-- 数据概览卡片 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon temperature">🌡️</div>
        <div class="stat-info">
          <div class="stat-value">{{ currentTemperature }}°C</div>
          <div class="stat-label">当前温度</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon humidity">💧</div>
        <div class="stat-info">
          <div class="stat-value">{{ currentHumidity }}%</div>
          <div class="stat-label">当前湿度</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon earthquake">🌋</div>
        <div class="stat-info">
          <div class="stat-value">{{ earthquakeStatus }}</div>
          <div class="stat-label">地震状态</div>
        </div>
      </div>
    </div>

    <!-- 简单的空一行 -->
    <div style="height: 40px;"></div>

    <!-- 图表控制栏 -->
    <div class="chart-controls">
      <div style="height: 40px;"></div>
      <div class="control-group">
        <label>时间范围:</label>
        <el-select v-model="timeRange" @change="handleTimeRangeChange" style="width: 120px;">
          <el-option label="1小时" value="1h"></el-option>
          <el-option label="6小时" value="6h"></el-option>
          <el-option label="24小时" value="24h"></el-option>
          <el-option label="7天" value="7d"></el-option>
        </el-select>
      </div>
      <div class="control-group">
        <label>刷新间隔:</label>
        <el-select v-model="refreshInterval" @change="handleRefreshIntervalChange" style="width: 120px;">
          <el-option label="关闭" value="0"></el-option>
          <el-option label="5秒" value="5"></el-option>
          <el-option label="10秒" value="10"></el-option>
          <el-option label="30秒" value="30"></el-option>
          <el-option label="1分钟" value="60"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="refreshData" :loading="isRefreshing">
        <el-icon><Refresh /></el-icon>
        刷新数据
      </el-button>
    </div>

    <!-- 图表网格 -->
    <div class="charts-grid">
      <!-- 温度趋势图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>温度变化趋势</h3>
          <div class="chart-actions">
            <button class="chart-btn" @click="refreshTemperatureChart">刷新</button>
          </div>
        </div>
        <div id="temperature-chart" class="chart-item"></div>
      </div>
      
      <!-- 湿度趋势图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>湿度变化趋势</h3>
          <div class="chart-actions">
            <button class="chart-btn" @click="refreshHumidityChart">刷新</button>
          </div>
        </div>
        <div id="humidity-chart" class="chart-item"></div>
      </div>
      
      <!-- 地震状态分布 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>地震状态分布</h3>
          <div class="chart-actions">
            <button class="chart-btn" @click="refreshEarthquakePie">详情</button>
          </div>
        </div>
        <div id="earthquake-pie" class="chart-item"></div>
      </div>
      
      <!-- 地震活动统计 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>地震活动统计</h3>
          <div class="chart-actions">
            <button class="chart-btn" @click="refreshEarthquakeChart">导出</button>
          </div>
        </div>
        <div id="earthquake-chart" class="chart-item"></div>
      </div>

      <!-- 加速度趋势图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>加速度变化趋势</h3>
          <div class="chart-actions">
            <button class="chart-btn" @click="refreshAccelerationChart">刷新</button>
          </div>
        </div>
        <div id="acceleration-chart" class="chart-item"></div>
      </div>

      <!-- 倾斜角度趋势图 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>倾斜角度变化趋势</h3>
          <div class="chart-actions">
            <button class="chart-btn" @click="refreshTiltChart">刷新</button>
          </div>
        </div>
        <div id="tilt-chart" class="chart-item"></div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import { Refresh } from '@element-plus/icons-vue'

export default {
  name: 'DataVisualization',
  components: {
    Refresh
  },
  data() {
    return {
      baseApiUrl: 'http://localhost:8080',
      loading: false,
      isRefreshing: false,
      timeRange: '24h',
      refreshInterval: '30',
      refreshTimer: null,
      
      // 实时数据
      currentTemperature: 0,
      currentHumidity: 0,
      earthquakeStatus: '正常',
      onlineDevices: 0,
      
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
  },
  computed: {
    // 计算属性：处理后的图表数据
    chartData() {
      if (!this.rawData.length) return {}
      
      // 按时间排序
      const sortedData = [...this.rawData].sort((a, b) => 
        new Date(a.collectTime) - new Date(b.collectTime)
      )
      
      // 根据时间范围过滤数据
      const filteredData = this.filterDataByTimeRange(sortedData)
      
      return {
        // 温度数据
        temperature: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.temperatureC || 0)
        })),
        
        // 湿度数据
        humidity: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.humidityRh || 0)
        })),
        
        // 加速度数据
        acceleration: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.accelMagnitude || 0)
        })),
        
        // 倾斜角度数据
        tilt: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.tiltAngleDeg || 0)
        })),
        
        // 地震活动数据（使用地震等级）
        earthquake: filteredData.map(item => ({
          time: this.formatTime(item.collectTime),
          value: Number(item.earthquakeLevel || 0)
        })),
        
        // 地震状态分布
        earthquakeStatus: this.calculateEarthquakeStatusDistribution(filteredData)
      }
    }
  },
  methods: {
    // 初始化所有图表
    initCharts() {
      this.temperatureChart = echarts.init(document.getElementById('temperature-chart'))
      this.humidityChart = echarts.init(document.getElementById('humidity-chart'))
      this.earthquakePieChart = echarts.init(document.getElementById('earthquake-pie'))
      this.earthquakeChart = echarts.init(document.getElementById('earthquake-chart'))
      this.accelerationChart = echarts.init(document.getElementById('acceleration-chart'))
      this.tiltChart = echarts.init(document.getElementById('tilt-chart'))
      
      // 窗口调整时重绘图表
      window.addEventListener('resize', () => {
        this.temperatureChart?.resize()
        this.humidityChart?.resize()
        this.earthquakePieChart?.resize()
        this.earthquakeChart?.resize()
        this.accelerationChart?.resize()
        this.tiltChart?.resize()
      })
    },

    // 加载图表数据
    async loadChartData() {
      this.loading = true
      try {
        // 使用现有的数据接口
        const response = await axios.get(`${this.baseApiUrl}/sensor/data`, {
          params: {
            page: 1,
            pageSize: 100 // 获取较多的数据用于图表
          }
        })
        
        if (response.data?.success) {
          const responseData = response.data.data
          const rawData = responseData.records || []
          
          // 直接使用后端返回的数据，字段名已经匹配
          this.rawData = rawData.map(item => ({
            id: item.id,
            collectTime: item.collect_time, // 注意：后端返回的是蛇形命名
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
          
          // 更新在线设备数量（模拟）
          this.onlineDevices = Math.min(5, Math.max(1, Math.floor(this.rawData.length / 20)))
          
          // 更新图表
          this.updateAllCharts()
        } else {
          throw new Error(response.data?.message || '数据加载失败')
        }
      } catch (error) {
        console.error('加载图表数据失败:', error)
        // 使用模拟数据作为备选
        this.generateMockData()
        this.updateAllCharts()
        this.$message.warning('使用模拟数据展示，请检查后端连接')
      } finally {
        this.loading = false
        this.isRefreshing = false
      }
    },

    // 根据时间范围过滤数据
    filterDataByTimeRange(data) {
      const now = new Date()
      let startTime
      
      switch (this.timeRange) {
        case '1h':
          startTime = new Date(now.getTime() - 60 * 60 * 1000)
          break
        case '6h':
          startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000)
          break
        case '24h':
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
        case '7d':
          startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        default:
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      }
      
      return data.filter(item => new Date(item.collectTime) >= startTime)
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

    // 生成模拟数据（备用）
    generateMockData() {
      const mockData = []
      const now = new Date()
      const statusOptions = ['正常', '微震', '小震', '中震']
      
      for (let i = 0; i < 50; i++) {
        const time = new Date(now.getTime() - (50 - i) * 10 * 60 * 1000) // 每10分钟一个数据点
        const statusIndex = Math.floor(Math.random() * statusOptions.length)
        const earthquakeStatus = statusOptions[statusIndex]
        
        mockData.push({
          id: i + 1,
          collectTime: time.toISOString(),
          temperatureC: 20 + Math.floor(Math.random() * 10), // 20-30°C
          humidityRh: 40 + Math.floor(Math.random() * 30), // 40-70%
          earthquakeStatus: earthquakeStatus,
          earthquakeLevel: statusIndex,
          accelMagnitude: 0.1 + Math.random() * 0.5, // 0.1-0.6g
          tiltAngleDeg: Math.random() * 10, // 0-10度
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

    // 更新所有图表
    updateAllCharts() {
      this.updateTemperatureChart()
      this.updateHumidityChart()
      this.updateEarthquakePieChart()
      this.updateEarthquakeChart()
      this.updateAccelerationChart()
      this.updateTiltChart()
    },

    // 更新温度图表
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
          lineStyle: {
            width: 4
          },
          itemStyle: {
            color: '#ff7f50'
          },
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

    // 更新湿度图表
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

    // 更新地震状态饼图
    updateEarthquakePieChart() {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
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

    // 更新地震图表
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

    // 更新加速度图表
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

    // 更新倾斜角度图表
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

    // 刷新单个图表
    refreshTemperatureChart() {
      this.updateTemperatureChart()
    },

    refreshHumidityChart() {
      this.updateHumidityChart()
    },

    refreshEarthquakePie() {
      this.updateEarthquakePieChart()
    },

    refreshEarthquakeChart() {
      this.updateEarthquakeChart()
    },

    refreshAccelerationChart() {
      this.updateAccelerationChart()
    },

    refreshTiltChart() {
      this.updateTiltChart()
    },

    // 时间范围改变
    handleTimeRangeChange() {
      this.updateAllCharts()
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

.data-visualization-container {
  min-height: calc(100vh - 40px);
  padding: var(--spacing-lg) var(--spacing-md);
  background: linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%);
  max-width: 1400px;
  margin: 0 auto;
}

.top-decoration {
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
  margin-bottom: var(--spacing-lg);
}

.page-title {
  text-align: center;
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  position: relative;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin-bottom: 0.5em;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
}

/* 图表控制栏 */
.chart-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.control-group {
  display: flex;
  align-items: left;
  gap: 8px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.control-group label {
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

/* 数据概览卡片 */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stat-card {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all 0.3s ease;
  border-left: 4px solid var(--primary-color);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.stat-icon.temperature {
  background: rgba(255, 127, 80, 0.1);
}

.stat-icon.humidity {
  background: rgba(72, 118, 255, 0.1);
}

.stat-icon.earthquake {
  background: rgba(248, 113, 113, 0.1);
}

.stat-icon.device {
  background: rgba(16, 185, 129, 0.1);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* 图表网格布局 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--spacing-lg);
}

.chart-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  overflow: hidden;
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid #e1e5e9;
  position: relative;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.chart-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.chart-actions {
  display: flex;
  gap: 8px;
}

.chart-btn {
  background: var(--primary-color);
  color: rgb(21, 19, 19);
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chart-btn:hover {
  background: #0e4fd8;
  transform: translateY(-1px);
}

.chart-item {
  height: 300px;
  padding: 10px;
}

/* 加载状态 */
.loading-container {
  background: white;
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-base);
  margin-top: var(--spacing-lg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    padding: var(--spacing-md);
  }
  
  .stat-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }

  .chart-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .control-group {
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }
  
  .chart-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

/* CSS变量 */
:root {
  --primary-color: #165DFF;
  --accent-color: #36CFFB;
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 48px;
  --border-radius: 12px;
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 24px rgba(22, 93, 255, 0.15);
}
</style>