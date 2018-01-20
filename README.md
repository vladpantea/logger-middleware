# logger-middleware
Logger middleware using Winston and file daily rotate strategy. Create folder via path provided, log all Express requests and expose logger instance to be used in your application.

## Installation



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

    const logger = require('loggerx')({path:logDirectory,fileName:'medo-login.log'});
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

# License

[MIT](LICENSE)



