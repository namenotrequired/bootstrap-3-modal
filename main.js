const currentModalDep = new Tracker.Dependency();

let currentModal;

// The public API.
Modal = {
  get: () => {
    currentModalDep.depend();
    return currentModal;
  },

  show: (templateName, data, options = {}) => {
    // If there is a shown modal, hide it
    if (currentModal) {
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

    currentModal = $modal;
    currentModalDep.changed();

    $modal.modal(options);
  },

  hide: () => {
    if (!currentModal) return;

    const { name = '' } = currentModal;

    currentModal.modal('hide');

    currentModal = null;
    currentModalDep.changed();

    return name;
  },
};
