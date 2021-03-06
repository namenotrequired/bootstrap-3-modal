bootstrap-3-modal
=================
A Meteor package making it easy to use bootstrap 3 modals in Meteor.

Differences with the original (peppelg:bootstrap-3-modal)
-----

This was forked from peppelg:bootstrap-3-modal. The main differences are

- Adds a reactive `.get()` method; returns the jQuery object of the existing modal (plus a `name` property with the name of the template), or if there is none, `null`
- Our `hide` method takes no arguments; it always hides whatever modal is currently shown, if any
- If a modal is shown while a previous modal is already shown, instead of ignoring the request, we hide the original and show the new one
- This one does not support multiple modals

Install
-----
Include this package with:

```
meteor add bartoftutormundi:bootstrap-3-modal
```

**Note 1:** This package does not include bootstrap automatically. In order for this package to work, you must include bootstrap 3 in your meteor project. If you aren't using it yet, one way to add bootstrap 3 to your project is by adding the package `twbs:bootstrap`:

```
meteor add twbs:bootstrap
```

Usage
-----
To define your own modals, simply define new templates containing your modals (**important**: your modals must have the class `modal`):

```html
<template name="exampleModal">
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title">Modal example</h4>
        </div>

        <div class="modal-body">
          <p>A modal example.</p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
</template>
```

Modal templates can be used as ordinary templates in Meteor (`onCreated`, `helpers`, `onRendered`, `events` and `onDestroyed` all work as you're used to).

No modal is shown (or even inserted into the DOM) by default. By calling `Modal.show(<templateName>)`, the modal is inserted into the DOM and shown.

```javascript
Meteor.startup(function(){
  // Show the example modal 3 seconds after startup.
  setTimeout(function(){
    Modal.show('exampleModal')
  }, 3000)
})
```

If a second argument is passed to `Modal.show` (`Modal.show(<templateName>, <dataContext>)`), it will be used as the data context for the template (works as the `data` parameter for [Blaze.renderWithData](http://docs.meteor.com/#/full/blaze_renderwithdata)).

Please note that in order to render your data reactively, `<dataContext>` must be a function that returns reactive object:
```javascript
  Modal.show('exampleModal', function () {
    return MyCollection.findOne(itemId);
  });
```

A third argument can be passed to `Modal.show` (`Modal.show(<templateName>, <dataContext>, <modalOptions>)`). It will be used as the `options` (only) parameter to the modal() call. For example, if you want to disable closing the modal dialog when the user clicks outside of it, you'd pass

```javascript
{
  backdrop: 'static'
  keyboard: false
}
```

The modal can be removed by calling `Modal.hide()`.

Opening a new modal closes the previous
---------------------
As written in [the documentation for Bootstrap](http://getbootstrap.com/javascript/#modals),
Bootstrap does not support showing multiple modals at a time:

> Overlapping modals not supported

> Be sure not to open a modal while another is still visible. Showing more than one modal at a time requires custom code.

Instead, if a modal is open when you open another one, the previous will be closed.

