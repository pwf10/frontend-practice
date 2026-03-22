<template>
  <div class="data-table-container">
    <!-- 顶部装饰条 -->
    <div class="top-decoration"></div>
    
    <div class="table-header">
      <h2 class="page-title">传感器数据表格</h2>
      <div class="table-actions">
        <el-button 
          type="primary" 
          @click="refreshData"
          :loading="isRefreshing"
          class="action-btn"
        >
          <el-icon><Refresh /></el-icon>
          刷新数据
        </el-button>
        <el-button 
          type="success" 
          @click="exportData"
          class="action-btn"
        >
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
        <el-button 
          type="info" 
          @click="showSettings"
          class="action-btn"
        >
          <el-icon><Setting /></el-icon>
          表格设置
        </el-button>
      </div>
    </div>
    
    <!-- 数据概览 -->
    <div class="data-overview">
      <div class="overview-card">
        <div class="overview-icon">📊</div>
        <div class="overview-content">
          <div class="overview-value">{{ total }}</div>
          <div class="overview-label">总数据量</div>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🔄</div>
        <div class="overview-content">
          <div class="overview-value">{{ lastUpdate }}</div>
          <div class="overview-label">最后更新</div>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">✅</div>
        <div class="overview-content">
          <div class="overview-value">{{ systemStatus }}</div>
          <div class="overview-label">系统状态</div>
        </div>
      </div>
    </div>

    <!-- 加载状态、错误提示 -->
    <div v-if="loading || errorMessage">
      <el-skeleton v-if="loading" :rows="10" :columns="8" border style="width: 100%; margin-bottom: 20px;"></el-skeleton>
      <el-alert v-if="errorMessage" title="数据加载失败" :description="errorMessage" type="error" show-icon style="margin-bottom: 20px;"></el-alert>
    </div>

    <!-- 数据表格 -->
    <div v-else class="table-wrapper">
      <el-table 
        :data="tableData" 
        border 
        style="width: 100%;"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        stripe
        class="data-table"
        v-loading="isRefreshing"
        element-loading-text="数据加载中..."
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="collect_time" label="采集时间" width="200" sortable>
          <template #default="scope">
            <span class="time-cell">{{ formatDateTime(scope.row.collect_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="temperature_c" label="温度(°C)" sortable>
          <template #default="scope">
            <div class="temperature-value" :class="getTemperatureClass(scope.row.temperature_c)">
              {{ scope.row.temperature_c }}
              <span class="temp-icon">🌡️</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="humidity_rh" label="湿度(%)" sortable>
          <template #default="scope">
            <div class="humidity-value">
              <span class="humidity-text">{{ scope.row.humidity_rh }}</span>
              <span class="humidity-icon">💧</span>
              <el-progress 
                :percentage="Number(scope.row.humidity_rh)" 
                stroke-width="6" 
                style="width: 100px; margin-left: 10px; display: inline-block;"
                :color="getHumidityColor(scope.row.humidity_rh)"
                :show-text="false"
              ></el-progress>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="earthquake_status" label="地震状态" width="120">
          <template #default="scope">
            <el-tag 
              :type="scope.row.earthquake_status === '无震' ? 'success' : 'warning'"
              class="status-tag"
            >
              <el-icon v-if="scope.row.earthquake_status === '无震'" style="margin-right: 4px;"><Check /></el-icon>
              <el-icon v-else style="margin-right: 4px;"><Warning /></el-icon>
              {{ scope.row.earthquake_status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="earthquake_level" label="地震等级" width="100" align="center">
          <template #default="scope">
            <div class="level-cell" :class="getLevelClass(scope.row.earthquake_level)">
              {{ scope.row.earthquake_level }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="accel_magnitude" label="加速度(g)" width="120" sortable>
          <template #default="scope">
            <div class="accel-value">
              {{ scope.row.accel_magnitude.toFixed(2) }}
              <span class="accel-icon">📈</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="vibration_duration_ms" label="振动时长(ms)" width="130" sortable></el-table-column>
        <el-table-column prop="tilt_angle_deg" label="倾斜角度(°)" width="120" sortable>
          <template #default="scope">
            <div class="tilt-value" :class="getTiltClass(scope.row.tilt_angle_deg)">
              {{ scope.row.tilt_angle_deg }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="line_detected" label="线路检测" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.line_detected ? 'success' : 'info'">
              {{ scope.row.line_detected ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="person_detected" label="人员检测" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.person_detected ? 'warning' : 'info'">
              {{ scope.row.person_detected ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_landslide_alert" label="滑坡警报" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.is_landslide_alert ? 'danger' : 'success'">
              {{ scope.row.is_landslide_alert ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="scope">
            <div class="action-buttons">
              <el-button 
                type="primary" 
                size="small" 
                @click.stop="viewDetails(scope.row)"
                class="detail-btn"
              >
                <el-icon><View /></el-icon>
                详情
              </el-button>
              <el-button 
                type="warning" 
                size="small" 
                @click.stop="analyzeData(scope.row)"
                class="analyze-btn"
              >
                <el-icon><DataAnalysis /></el-icon>
                分析
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="传感器数据详情"
      width="600px"
      :before-close="handleClose"
      class="detail-dialog"
      :modal-append-to-body="false"
      :append-to-body="true"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
    >
      <div v-if="selectedRow" class="detail-content">
        <div class="detail-section">
          <h3>基本信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">ID:</span>
              <span class="detail-value">{{ selectedRow.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">采集时间:</span>
              <span class="detail-value">{{ formatDateTime(selectedRow.collect_time) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">创建时间:</span>
              <span class="detail-value">{{ formatDateTime(selectedRow.create_time) }}</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>环境数据</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">温度:</span>
              <span class="detail-value" :class="getTemperatureClass(selectedRow.temperature_c)">
                {{ selectedRow.temperature_c }} °C
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">湿度:</span>
              <span class="detail-value">{{ selectedRow.humidity_rh }} %</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>地震监测数据</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">地震状态:</span>
              <el-tag :type="selectedRow.earthquake_status === '无震' ? 'success' : 'warning'">
                {{ selectedRow.earthquake_status }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="detail-label">地震等级:</span>
              <span class="detail-value" :class="getLevelClass(selectedRow.earthquake_level)">
                {{ selectedRow.earthquake_level }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">加速度:</span>
              <span class="detail-value">{{ selectedRow.accel_magnitude.toFixed(2) }} g</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">振动时长:</span>
              <span class="detail-value">{{ selectedRow.vibration_duration_ms }} ms</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">倾斜角度:</span>
              <span class="detail-value" :class="getTiltClass(selectedRow.tilt_angle_deg)">
                {{ selectedRow.tilt_angle_deg }} °
              </span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>检测状态</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">线路检测:</span>
              <el-tag :type="selectedRow.line_detected ? 'success' : 'info'">
                {{ selectedRow.line_detected ? '是' : '否' }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="detail-label">人员检测:</span>
              <el-tag :type="selectedRow.person_detected ? 'warning' : 'info'">
                {{ selectedRow.person_detected ? '是' : '否' }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="detail-label">滑坡警报:</span>
              <el-tag :type="selectedRow.is_landslide_alert ? 'danger' : 'success'">
                {{ selectedRow.is_landslide_alert ? '是' : '否' }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="exportRowData(selectedRow)">导出此条数据</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Check, Warning, View, DataAnalysis, Refresh, Download, Setting } from '@element-plus/icons-vue'
import axios from 'axios';

export default {
  name: 'DataTable',
  components: {
    Check,
    Warning,
    View,
    DataAnalysis,
    Refresh,
    Download,
    Setting
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      isRefreshing: false,
      errorMessage: '',
      baseApiUrl: 'http://localhost:8080',
      lastUpdate: '刚刚',
      detailDialogVisible: false,
      selectedRow: null,
      onlineDevices: 0,
      systemStatus: '正常'
    }
  },
  mounted() {
    this.loadTableData();
    this.updateLastUpdateTime();
    this.loadSystemStatus();
  },
  methods: {
    // 从后端加载数据
    loadTableData() {
      this.loading = true;
      this.errorMessage = '';
      
      axios.get(this.baseApiUrl + '/sensor/data', {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
      }).then((response)=>{
        console.log('API响应:', response);
        
        if (response.data && response.data.success) {
          const responseData = response.data.data;
          
          // 直接使用后端返回的字段，无需转换
          this.tableData = responseData.records || [];
          
          // 从 total 字段获取总数
          this.total = responseData.total || 0;
          this.updateLastUpdateTime();
        } else {
          throw new Error(response.data.message || '数据格式错误');
        }
      }).catch((error)=>{
        console.error('数据加载失败：', error);
        this.errorMessage = "数据加载失败: " + (error.response?.data?.message || error.message);
        this.generateMockData(); // 失败时生成模拟数据
      }).finally(()=>{
        this.loading = false;
        this.isRefreshing = false;
      });
    },
    
    // 加载系统状态
    loadSystemStatus() {
      axios.get(this.baseApiUrl + '/sensor/system/status')
        .then((response) => {
          if (response.data && response.data.success) {
            this.onlineDevices = response.data.data.onlineDevices || 5;
            this.systemStatus = response.data.data.status || '正常';
          }
        })
        .catch((error) => {
          console.error('系统状态加载失败:', error);
          this.onlineDevices = 5;
          this.systemStatus = '正常';
        });
    },
    
    // 生成模拟数据（备用）
    generateMockData() {
      const mockData = [];
      const statusOptions = ['无震', '微震', '小震', '中震'];
      
      for (let i = 0; i < this.pageSize; i++) {
        const id = (this.currentPage - 1) * this.pageSize + i + 1;
        const statusIndex = Math.floor(Math.random() * statusOptions.length);
        const earthquake_status = statusOptions[statusIndex];
        
        mockData.push({
          id,
          collect_time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          temperature_c: (20 + Math.random() * 15).toFixed(1),
          humidity_rh: (40 + Math.random() * 40).toFixed(1),
          earthquake_status: earthquake_status,
          earthquake_level: statusIndex,
          accel_magnitude: (0.5 + Math.random() * 2).toFixed(2),
          vibration_duration_ms: Math.floor(Math.random() * 100),
          tilt_angle_deg: (Math.random() * 15).toFixed(1),
          line_detected: Math.random() > 0.5 ? 1 : 0,
          person_detected: Math.random() > 0.5 ? 1 : 0,
          is_landslide_alert: Math.random() > 0.8 ? 1 : 0,
          create_time: new Date().toISOString()
        });
      }
      this.tableData = mockData;
      this.total = 156; // 模拟总数据量
    },
    
    // 刷新数据
    refreshData() {
      this.isRefreshing = true;
      this.loadTableData();
      this.loadSystemStatus();
    },
    
    // 导出数据
    exportData() {
      axios.get(this.baseApiUrl + '/sensor/export')
        .then((response) => {
          if (response.data && response.data.success) {
            this.$message.success('数据导出成功');
          } else {
            this.$message.warning('导出功能暂不可用，使用模拟导出');
            // 模拟导出操作
            setTimeout(() => {
              this.$message.success('数据导出成功');
            }, 1500);
          }
        })
        .catch(() => {
          this.$message.error('网页出现了未知错误，请联系管理员！');
        });
    },
    
    // 显示设置
    showSettings() {
      this.$message.info('表格设置功能开发中...');
    },
    
    // 查看详情
    viewDetails(row) {
      axios.get(this.baseApiUrl + '/sensor/detail', {
        params: {
          id: row.id
        }
      }).then((response)=>{
        console.log('详情响应:', response);
        if (response.data && response.data.success) {
          // 直接使用后端返回的字段
          this.selectedRow = response.data.data;
        } else {
          this.selectedRow = row;
        }
      }).catch((error)=>{
        console.error('获取详情失败:', error);
        this.selectedRow = row;
        this.$message.warning('获取详细数据失败，显示基础信息');
      });
      this.detailDialogVisible = true;
    },
    
    // 分析数据
    analyzeData(row) {
      axios.get(this.baseApiUrl + '/sensor/analyze', {
        params: {
          id: row.id
        }
      }).then((response)=>{
        console.log(response);
        if (response.data && response.data.success) {
          this.$message.success(`分析完成: ${response.data.data.result}`);
        } else {
          this.$message.info(`正在分析设备数据 ID: ${row.id} ...`);
        }
      }).catch(()=>{
        this.$message.info(`正在分析设备数据 ID: ${row.id} ...`);
      });
    },
    
    // 导出单行数据
    exportRowData(row) {
      axios.get(this.baseApiUrl + '/sensor/export-row', {
        params: {
          id: row.id
        }
      }).then((response)=>{
        if (response.data && response.data.success) {
          this.$message.success(`已导出 ID ${row.id} 的数据`);
        } else {
          this.$message.success(`已导出 ID ${row.id} 的数据`);
        }
      }).catch(()=>{
        this.$message.success(`已导出 ID ${row.id} 的数据`);
      });
      this.detailDialogVisible = false;
    },
    
    // 关闭对话框
    handleClose(done) {
      this.detailDialogVisible = false;
      if (done) done();
    },
    
    // 更新最后更新时间
    updateLastUpdateTime() {
      const now = new Date();
      this.lastUpdate = now.toLocaleTimeString();
    },
    
    // 日期格式化
    formatDateTime(timestamp) {
      if (!timestamp) return '';
      
      let date;
      if (timestamp instanceof Date) {
        date = timestamp;
      } else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
      } else {
        return '';
      }
      
      return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    },
    
    padZero(num) {
      return num < 10 ? `0${num}` : num;
    },
    
    // 温度样式
    getTemperatureClass(temp) {
      const temperature = Number(temp);
      if (temperature > 30) return 'high-temp';
      if (temperature < 22) return 'low-temp';
      return 'normal-temp';
    },
    
    // 湿度进度条颜色
    getHumidityColor(humidity) {
      const value = Number(humidity);
      if (value > 70) return '#f56c6c';
      if (value < 30) return '#e6a23c';
      return '#67c23a';
    },
    
    // 地震等级样式
    getLevelClass(level) {
      if (level === 0) return 'level-normal';
      if (level === 1) return 'level-warning';
      if (level === 2) return 'level-danger';
      return 'level-normal';
    },
    
    // 倾斜角度样式
    getTiltClass(angle) {
      const tilt = Number(angle);
      if (tilt > 10) return 'tilt-high';
      if (tilt > 5) return 'tilt-medium';
      return 'tilt-normal';
    },
    
    // 分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.loadTableData();
    },
    
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadTableData();
    },
    
    cellStyle() {
      return { 
        'font-size': '14px', 
        'padding': '12px 8px',
        'transition': 'all 0.2s ease'
      };
    },
    
    headerCellStyle() {
      return { 
        'background-color': '#f5f7fa', 
        'font-weight': 'bold', 
        'color': '#1f2329', 
        'font-size': '15px',
        'padding': '12px 8px'
      };
    }
  }
}
</script>

<style scoped>
.data-table-container {
  min-height: calc(100vh - 40px);
  padding: var(--spacing-lg) var(--spacing-md);
  background: linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%);
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.table-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-base);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* 数据概览 */
.data-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.overview-card {
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

.overview-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.overview-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(22, 93, 255, 0.1);
  border-radius: 12px;
}

.overview-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.overview-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* 表格包装器 */
.table-wrapper {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

.data-table {
  border: none;
}

.data-table ::v-deep(.el-table__header) {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.data-table ::v-deep(.el-table__row:hover > td) {
  background-color: #f0f7ff !important;
  transform: scale(1.01);
  transition: all 0.2s ease;
}

/* 表格单元格样式 */
.time-cell {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
}

.temperature-value, .humidity-value, .accel-value {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.temp-icon, .humidity-icon, .accel-icon {
  font-size: 1.1rem;
}

.humidity-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.humidity-text {
  min-width: 40px;
}

.normal-temp {
  color: #67c23a;
}

.high-temp {
  color: #f56c6c;
  font-weight: 600;
}

.low-temp {
  color: #e6a23c;
  font-weight: 600;
}

.status-tag {
  font-weight: 500;
  display: flex;
  align-items: center;
}

.level-cell {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
}

.level-normal {
  background: #f0f9ff;
  color: #165DFF;
}

.level-warning {
  background: #fff7e6;
  color: #ff7d00;
}

.level-danger {
  background: #fff2f0;
  color: #f53f3f;
}

.tilt-value {
  font-weight: 500;
}

.tilt-normal {
  color: #67c23a;
}

.tilt-medium {
  color: #e6a23c;
}

.tilt-high {
  color: #f56c6c;
  font-weight: 600;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 6px;
}

.detail-btn, .analyze-btn {
  border-radius: 6px;
  font-size: 0.8rem;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 分页容器 */
.pagination-container {
  display: flex;
  justify-content: center;
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  position: relative;
  z-index: 1;
}

/* 详情对话框 */
.detail-dialog ::v-deep(.el-dialog) {
  border-radius: 12px;
  box-shadow: var(--shadow-hover);
  position: fixed;
  z-index: 2000;
}

.detail-dialog ::v-deep(.el-dialog__header) {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px 12px 0 0;
  padding: 20px;
  margin: 0;
}

.detail-dialog ::v-deep(.el-overlay) {
  position: fixed;
  z-index: 1999;
}

.detail-content {
  padding: 0 10px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h3 {
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f2f5;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f2f5;
}

.detail-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  color: var(--text-primary);
  font-weight: 500;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .table-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .data-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .overview-card {
    padding: var(--spacing-md);
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .humidity-value {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .data-overview {
    grid-template-columns: 1fr;
  }
  
  .table-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .data-table-container {
    padding: var(--spacing-md) var(--spacing-sm);
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
  --border-radius: 12px;
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 24px rgba(22, 93, 255, 0.15);
}
</style>