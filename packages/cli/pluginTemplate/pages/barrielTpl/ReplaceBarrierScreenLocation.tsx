import { CameraName } from "modules/Odod/components/CameraName";
import * as React from "react";
import { FormattedMessage } from "react-intl";

interface IBarrierScreenLocationProps {
  current_user_url?: string;
  triggerExtendTest: any;
  firstCapture: {
    camera_id?: number;
    cluster_id?: string;
  };
}

export default class ReplaceBarrierScreenLocation extends React.PureComponent<
  IBarrierScreenLocationProps
> {
  onClick = () => {
    this.props.triggerExtendTest();
  };

  render() {
    const { firstCapture, current_user_url } = this.props;

    return (
      <React.Fragment>
        <FormattedMessage id={"BarrierScreen.location"} defaultMessage={"覆盖当前点位："} />
        {firstCapture ? (
          <CameraName cameraId={firstCapture.camera_id} clusterId={firstCapture.cluster_id} />
        ) : null}
        <span>{current_user_url}</span>
        <span onClick={this.onClick}>点击我，出现github地址</span>
      </React.Fragment>
    );
  }
}
