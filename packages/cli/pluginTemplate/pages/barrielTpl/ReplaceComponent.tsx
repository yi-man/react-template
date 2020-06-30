import { Tag } from "@yds/components";
import * as React from "react";
import { getStarWarPerson } from "../../service";

export default class ReplaceComponent extends React.PureComponent<{}> {
  state = {
    text: "默认替换内容",
  };

  componentDidMount() {
    getStarWarPerson().then(d => {
      this.setState({
        text: `请求之后的内容${d.expire_timestamp}`,
      });
    });
  }

  render() {
    const { text } = this.state;

    return <Tag color="magenta"> {text} </Tag>;
  }
}
