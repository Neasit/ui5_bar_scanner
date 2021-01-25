sap.ui.define(['app/scanner/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.scanner.controller.NotFound', {
    /**
     * Navigates to the masterPR when the link is pressed
     * @public
     */
    onLinkPressed: function() {
      this.getRouter().navTo('StartPage');
    },
  });
});
