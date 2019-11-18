var cluster = require('cluster');
// var numCPUS = require('os').cpus().length;

if(cluster.isMaster) {
    cluster.fork();
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
        cluster.fork();
    });
} else {
    require('./server.js');
}