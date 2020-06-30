import { parse, RTElements, DomType } from '@yds/react-template'
import { createBizComponents, createAdapter, createPage, createScss, createStore } from './pageTemplate'
import { isExists } from './utils/fs'
import { logFatal } from './utils/log'
import * as shell from 'shelljs';
import * as pkg from '../package.json'

export interface ICategoryData {
  props: Array<
    {
      componentName: string;
      propName: string;
    }
  >,
  className: object
}

function getDataByCategory(domTree: RTElements) {
  const result: ICategoryData = {
    [DomType.BIZ]: [],
    [DomType.LAYOUT]: {}
  }

  const addData = (eles: RTElements, layoutObj: object) => {
    eles.forEach(ele => {
      let nextLayoutObj
      if (ele.type === 'tag') {
        const { attrs, name } = ele;
  
        Object.keys(attrs).forEach(k => {
          if (k === DomType.BIZ) {
            result[DomType.BIZ].push({
              componentName: name,
              propName: attrs[k].value
            })
          } else if (k === DomType.LAYOUT) {
            nextLayoutObj = layoutObj[attrs[k].value] = {}
          }
        })
      }
      if (ele.children) {
        addData(ele.children, nextLayoutObj)
      }
    })  
  }

  addData(domTree, result[DomType.LAYOUT])

  return result;
}

function firstUpperCase(str: string) {
  return str.replace(/^[a-z]/, (L) => L.toUpperCase());
}

export async function createTemplateRelatedFiles(target:string, template: string) {
  if (await isExists(`${target}/index.tsx`)) {
    logFatal(`检测到${target}/index.tsx已存在，请重新确认`)
  }

  shell.cd(target);
  const pageName = target.substr(target.lastIndexOf('/') + 1)
  const upperPageName = firstUpperCase(pageName)
  // parse template
  const domTree = parse(template)
  const data = getDataByCategory(domTree)
  
  await createPage(upperPageName, data[DomType.BIZ])
  await createStore(pageName)
  await createAdapter(pageName, data[DomType.BIZ])
  await createBizComponents(data[DomType.BIZ])
  await createScss(data[DomType.LAYOUT])

  // 分成两类

  // 根据 data， className 创建相关文档
  return template;
}

export function createPatches() {
  const source = `node_modules/${pkg.name}/pluginTemplate`
  const target = './src/patches'
  
console.log(require('path').resolve('.', source))
  shell.cp('-rf', require('path').resolve('.', source), target)
}
