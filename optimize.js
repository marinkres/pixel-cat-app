import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminOptipng from 'imagemin-optipng';

(async () => {
    await imagemin(['assets/*.png'], {
        destination: 'assets',
        plugins: [
            imageminPngquant({ quality: [0.65, 0.8] }),
            imageminOptipng({ optimizationLevel: 7 })
        ]
    });
    console.log('Images optimized');
})();
