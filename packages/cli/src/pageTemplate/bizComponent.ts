import * as shell from 'shelljs';
import { ICategoryData } from '../createFiles';
import { createDir, createFile } from '../utils/fs';

export async function createBizComponents(componentNameArr: ICategoryData['props']) {
  const dirBame = 'biz'

  await createDir(dirBame)

  shell.cd(dirBame)

  for(let k in componentNameArr) {
    const { componentName } = componentNameArr[k];

    const component = `
import * as React from "react";

interface I${componentName} {
  placeholder: any;
}

export class ${componentName} extends React.PureComponent<I${componentName}> {
  render() {
    return (
      <div>${componentName}</div>
    );
  }
}
    `

    await createFile(`./${componentName}.tsx`, component);
  }

  shell.cd('../')
}


