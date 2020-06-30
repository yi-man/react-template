import { loadPatches, TemplateCollection } from "@yds/react-template";
import "./init";
import { barrielTpl } from "./pages/barrielTpl";

const patches: TemplateCollection = {
  [barrielTpl.id]: barrielTpl,
};

loadPatches(patches);

export default patches;
