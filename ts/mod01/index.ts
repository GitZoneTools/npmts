/* ------------------------------------------
 * This module creates TypeScript documentation
 * -------------------------------------------- */
import * as q from 'q'

import * as paths from '../npmts.paths'
import { npmtsOra } from '../npmts.log'
import { INpmtsConfig } from '../npmts.config'

import * as plugins from './mod01.plugins'


import { projectInfo } from '../mod00/mod00.check'

let genTypeDoc = function (configArg: INpmtsConfig) {
    let done = q.defer()
    npmtsOra.text('now generating ' + 'TypeDoc documentation'.yellow)
    plugins.beautylog.log('TypeDoc Output:')
    let localSmartstream = new plugins.smartstream.Smartstream([
        plugins.gulp.src(plugins.path.join(paths.tsDir, '**/*.ts')),
        plugins.gulpTypedoc({
            // TypeScript options (see typescript docs) 
            module: 'commonjs',
            target: 'es6',
            includeDeclarations: true,

            // Output options (see typedoc docs) 
            out: paths.pagesApiDir,
            json: plugins.path.join(paths.pagesApiDir, 'file.json'),

            // TypeDoc options (see typedoc docs) 
            name: projectInfo.name,
            readme: plugins.path.join(paths.cwd, 'README.md'),
            // theme: "default",
            version: true
        })
    ])
    localSmartstream.run().then(
        () => {
            plugins.beautylog.ok('TypeDoc documentation generated!')
            done.resolve(configArg)
        },
        (err) => {
            plugins.beautylog.warn('TypeDoc documentation generation failed!')
            console.log(err)
            done.resolve(configArg)
        }
    )
    return done.promise
}

export let run = function (configArg: INpmtsConfig) {
    let done = q.defer<INpmtsConfig>()
    if (configArg.docs) {
        genTypeDoc(configArg)
            .then(() => {
                done.resolve(configArg)
            })
    } else {
        done.resolve(configArg)
    };
    return done.promise
}
