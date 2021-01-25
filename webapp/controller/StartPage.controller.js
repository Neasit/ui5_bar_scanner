sap.ui.define(
  [
    'app/scanner/controller/BaseController',
    'app/scanner/controls/ExtScanner'
  ],
  function(BaseController, ExtScanner) {
    'use strict';

    return BaseController.extend('app.scanner.controller.StartPage', {
      onInit: function() {
        BaseController.prototype.init.apply(this, arguments);
        this.oScanner = new ExtScanner({
          valueScanned: this.onScanned.bind(this)
        });
        this.oScanner.setModel(this.getOwnerComponent().getModel('device'), 'device');
      },

      onScanned: function(oEvent) {
        this.oMainModel.setProperty('/scannedValue', oEvent.getParameter('value'));
      },

      onScan: function() {
        this.oScanner.open();
      }
    });
  }
);
