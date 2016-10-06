/* ================================================== *
    **** NPMTS ****
    Fabulous TypeScript development
 * ================================================== */

import * as early from 'early'
early.start('NPMTS')
import * as plugins from './npmts.plugins'
import * as cli from './npmts.cli'
early.stop()
    .then(() => {
        let loaded = plugins // to make sure plugins get actually loaded
        cli.run()
    })
