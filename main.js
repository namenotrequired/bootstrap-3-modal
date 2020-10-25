const currentModal = new ReactiveVar(null);

// The public API.
Modal = {
  get: () => currentModal.get(),

  show: (templateName, data, options = {}) => {
    // If there is a shown modal, hide it
    if (currentModal.get()) {
      Modal.hide();
    };

    // Show the modal
    var parentNode = document.body;

    var view = Blaze.renderWithData(Template[templateName], data, parentNode);

    var domRange = view._domrange; // TODO: Don't violate against the public API.

    var $modal = domRange.$('.modal');

    $modal.on('shown.bs.modal', () => {
      $modal.find('[autofocus]').focus();
    });

    $modal.on('hidden.bs.modal', () => {
      Blaze.remove(view);
    });

    $modal.name = templateName;

    currentModal.set($modal);

    $modal.modal(options);
  },

  hide: () => {
    const $currentModal = currentModal.get();
    if (!$currentModal) return;

    const { name = '' } = $currentModal;

    $currentModal.modal('hide');

    currentModal.set(null);

    return name;
  },
};
