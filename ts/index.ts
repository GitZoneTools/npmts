import "typings-global";

// start early and load modules
import * as early from "early";
early.start("NPMTS");
import * as plugins from "./npmts.plugins"
import * as paths from "./npmts.paths";
import {promisechain} from "./npmts.promisechain";
early.stop();

plugins.beautylog.figletSync("NPMTS");
let projectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);
plugins.beautylog.info("npmts version: " + projectInfo.version);

try {
    promisechain();
}
catch(err){
    console.log(err);
}

