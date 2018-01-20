# logger-middleware
Logger middleware using Winston and file daily rotate strategy. Create folder via path provided, log all Express requests and expose logger instance to be used in your application.

## Installation

`$ npm install loggerx`

## Usage

- Load the module
- Pass configuration options(folder path, file name)
- Apply middleware to express server(all express request are logged to file)
- Use logger into your application


### Example

```js
/* index.js */
    const express = require('express');
    const app = express();
    const fs = require('fs');
    const path = require('path');
    const logDirectory = path.join(__dirname,'logs');

    //logDirectory=C:/Development/loggerProject/logs/fileLog.log
    const logger = require('loggerx')({path:logDirectory,fileName:'fileLog.log'});
    app.use(logger.accesslog);

    logger.log('info','Log through info');
    logger.info('info');
    logger.debug('debug');
    logger.warn('warn');
    logger.error('error');

    var server = app.listen(3000, () => console.log('Example app listening on port %s!',3000));

    module.exports = {
        express: server
    }
```

```fileLog.log
2018-01-20T19:10:20.861Z [INFO] Log through info
2018-01-20T19:10:20.862Z [INFO] info
2018-01-20T19:10:20.862Z [WARN] warn
2018-01-20T19:10:20.862Z [ERROR] error
2018-01-20T19:10:25.852Z [INFO] Request protocol:[http], request type:[POST], request path:[/api/helloworld], request headers:[{"cache-control":"no-cache","user-agent":"PostmanRuntime/x.x.x","accept":"*/*","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"0","connection":"keep-alive"}]
```

# License

[MIT](LICENSE)



