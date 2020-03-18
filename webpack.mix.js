const mix = require('laravel-mix');

const purgecss = require('@fullhuman/postcss-purgecss')({

    content: [
        './resources/views/*.blade.php',
        './resources/js/components/*.js',
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [
            require('tailwindcss'),
            ...mix.inProduction()? [purgecss]: [],
        ],
    });

if (mix.inProduction()) {
    mix.version();
}
