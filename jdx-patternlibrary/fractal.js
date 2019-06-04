'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Jdx Prototype');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'src'));

/*
 * Tell Fractal where to look for documentation pages.
 */
// fractal.docs.set('path', path.join(__dirname, 'src/docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

fractal.components.set('default.preview', '@preview');


fractal.web.set('builder.dest', __dirname + '/patternlibrary');

fractal.components.set('label', 'Prototype'); // default is 'Components'