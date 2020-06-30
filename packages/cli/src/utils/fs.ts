import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util'

export function getAbsolutePath(current: string, input: string) {
  if (!input) {
    return path.resolve(current)
  } else if (input.startsWith('/')) {
    return input;
  } else {
    return path.resolve(current, input);
  }
}

export function isDir(current: string) {
  return promisify(fs.stat)(current).then(stats => stats.isDirectory())
}

export function isExists(current: string) {
  return promisify(fs.exists)(current).then(stats => stats)
}

export function createDir(dirName: string) {
  return promisify(fs.mkdir)(dirName).then(stats => stats)
}

export function createFile(fileName: string, data?: string) {
  return promisify(fs.writeFile)(fileName, data || '')
}

export function getFileWithSuffix(dir: string, suffix: string) {
  const read = promisify(fs.readdir);

  return read(dir).then(files => files.filter(filename => filename.endsWith(`.${suffix}`))[0])
}

export function getFileContent(current: string) {
  const read = promisify(fs.readFile)

  return read(current).then(c => c.toString())
}
