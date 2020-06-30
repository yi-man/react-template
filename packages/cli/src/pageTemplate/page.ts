import { createFile } from '../utils/fs'
import { jsFormat } from '../utils/format'
import { ICategoryData } from '../createFiles'

export async function createPage(pageName: string, componentNameArr: ICategoryData['props']) {
  const unwrapPageName = `Unwarp${pageName}`

  let content = `
    import { Col, Row } from "@yds/components";
    import { connectTemplate, ReactTemplate } from "@yds/react-template";
    import { adapter, Props } from "./adapter";
    `
    componentNameArr.forEach(comp => {
        const { componentName } = comp;

        content += `import { ${componentName} } from './biz/${componentName}';`
    })

    content += `
      import "./index.scss";
      import tpl from "./tpl.html";

      class ${unwrapPageName} extends ReactTemplate<Props> {
        id = "${pageName}";
        template = tpl;
        props: Props;

        adapter = adapter;

        components = {
            Row,
            Col,

    `
    componentNameArr.forEach(comp => {
      const { componentName } = comp;

      content += `${componentName},`
  })
    
    content += `
        };

        componentDidMount() {
          // keep
        }

        componentWillUnmount() {
          // keep
        }
      }

      const ${pageName} = connectTemplate(${unwrapPageName});

      export { ${pageName} };
    `

    content = jsFormat(content)

    await createFile(`./index.tsx`, content);
}
