sap.ui.define(['app/scanner/controller/BaseController', 'app/scanner/controls/ExtScanner'], function(BaseController, ExtScanner) {
  'use strict';

  return BaseController.extend('app.scanner.controller.StartPage', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oScanner = new ExtScanner({
        settings: true,
        valueScanned: this.onScanned.bind(this),
        decoderKey: 'text',
        decoders: this.getDecoders(),
      });
    },

    onScanned: function(oEvent) {
      this.oMainModel.setProperty('/scannedValue', oEvent.getParameter('value'));
    },

    onScan: function() {
      this.oScanner.open();
    },

    getDecoders: function() {
      return [
        {
          key: 'PDF417-UII',
          text: 'PDF417-UII',
          decoder: this.parserPDF417UII,
        },
        {
          key: 'text',
          text: 'TEXT',
          decoder: this.parserText,
        },
      ];
    },

    parserText: function(oResult) {
      var sText = '';
      var iLength = oResult.text.length;
      for (var i = 0; i !== iLength; i++) {
        if (oResult.text.charCodeAt(i) < 32) {
          sText += ' ';
        } else {
          sText += oResult.text[i];
        }
      }
      return sText;
    },

    parserPDF417UII: function(oResult) {
      // we expect that
      // first symbol of UII (S - ASCII = 83) or it just last group
      var sText = oResult.text || '';
      if (oResult.format && oResult.format === 10) {
        sText = '';
        var iLength = oResult.text.length;
        var aChars = [];
        for (var i = 0; i !== iLength; i++) {
          aChars.push(oResult.text.charCodeAt(i));
        }
        var iStart = -1;
        var iGRCounter = 0;
        var iGroupUII = -1;
        var sTemp = '';
        aChars.forEach(function(code, k) {
          switch (code) {
            case 30:
              if (iStart === -1) {
                iStart = k;
                sTemp = '';
              } else {
                sText = sTemp;
                iGRCounter = -1;
              }
              break;
            case 29:
              iGRCounter += 1;
              break;
            default:
              if (iGRCounter > 2 && code === 83 && iGRCounter > iGroupUII) {
                sTemp = '';
                iGroupUII = iGRCounter;
              }
              if (iGroupUII === iGRCounter) {
                sTemp += String.fromCharCode(code);
              }
          }
        });
        if (sText) {
          sText = sText.slice(1);
        }
      }
      return sText;
    },
  });
});
