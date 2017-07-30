# Changelog

## 2017-07-30: Version 7.x.x -> 8.x.x
Testfiles in ./test/ can now import files directly from the ts dir:

```javascript
// ./test/test.ts
import * as myModule from '../ts/index
```