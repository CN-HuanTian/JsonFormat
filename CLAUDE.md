# JSON在线解析工具 - 项目文档

## 一、项目概述

### 1.1 项目简介
一个基于Vue 3的JSON在线解析工具，提供JSON格式化、语法高亮、双模式显示等功能。

### 1.2 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 | 3.5.25 |
| 语言 | TypeScript | 5.9.0 |
| 构建工具 | Vite | 7.2.4 |
| UI组件库 | Element Plus | 2.11.9 |
| 样式 | UnoCSS | 66.5.10 |
| 代码规范 | ESLint + Prettier | 9.39.1 + 3.6.2 |

---

## 二、项目结构

```
JsonFormat/
├── src/
│   ├── App.vue                    # 根组件，整体布局
│   ├── main.ts                    # 应用入口
│   ├── components/                # 公共组件
│   │   └── JsonPreCode/           # JSON代码显示组件
│   ├── types/                     # TypeScript类型定义
│   │   ├── main.d.ts              # 配置类型
│   │   └── jsonPreCode.d.ts       # JSON数据类型
│   ├── utils/                     # 工具函数
│   │   ├── dataFlatten.ts         # JSON扁平化算法
│   │   └── function.ts            # 通用工具函数
│   ├── view/                      # 页面组件
│   │   ├── header/                # 页头
│   │   ├── main/                  # 主体内容
│   │   │   ├── index.vue          # 主界面
│   │   │   └── showData.vue       # 数据显示
│   │   └── footer/                # 页脚
│   └── style/                     # 样式文件
├── folder-alias.json              # 文件夹别名配置
└── package.json
```

### 文件夹别名说明

| 路径 | 描述 |
|------|------|
| `src/components/JsonPreCode` | JSON预览组件 |
| `src/utils/dataFlatten.ts` | JSON格式化算法 |
| `src/utils/function.ts` | 功能合集（复制、导出、主题切换） |
| `src/view/footer` | 尾部 |
| `src/view/header` | 头部 |
| `src/view/main` | 内容区域 |
| `src/view/main/showData.vue` | 展示的内容 |

---

## 三、核心功能

### 3.1 功能列表

| 功能 | 说明 |
|------|------|
| JSON格式化 | 将压缩的JSON格式化为易读形式 |
| 语法高亮 | 字符串(绿色)、数字(蓝色)、布尔值(橙色)等 |
| 双模式显示 | 树状结构 / 扁平结构切换 |
| 错误处理 | JSON格式错误时显示错误信息 |
| 一键复制 | 复制格式化后的JSON到剪贴板 |
| 导出文件 | 将JSON导出为.json文件 |
| 主题切换 | 亮色 / 暗色主题 |

### 3.2 显示模式对比

**树状模式**
- 保留JSON的层级结构
- 带缩进和行号
- 适合查看嵌套关系

**扁平模式**
- 线性展示所有数据项
- 显示完整数据路径
- 适合快速浏览所有字段

---

## 四、核心模块详解

### 4.1 数据扁平化算法 (`src/utils/dataFlatten.ts`)

这是项目的核心算法，负责将嵌套的JSON对象转换为扁平数组。

#### 数据结构

```typescript
interface DataFlattenType {
  path: number[]           // 数组路径，用于访问嵌套数据
  type: FullType           // 数据类型
  value: string            // 格式化后的字符串值
}
```

#### 类型列表

| 类型 | 说明 |
|------|------|
| `ObjectStart` | 对象开始标记 `{` |
| `ObjectEnd` | 对象结束标记 `}` |
| `ArrayStart` | 数组开始标记 `[` |
| `ArrayEnd` | 数组结束标记 `]` |
| `String` | 字符串 |
| `Number` | 数字 |
| `Boolean` | 布尔值 |
| `Null` | 空值 |

#### 算法流程

```
输入JSON → 递归遍历 → 记录路径和类型 → 输出扁平数组
```

### 4.2 工具函数 (`src/utils/function.ts`)

| 函数 | 功能 |
|------|------|
| `copy(content)` | 复制内容到剪贴板 |
| `exportFile(content, filename)` | 导出JSON文件 |
| `changeTheme(theme)` | 切换主题（light/dark） |

### 4.3 类型定义

**配置类型** (`src/types/main.d.ts`)
```typescript
interface Config {
  mode: 'tree' | 'flat'    // 显示模式
  theme: 'light' | 'dark'  // 主题
}
```

**数据类型** (`src/types/jsonPreCode.d.ts`)
```typescript
type ValueType = 'String' | 'Number' | 'Boolean' | 'Null'
type FullType = ValueType | 'ObjectStart' | 'ObjectEnd' | 'ArrayStart' | 'ArrayEnd'
```

---

## 五、组件说明

### 5.1 App.vue
- 根组件，使用Element Plus的Container布局
- 包含Header、Main、Footer三部分

### 5.2 view/main/index.vue
- 主界面组件
- 包含JSON输入框和功能按钮
- 管理显示模式和主题状态

### 5.3 view/main/showData.vue
- 数据显示组件
- 解析JSON字符串并转换为扁平化数据
- 调用JsonPreCode组件渲染

### 5.4 components/JsonPreCode/index.vue
- JSON代码渲染组件
- 根据配置显示树状或扁平结构
- 实现语法高亮和行号

---

## 六、代码质量分析

### 优点
- TypeScript类型覆盖完整
- 组件职责分离清晰
- 错误处理完善
- 代码规范统一（ESLint + Prettier）
- 路径别名配置（@）便于维护

### 改进空间

| 项目 | 建议 |
|------|------|
| 测试 | 添加单元测试，覆盖核心算法 |
| 注释 | 复杂逻辑添加更详细注释 |
| 性能 | 大JSON数据可考虑虚拟滚动 |
| 功能 | 可增加搜索、过滤等功能 |
| Footer | 补充版权信息等 |

---

## 七、开发指南

### 7.1 安装依赖
```bash
npm install
```

### 7.2 开发模式
```bash
npm run dev
```

### 7.3 构建生产
```bash
npm run build
```

### 7.4 代码检查
```bash
npm run lint
```

---

## 八、项目评分

| 维度 | 得分 | 说明 |
|------|------|------|
| 代码质量 | 8/10 | TypeScript规范，缺测试 |
| 功能完整性 | 9/10 | 核心功能齐全 |
| 用户体验 | 7/10 | 交互良好，细节可优化 |
| 工程实践 | 8/10 | 规范完善 |
| 可维护性 | 8/10 | 结构清晰 |
| 创新性 | 8/10 | 算法设计精妙 |

**综合评分：8.0/10**

---

## 九、总结

这是一个设计精良的JSON解析工具，代码结构清晰，功能完善。核心的扁平化算法设计巧妙，能够优雅地处理复杂的嵌套JSON结构。作为个人项目已达到生产可用水平，建议在测试覆盖和性能优化方面继续提升。

---

**文档生成时间**：2026-01-06
**项目状态**：活跃开发中
