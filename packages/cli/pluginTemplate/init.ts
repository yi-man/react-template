import { adddMessages } from "modules/Common/I18n/actions";
import { chrysalis } from "packages/chrysalis";
import { bus } from "packages/chrysalis/bus";
import { extendModule } from "./store/module";

bus.on("beforeAppStart", modules => {
  modules.push(extendModule);
});

bus.on("AppStart", () => {
  chrysalis.getStore().dispatch(
    adddMessages({
      xuxinday: "我命由我不由天",
    }),
  );
});
