import { Col, Row } from "@yds/components";
import { connectTemplate, ReactTemplate } from "@yds/react-template";
import { adapter, Props } from "./adapter";
import { BarrierScreenSubscribe } from './biz/BarrierScreenSubscribe';
import { BarrierScreenSummary } from './biz/BarrierScreenSummary';
import { BarrierScreenLocation } from './biz/BarrierScreenLocation';
import { BarrierScreenContent } from './biz/BarrierScreenContent';
import { CaptureWallBanner } from './biz/CaptureWallBanner';
import { Slider } from './biz/Slider';
import { AlertSubscription } from './biz/AlertSubscription';
import { AlertWallSummary } from './biz/AlertWallSummary';
import { AlertLink } from './biz/AlertLink';
import { AlertWallFilter } from './biz/AlertWallFilter';
import { AlertWallList } from './biz/AlertWallList';
import "./index.scss";
import tpl from "./tpl.htm";

class UnwarpExamples extends ReactTemplate < Props > {
  id = "Examples";
  template = tpl;
  props: Props;

  adapter = adapter;

  components = {
    Row,
    Col,

    BarrierScreenSubscribe,
    BarrierScreenSummary,
    BarrierScreenLocation,
    BarrierScreenContent,
    CaptureWallBanner,
    Slider,
    AlertSubscription,
    AlertWallSummary,
    AlertLink,
    AlertWallFilter,
    AlertWallList,
  };

  componentDidMount() {
    this.props.triggerInitPage();
  }

  componentWillUnmount() {
    this.props.triggerClearPage();
  }
}

const Examples = connectTemplate(UnwarpExamples);

export { Examples };