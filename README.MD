## 介绍
* react支持使用类html模板书写组件
* 提供类dom的操作，操作html
* 插件机制，修改html

## TODO

### 首层路由配置化， 使得可以动态添加


### 工具链中需要加上 html-loader
yarn add html-loader
`
module.exports = {
  webpack: {
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
          webpackConfig.module.rules.push({
            test: /\.(html)$/,
            loader: 'html-loader',
          })
          return webpackConfig; 
        },
      },
    },
  ],
};
`
types中添加 webpackHtmlModule.d.ts 文件， 内容
`
declare module "*.html" {
  const content: string;
  export default content;
}
`





