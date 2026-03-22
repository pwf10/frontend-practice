// src/services/sensorDataService.js
import axios from 'axios';

const baseApiUrl = 'http://localhost:8080';

class SensorDataService {
  constructor() {
    this.sensorData = [];          // 存储传感器数据
    this.listeners = [];           // 存储数据变化监听器
    this.isLoading = false;        // 加载状态
  }

  // 获取传感器数据
  async fetchSensorData(params = {}) {
    // 防止重复请求
    if (this.isLoading) {
      return this.sensorData;
    }

    this.isLoading = true;
    
    try {
      const response = await axios.get(`${baseApiUrl}/sensor/data`, {
        params: {
          page: params.page || 1,
          pageSize: params.pageSize || 100 // 图表需要更多数据点
        }
      });
      
      if (response.data && response.data.success) {
        // 转换数据格式，统一字段命名
        const data = response.data.data.map(item => ({
          id: item.id,
          collectTime: item.collectTime,
          temperature: item.temperatureC,
          humidity: item.humidityRh,
          device: `ESP32_${item.id % 5 + 1}`,
          earthquakeStatus: item.earthquakeStatus,
          earthquakeLevel: item.earthquakeLevel,
          accelMagnitude: item.accelMagnitude,
          vibrationDuration: item.vibrationDurationMs,
          tiltAngle: item.tiltAngleDeg
        }));
        
        this.sensorData = data;
        this.notifyListeners();  // 通知所有监听器数据已更新
        return data;
      } else {
        throw new Error(response.data.message || '数据格式错误');
      }
    } catch (error) {
      console.error('获取传感器数据失败:', error);
      
      // 如果API调用失败，生成模拟数据作为fallback
      if (this.sensorData.length === 0) {
        this.generateMockData();
      }
      
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // 生成模拟数据（备用）
  generateMockData() {
    const mockData = [];
    const statusOptions = ['无震', '微震', '小震', '中震'];
    
    // 生成50条模拟数据
    for (let i = 0; i < 50; i++) {
      const statusIndex = Math.floor(Math.random() * statusOptions.length);
      const earthquakeStatus = statusOptions[statusIndex];
      
      mockData.push({
        id: i + 1,
        collectTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        temperature: (20 + Math.random() * 15).toFixed(1),
        humidity: (40 + Math.random() * 40).toFixed(1),
        device: `ESP32_${Math.floor(Math.random() * 5) + 1}`,
        earthquakeStatus: earthquakeStatus,
        earthquakeLevel: statusIndex,
        accelMagnitude: parseFloat((0.5 + Math.random() * 2).toFixed(2)),
        vibrationDuration: Math.floor(Math.random() * 100),
        tiltAngle: parseFloat((Math.random() * 15).toFixed(1))
      });
    }
    
    this.sensorData = mockData;
    this.notifyListeners();
  }

  // 添加数据变化监听器
  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
      
      // 立即用当前数据调用一次监听器
      if (this.sensorData.length > 0) {
        listener(this.sensorData);
      }
    }
  }

  // 移除监听器
  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // 通知所有监听器数据已更新
  notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.sensorData);
      } catch (error) {
        console.error('监听器执行错误:', error);
      }
    });
  }

  // 获取最新数据
  getData() {
    return this.sensorData;
  }

  // 获取数据条数
  getTotalCount() {
    return this.sensorData.length;
  }

  // 手动触发数据刷新
  async refreshData() {
    return await this.fetchSensorData();
  }
}

// 创建单例实例并导出
export default new SensorDataService();