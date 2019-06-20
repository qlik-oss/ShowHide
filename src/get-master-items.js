define(['qlik'], function (qlik) {
  /**
   * Returns a Promise of an array of master objects within the app.
   */
  var KNOWN_CONTAINERS = [
    'qlik-show-hide-container',
    'qlik-tabbed-container',
    'qlik-trellis-container'
  ];
  return function () {
    var app = qlik.currApp();
    var masterObjectPromise = app.getList('masterobject').then(function (model) {
      // Close the model to prevent any updates.
      app.destroySessionObject(model.layout.qInfo.qId);

      // This is a bit iffy, might be smarter to reject and handle empty lists on the props instead.
      if (!model.layout.qAppObjectList.qItems) return [{ value: '', label: 'No MasterObjects' }];

      // Resolve an array with master objects.
      var masterobjects = model.layout.qAppObjectList.qItems.filter(function (item) {
        return KNOWN_CONTAINERS.indexOf(item.qData.visualization) < 0;
      }).map(function (item) {
        return {
          value: item.qMeta.title + "|" + item.qInfo.qId,
          label: item.qMeta.title.length > 50 ? item.qMeta.title.slice(0, 50) + '...' : item.qMeta.title,
        };
      });
      return masterobjects;
    });
    return masterObjectPromise;
  };
});