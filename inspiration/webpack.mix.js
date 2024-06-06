const mix = require("laravel-mix");
require('laravel-mix-tailwind');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js("resources/js/app.js", "public/js/app.js")
//     .react()
//     .sass("resources/sass/app.scss", "public/css");
//     tailwind(''); // 後で削除

// if (mix.inProduction()) {
//     mix.version();
// }

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .options({
        postCss: [
            require('tailwindcss'),
            require('autoprefixer'),
        ],
    });

if (mix.inProduction()) {
    mix.version();
}