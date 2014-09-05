# angular-lite-accordion [![License][license-image]][license-url]

Lightweight accordion for AngularJS. It differs from other implementations in that it can be used with any markup as it does not enforce its own. If using [Bootstrap][twbs-url], you may prefer [UI Bootstrap][angular-bootstrap-url] which contains an accordion built specifically for it.

## How to install

From your project root, run:

```sh
$ bower install angular-lite-accordion
```

## Features

* No dependencies other than AngularJS
* Complete control over markup
* Support for custom animations

## Usage

The component is broken up in 4 directives which are used as attributes on any element.

```html
<ANY lite-accordion-group close-others="">
  <ANY lite-accordion is-open="" is-disabled="">
    <ANY lite-accordion-toggle="">...</ANY>
    <ANY lite-accordion-body>...</ANY>
  </ANY>
</ANY>
```

### liteAccordionGroup *(optional)*

The `liteAccordionGroup` directive groups multiple `liteAccordion` directives together.

Available options:

| Attribute | Type | Description
| --------- | ---- | -----------
| close-others | `expression` | Controls whether only one accordion instance should be opened at the same time.

### liteAccordion

The `liteAccordion` directive represents a single accordion instance. It is the container for the body and any of its toggles.

Available options:

| Attribute | Type | Description
| --------- | ---- | -----------
| is-open | `expression` | Controls whether the accordion body should be opened.
| is-disabled | `expression` | Controls whether toggles for this accordion should trigger.

### liteAccordionBody

The `liteAccordionBody` directive contains the actual content of the accordion.

### liteAccordionToggle *(optional)*

The `liteAccordionToggle` directive controls the `is-open` attribute of its parent `liteAccordion`.

Available options:

| Attribute | Type | Description
| --------- | ---- | -----------
| liteAccordionBody | `string` | Can be either `open` or `close`. Any other value or leaving it empty means to simply toggle between open and close.

## Animations

The following animations are triggered on `liteAccordionBody`:

**addClass: .ng-hide** - when the `isOpen` attribute is set to a falsy value<br>
**removeClass: .ng-hide** - when the `isOpen` attribute is set to a truthy value

## Example

See the [example](example) folder for a complete example.

## License

[MIT License][license-url]

[angular-url]: https://angularjs.org
[angular-bootstrap-url]: http://angular-ui.github.io/bootstrap/
[build-image]: http://img.shields.io/travis/rochdev/angular-lite-accordion/master.svg?style=flat-square
[build-url]: https://travis-ci.org/rochdev/backbone-ng-view
[license-image]: http://img.shields.io/badge/license-MIT-red.svg?style=flat-square
[license-url]: http://en.wikipedia.org/wiki/MIT_License
[twbs-url]: http://getbootstrap.com
[version-image]: http://img.shields.io/badge/release-0.0.0-orange.svg?style=flat-square
[version-url]: https://github.com/rochdev/angular-lite-accordion