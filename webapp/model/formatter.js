sap.ui.define(['sap/ui/core/format/NumberFormat'], function(NumberFormat) {
  'use strict';

  var oFloatNumberFormat = NumberFormat.getFloatInstance(
    {
      maxFractionDigits: 5,
      minFractionDigits: 0,
      groupingEnabled: false,
    },
    sap.m.getLocale()
  );

  return {
    formatFloatLocal: function(sFloat) {
      return oFloatNumberFormat.format(parseFloat(sFloat));
    }
  };
});
