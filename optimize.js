const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminOptipng = require('imagemin-optipng');

(async () => {
    await imagemin(['assets/*.png'], {
        destination: 'assets/optimized',
        plugins: [
            imageminPngquant({ quality: [0.65, 0.8] }),
            imageminOptipng({ optimizationLevel: 7 })
        ]
    });
    console.log('Images optimized');
})();
