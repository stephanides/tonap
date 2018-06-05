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

* Call functions inside of Jquery __$("document").ready({});__ scope
* Edit only __./src/public/main-script.js__ file
* Use __vannilla javascript__ instead of __jquery__ whenever possible
* Use duble qoutes instead of single qoutes e.g: __""__, instead of __''__
* End every function call, variable declaration or reassignment by semicolon e.g: __;__
* Use __target.addEventListener("click", listener[, options]);__ instead of HTML onclick attribude function call
* Use __Array.forEach.call(<Array>, function[, event])__ instead of _for_ loop to iterate over navigation links or multiple links with same action
* Wrap all __if else__ statement on curly bracket and use three equals sign, instead of two to compare also the type of variable e.g:

```
var a = "string";
var b = 7;

if(a === b) {
  console.log("A is string equal to B"); // false
} else {
  console.log("A is not equal to B"); // true
}
``` 

* Run javascript file modification watch by command:
```
npm run gulp-script
```