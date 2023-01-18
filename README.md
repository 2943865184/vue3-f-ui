# 基于 Vue3 + Vite + TS 的UI组件库

# 开发环境
-- vue : 3.2.45
-- vite : 4.0.0
-- typescript : 4.9.3

# 项目结构
--- packages                  // 组件库文件夹 
   |--- public                // 组件库公共资源文件夹
       |--- css               // css样式文件夹
           |--- prism.css     // 代码高亮样式
   |--- Button                // 单组件文件夹
       |--- src               // vue文件夹
           |--- index.vue     // 组件主体
       |--- docs              // 组件说明文件夹          
           |--- demo.vue      // 示例
           |--- Preview.vue   // 展示示例源代码
           |--- README.md     // 说明文件（已通过插件转vue类型）
           |--- README.d.ts   // 说明文件类型声明
       |--- less              // 样式文件夹
           |---index.less     // 样式文件
       |--- index.ts          // 导出组件
   |--- index.ts              // 组件汇总导出
   |--- list.json             // 组件列表
--- examples                  // 组件库示例
   |--- assets                // 资源
   |--- routes                // 路由文件夹
       |--- index.ts          // 路由
   |--- App.vue               
   |--- main.ts                          
--- build                     // 打包配置文件夹
   |--- vite.base.config.ts   // 基础配置
   |--- vite.doc.config.ts    
   |--- vite.lib.config.ts
--- public                    // 公共资源
--- script                    // js文件
--- index.html                
--- package.json
--- package-lock.json
--- tsconfig.json             // TS配置文件
--- README.md
--- .gitignore
--- .npmignore
