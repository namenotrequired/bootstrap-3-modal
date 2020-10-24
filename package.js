Package.describe({
  summary: 'Simple usage of bootstrap 3 modals',
  version: '2.0.0',
  name: 'bartoftutormundi:bootstrap-3-modal',
  git: 'https://github.com/namenotrequired/bootstrap-3-modal.git',
});

Package.onUse((api) => {
  api.versionsFrom('METEOR@1.0.3');

  api.use([
    'templating',
    'jquery',
  ], 'client');

  api.addFiles([
    'main.js',
  ], 'client');

  api.export('Modal', 'client');
});
