nav.js
===========================

`nav.js` is a JavaScript library for creating an opening and closing navbar. It provides all of the logic necessary, you just provide the styles!  And, at just **612 bytes** minified & gzipped, it won't hurt your site's load time.

## Quick Start

`nav.js` is easy to use. Add the script to your page, create a `new Nav()`, pass in any configurations you need, and call `enable()`.

#### Step 0: Install

[Download the latest release][download].

#### Step 1: Create your markup

```html
<!-- Include the minified source file. -->
<script src="nav.min.js"></script>

<!-- The body will get the `nav-open` class 
     when the toggle is clicked -->
<body>
    
    <!-- The nav will also get the `nav-open` class 
         when the toggle is clicked -->
    <nav id="my-nav">

        <!-- This button, when clicked, will open the nav -->
        <div class="nav-toggle"></div>
    </nav>
</body>
```

#### Step 2: Write your CSS

As a reminder, this `nav.js` doesn't provide any actual navbar styles. It's up to you what you want your navbar to look like! Make sure to style the body and navbar in both open and non-open states!

```css
body.nav-open {
    // Styles
}

#my-nav:not(.nav-open) {
    // Closed Styles
}

#my-nav.nav-open {
    // Open Styles
}
```

#### Step 3: Create a `new Nav` and call `enable()`

```javascript
var staple = new Nav({
  navId: 'my-nav'
}).enable();
```

## API

### Nav([_options_])

The `Nav` constructor will setup the new Nav. You can customize the instance by passing the `options` parameter. The example below uses all options and their defaults:

```javascript
var opts = {
    navId: 'nav',
    classPrefix: 'nav',
    beforeOpen: function(resolve, reject) { resolve(); },
    afterOpen: function() {},
    onOpenError: function(errorData) {},
    beforeClose: function(resolve, reject) { resolve(); },
    afterClose: function() {},
    onCloseError: function(errorData) {},
};
var nav = new Nav(opts).enable();
```

### Options

##### `options`
> **Type**: `Object`
> 
> **Default**: See below
> 
> **Description**: Configuration options.

##### `options.navId`
> **Type**: `string`
> 
> **Default**: `'nav'`
> 
> **Description**: The CSS ID of navbar.

##### `options.classPrefix`
> **Type:** `string`
> 
> **Default:** `'nav'`
> 
> **Description:** The prefix associated with this library that should be
> prepended to class names within the navbar, and open states on the
> navbar and body.

##### `options.beforeOpen`
> **Type:** `function`
> 
> **Default:** `function(resolve, reject) { resolve(); }`
> 
> **Description:** Called before the navbar is opened.
> 
> **Parameters:**
> 
> - `resolve` _function_ - call this to open the navbar.
> - `reject` _function_ - call this with any arbitrary `errorData` attribute, to call `onOpenError`.

##### `options.beforeOpen`
> **Type:** Function
> 
> **Default:** function() { }
> 
> **Description:** Called after the navbar is opened.

##### `options.onOpenError`
> **Type:** Function
> 
> **Default:** function(errorData) { }
> 
> **Description:** Called if there was an error opening the navbar.
> 
> **Parameters:**
> - `errorData` _object_ - arbitrary error data passed from calling the `reject` function in `beforeOpen`.

##### `options.beforeClose`
> **Type:** Function
> 
> **Default:** function(resolve, reject) { resolve(); }
> 
> **Description:** called before the navbar is closed.
> 
> **Parameters:**
> 
> - `resolve` _function_ - call this to close the navbar.
> - `reject` _function_ - call this with any arbitrary `errorData` attribute, to call `onCloseError`.

##### `options.afterClose`
> **Type:** Function
> 
> **Default:** function() { }
> 
> **Description:** Called after the navbar is closed.

###### `options.onCloseError`
> **Type:** Function
> 
> **Default:** function(errorData) { }
> 
> **Description:** Called if there was an error closing the navbar.
> 
> **Parameters:**
> - `errorData` _object_ - arbitrary error data passed from calling the `reject` function in `beforeClose`.

### enable()

Enable the nav toggle.

### disable()

Disables the nav toggle, and close the navbar.

### open()

Opens the nav, adding the `nav-open` class on both the <body> and on 
the navbar itself.

> Note: the class prefix `nav` can be modified through the `classPrefix`
> parameter to the `new Nav()` constructor.

### close()

Closes the nav, removing the `nav-open` class on both the <body> and on 
the navbar itself.

> Note: the class prefix `nav` can be modified through the `classPrefix`
> parameter to the `new Nav()` constructor.

[download]: https://github.com/schlosser/nav.js/releases/download/v0.1/nav.min.js
