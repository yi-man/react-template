#!/usr/bin/env node

import { argv } from 'yargs';
import { createTemplateRelatedFiles, createPatches } from './createFiles';
import { getAbsolutePath, getFileContent, getFileWithSuffix } from './utils/fs';
import { logFatal } from './utils/log'

export async function createCli(input: string) {
  const suffix = 'htm';
  let target = '.';

  target = getAbsolutePath(target, input);

  try {
    const tpl = await getFileWithSuffix(target, suffix);
    if (tpl) {
      const tplContent = await getFileContent(`${target}/${tpl}`);

      await createTemplateRelatedFiles(target, tplContent); 
    } else {
      logFatal(`${target}下未找到模板文件`);
    }
  } catch(e){
    logFatal(`创建模板失败:${e}`);
  }
}

const templateType = argv.init

if (templateType) {
  createPatches()
} else {
  if (argv._[0]) {
    console.log(argv._[0])
    createCli(argv._[0])
  }
}
