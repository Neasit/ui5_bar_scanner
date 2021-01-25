sap.ui.define(['sap/ui/core/UIComponent', 'app/scanner/model/models'], function(
  UIComponent,
  models
) {
  'use strict';

  return UIComponent.extend('app.scanner.Component', {
    metadata: {
      manifest: 'json',
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and
     * calls the init method once.
     * @public
     * @override
     */
    init: function() {
      UIComponent.prototype.init.apply(this, arguments);

      var oData = this.getComponentData() || {};

      this.setModel(models.createDeviceModel(), 'device');

      this.setModel(models.createMainModel());

      this.getRouter().initialize();
    }
  });
});
