import { createFile } from '../utils/fs'
import { cssFormat } from '../utils/format'

export async function createScss(classNameObj: object) {
  let content = ''

  function recursion(obj: object) {
    const keys = Object.keys(obj);

    keys.forEach(k => {
      content += `.${k} {`

      if (obj[k] && Object.keys(obj[k]).length > 0) {
        recursion(obj[k])
      }

      content += `
        }

      `
    })
  }

  recursion(classNameObj)

  await createFile(`index.scss`, cssFormat(content));
}
