'use strict';

var path = require('path'); 
var appPath;

// Testing if we're in a packaged version of Traproulette or not.
('pkg' in process) ? appPath = path.join(process['execPath'],'/../api/db.json') : appPath = path.join(__dirname,'/../api/db.json');

// Json server for data
const jsonServer = require('json-server')
const jserver = jsonServer.create()
const jrouter = jsonServer.router(appPath)
const jmiddlewares = jsonServer.defaults()

jserver.use(jmiddlewares)
jserver.use('/api', jrouter)
jserver.listen(4000, () => {
  console.log('Traproulette database is running with database here : ' + appPath)
})
