const forever = require('forever-monitor');

const child = new (forever.Monitor)('./test.js', {
    max: 3,
    watch: true,
    watchDirectory: './etc',
    usePolling: true,
    pollingInterval: 30000,
});

child.on('exit', () =>  {
    console.log('your-filename.js has exited after 3 restarts');
});

child.on('watch:restart', (info) => {
    console.error('Restarting script because ' + info.file + ' changed');
});

child.on('restart', () => {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', (code) => {
    console.error('Forever detected script exited with code ' + code);
});

console.log('Starting process');

child.start();