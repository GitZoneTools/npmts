import "typings-global";
import * as early from "early";
early.start("NPMTS");
import * as plugins from "./npmts.plugins"
import {promisechain} from "./npmts.promisechain";
early.stop();

plugins.beautylog.figletSync("NPMTS");

try {
    promisechain();
}
catch(err){
    console.log(err);
}

