# Developing Guidelines

## HTML markdown

* Use pug
* Store pug files in __./dist/views__
* Split every block part of website by new line e.g: __header__, __section__, __footer__

## CSS markdown

* Use sass
* Use sass variables for colors
* Use sass functions and mixins instead of repetition of simmillar properties
* Store sass files in __./src/public/sass/__
* Use only __bootstrap-reboot.min.css__ and __bootstrap-grid.min.css__
* Combine all CSS files together, minified to one line for production after work on website is done

To execute sass watcher run:
```
npm run gulp-sass
```

## Javascrit programming

* Edit only ./src/public/main-script.js file
* Use __vannilla javascript__ instead of jquery whenever possible
* Use duble qoutes instead of single qoutes e.g: "" instead of ''
* End every function call, variable declaration or reassignment by semicolon e.g: ;
* Call functions inside of Jquery __$("document").ready({});__ scope
* 
