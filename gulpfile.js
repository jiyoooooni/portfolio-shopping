const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const through = require('through2');
const handlebars = require('handlebars');
const browserSync = require('browser-sync').create();

const paths = {
  getAbs: (...args) => path.resolve.apply(path, args.reduce((accum, value) => {
    if (typeof value === 'string' && value !== '') accum.push(value);
    return accum;
  }, [__dirname])),
  src_html: fileName => paths.getAbs('./src', fileName),
  src_scss: fileName => paths.getAbs('./src/scss', fileName),
  src_css: fileName => paths.getAbs('./src/css', fileName),
  src_img: fileName => paths.getAbs('./src/img', fileName),
  src_sp_img: fileName => paths.getAbs('./src/sp_img', fileName),
  dest_sp_img: fileName => paths.getAbs('./src/img/sp', fileName),
  dest_sp_scss: fileName => paths.getAbs('./src/scss/sp', fileName),
  dist_html: fileName => paths.getAbs('./docs', fileName),
  dist_css: fileName => paths.getAbs('./docs/css', fileName),
  dist_img: fileName => paths.getAbs('./docs/img', fileName),
  sp_scss_map_template: () => paths.getAbs('./sp_scss_map_template.hbs'),
  sp_scss_template: () => paths.getAbs('./sp_scss_template.hbs')
};

const config = {
  sass: { /* https://github.com/sass/node-sass#options */
    outputStyle: 'expanded', // 'nested', 'expanded', 'compact', 'compressed',
    indentType: 'space', // 'tab', 'space'
    indentWidth: 2
  },
  browserSync: {
    server: {
      baseDir: paths.src_html()
    }
  }
};

/**
 * init
 */
sass.compiler = require('node-sass');

/**
 * task modules
 * - sass
 * - sprite
 * - watch
 * - build html
 * - build css
 * - build image
 */
function sassTask () {
  return gulp.src(paths.src_scss('./*.scss'))
    .pipe(sass(config.sass).on('error', sass.logError))
    .pipe(gulp.dest(paths.src_css()))
    .pipe(browserSync.stream());
}

function spriteTask (done) {
  const scssMaps = [];
  const names = fs.readdirSync(paths.src_sp_img()).filter(fileName => fileName[0] !== '.');

  names.forEach(name => {
    const spriteName = `sp_${name}`
    const stream = getSpriteStream(paths.src_sp_img(`./${name}/*.png`), spriteName);

    stream.img.pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest(paths.dest_sp_img()));

    stream.css.pipe(through.obj((file, encoding) => {
      scssMaps.push({
        name: spriteName,
        mapString: file.contents.toString(encoding)
      });

      if (scssMaps.length >= names.length) {
        writeSpriteScss(scssMaps);
        done();
      }
    }));

  })
}

function watchTask (done) {
  gulp.watch(paths.src_scss('./*.scss'), sassTask);
  gulp.watch(paths.src_html('./*.html')).on('change', browserSync.reload);
  browserSync.init(config.browserSync);
  done();
}

function buildHtmlTask () {
  return gulp.src(paths.src_html('./*.html')).pipe(gulp.dest(paths.dist_html()));
}

function buildCssTask () {
  return gulp.src(paths.src_css('./*.css')).pipe(gulp.dest(paths.dist_css()));
}

function buildImageTask () {
  return gulp.src(paths.src_img('./**/*.png')).pipe(gulp.dest(paths.dist_img()));
}

/**
 * define tasks
 * - sass
 * - watch
 * - build
 */
gulp.task('sass', sassTask);
gulp.task('sprite', spriteTask);
gulp.task('watch', gulp.series(sassTask, watchTask));
gulp.task('build', gulp.parallel(buildHtmlTask, buildCssTask, buildImageTask));

/**
 * util functions
 * - getSpriteStream
 */
function getSpriteStream (pathName, name) {
  const imgName = `${name}.png`;
  const cssName = `${name}.scss`;
  const spriteUrl = path.join(path.relative(paths.src_css(), paths.dest_sp_img()), `./${imgName}`);

  const data = gulp.src(pathName)
    .pipe(spritesmith({
      imgName,
      cssName,
      cssTemplate: paths.sp_scss_map_template(),
      cssSpritesheetName: name,
      cssVarMap: sprite => {
        sprite.url = spriteUrl
      },
      cssOpts: {
        functions: false
      }
    }));

  return data;
}

function writeSpriteScss (maps) {
  const source = fs.readFileSync(paths.sp_scss_template()).toString();
  const template = handlebars.compile(source);

  const scssString = template({
    sprites: maps.map(data => ({
      map: data.mapString
    }))
  });

  fs.writeFileSync(paths.dest_sp_scss('./sp_mixin.scss'), scssString);
}
