import "typings-global";

/* ================================================== *
    Starting NPMTS main process.
 * ================================================== */
import * as early from "early";
early.start("NPMTS");
import * as plugins from "./npmts.plugins"
import * as paths from "./npmts.paths";
import {promisechain} from "./npmts.promisechain";
early.stop()
    .then(() => {
        let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);

        let npmtsCli = new plugins.smartcli.Smartcli();
        npmtsCli.standardTask()
            .then((argvArg) => {
                plugins.beautylog.figletSync("NPMTS");
                plugins.beautylog.info("npmts version: " + npmtsProjectInfo.version);
                try {
                    promisechain(argvArg);
                }
                catch(err){
                    console.log(err);
                }
            });

        npmtsCli.addVersion(npmtsProjectInfo.version);
        npmtsCli.startParse();
    });