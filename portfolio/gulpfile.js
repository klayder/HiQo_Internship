var	gulp	=	require("gulp");
	watch	=	require("gulp-watch"),
	prefixer	=	require("gulp-autoprefixer"),
	uglify	=	require('gulp-uglify-es').default,
	sass	=	require("gulp-sass"),
	sourcemaps	=	require("gulp-sourcemaps"),
	fileInclude	=	require("gulp-file-include"),
	cssmin	=	require("gulp-minify-css"),
	imagemin	=	require("gulp-imagemin"),
	pngquant	=	require("imagemin-pngquant"),
	rimraf	=	require("rimraf"),
	browserSync	=	require("browser-sync"),
	reload	=	browserSync.reload;


var path	=	{
	build: {
		html: "build/", 
		js: "build/js/",
		jsDep: "build/js/dependencies/",
		css: "build/css/",
		cssDep: "build/css/dependencies/",
		img: "build/img/",
		fonts: "build/fonts/",
		data: "build/data/"
	},
	src: {
		html: "src/*.html", 
		js: "src/js/main.js",
		jsDep: "src/js/dependencies/dependencies.js",
		css: "src/css/main.scss",
		cssDep: "src/css/dependencies/dependencies.scss",
		img: "src/img/**/*.*",
		fonts: "src/fonts/**/*.*",
		data: "src/data/**/*.*"
	},
	watch: {
		html: "src/**/*.html", 
		jsDep: "src/js/dependencies/*.js",
		js: "src/js/**/*.js",
		css: "src/css/**/*.scss",
		cssDep: "src/css/dependencies/*.scss",
		img: "src/img/**/*.*",
		fonts: "src/fonts/**/*.*",
		data: "src/data/**/*.*"
	},
	clean: "./build"
};


var config	=	{

	server: {
		baseDir:"./build"
	},

	//tunnel: true,
	host: "lochalhost",
	port: 9000,
	logPrefix: "Mr.Dron"  		  
};


gulp.task('webserver', function () {
	proxy: "example.com",  
    browserSync(config);
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task("html:build",function(){
    gulp.src(path.src.html)
        .pipe(fileInclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream:true}));
});

gulp.task("jsDep:build",function(){
	gulp.src(path.src.jsDep)
		.pipe(fileInclude())
		.pipe(uglify())
		.pipe(gulp.dest(path.build.jsDep))
		.pipe(reload({stream:true}));
});


gulp.task("js:build",function(){
	gulp.src(path.src.js)
		.pipe(fileInclude())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream:true}));
});



gulp.task("cssDep:build",function(){
	gulp.src(path.src.cssDep)
		//.pipe(sourcemaps.init())
		.pipe(fileInclude())
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cssmin())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.cssDep))
		.pipe(reload({stream:true}));
});



gulp.task("css:build",function(){
	gulp.src(path.src.css)
		.pipe(sourcemaps.init())
		.pipe(fileInclude())
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream:true}));
});


gulp.task("image:build",function(){
	gulp.src(path.src.img)
	.pipe(imagemin({
		prorgessive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()],
		interlaced:  true
	}))
	.pipe(gulp.dest(path.build.img))
	.pipe(reload({stream: true}))
});


gulp.task("fonts:build",function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task("data:build",function(){
	gulp.src(path.src.data)
		.pipe(gulp.dest(path.build.data))
});


gulp.task("build",[
	"html:build",
	"cssDep:build",
	"css:build",
	"jsDep:build",
	"js:build",
	"image:build",
	"fonts:build",
	"data:build"
	]);

gulp.task("watch",function(){
	watch([path.watch.html],function(event,cb){
		gulp.start("html:build");
	});

	watch([path.watch.css],function(event,cb){
		gulp.start("css:build");
	});

	watch([path.watch.cssDep],function(event,cb){
		gulp.start("cssDep:build");
	});

	watch([path.watch.jsDep],function(event,cb){
		gulp.start("jsDep:build");
	});

	watch([path.watch.js],function(event,cb){
		gulp.start("js:build");
	});

	watch([path.watch.img],function(event,cb){
		gulp.start("image:build");
	});

	watch([path.watch.fonts],function(event,cb){
		gulp.start("fonts:build");
	});

	watch([path.watch.data],function(event,cb){
		gulp.start("data:build");
	});
});


gulp.task("default",["build","webserver","watch"]);