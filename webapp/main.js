sap.ui.define([], function() {
  'use strict';

  var sComponentId = 'app.scanner';
  var oPromise = Promise.resolve(true);
  /*
  if (jQuery.sap.getUriParameters().get('test') !== 'true') {
    oPromise = new Promise(function(resolve, reject) {
      $.ajax('/sap/bc/ui2/app_index/ui5_app_info?id=' + sComponentId)
        .done(function(data) {
          if (data && data[sComponentId]) {
            var moduleDefinition = data[sComponentId];
            moduleDefinition.dependencies.forEach(function(dependency) {
              if (dependency.url) {
                jQuery.sap.registerModulePath(sComponentId, dependency.url);
              }
            });
          } else {
            reject(new Error("No app info found for component '" + sComponentId + "'."));
          }
          resolve(true);
        })
        .fail(function() {
          reject(new Error("Could not fetch app info for component '" + sComponentId + "'. No module paths were registered for dependent libraries."));
        });
    });
  }
  */
  oPromise
    .finally(function() {
      sap.ui.getCore().attachInit(function() {
        sap.ui.require(['sap/m/Shell', 'sap/ui/core/ComponentContainer'], function(Shell, ComponentContainer) {
          new Shell({
            app: new ComponentContainer({
              height: '100%',
              name: sComponentId,
            }),
          }).placeAt('content');
        });
      });
    })
    .catch(function(error) {
      jQuery.sap.log.error(error.message || error);
    });
});
