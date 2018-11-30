/**
 * @license
 * Copyright (c) 2018 Fady Heiba. All rights reserved.
 * 
 * Copyrights licensed under the terms of the MIT license.
 * Original source <https://github.com/fadyheiba/ShowHide>
 */
define(['qlik', './properties'], function (qlik, properties) {
    /* return the first visualization ID where condition is not 0. */
    function getActiveVisID(conditionalVisList) {
        var activeChart;
        conditionalVisList.forEach(function (condVis) {
            if (!activeChart) {
                //convert to numeric with -1 (true) as the default
                var condVal = condVis.condition ? +condVis.condition : -1;
                //handle the string 'true' as true and all other strings as false
                if (isNaN(condVal)) {
                    condVal = condVis.condition.toLowerCase() === 'true' ? -1 : 0;
                }
                if (condVal !== 0) {
                    activeChart = condVis.conditionalMasterObject.split('|')[1];
                }
            }
        });
        return activeChart;
    };

    return {
        getActiveVisID: getActiveVisID,
        initialProperties: { conditionalVis: [] },
        support: {
            snapshot: false,
            export: false,
            exportData: false
        },
        definition: properties,
        template: '<style>.qv-object-qlik-show-hide-container .qv-inner-object {overflow:visible;}' +
            '.qv-mode-edit .qv-object-qlik-show-hide-container .qv-inner-object {overflow:hidden;}</style>' +
            '<div ng-style="interactStyle()" style="display:block;  width:100%; height:100%; overflow:visible;"></div>',
        controller: function ($scope, $element) {
            // Make sure the selections bar can overlay the extension's boundaries
            //$element.find(".qv-object .qv-inner-object").css('overflow', 'visible');
            $scope.canInteract = $scope.options && $scope.options.interactionState === 1;
            $scope.noSelections = $scope.options && $scope.options.noSelections === true;
            $scope.interactStyle = function () {
                var pointerEventStyle = $scope.object && $scope.object.getInteractionState() === 1 ? 'auto' : 'none';
                return {
                    'pointer-events': pointerEventStyle,
                };
            };

            // check to see if interactionState has changes, if so, re render charts
            $scope.$watch('options.interactionState', function (newVal) {
                var canInteract = newVal === 1;
                if ($scope.canInteract !== canInteract) {
                    $scope.canInteract = canInteract;
                    renderChart()
                }
            });

            // check to see if noSelection has changes, if so, re render charts
            $scope.$watch('options.noSelections', function (newVal) {
                var noSelections = newVal === true;
                if ($scope.noSelections !== noSelections) {
                    $scope.noSelections = noSelections;
                    renderChart()
                }
            });

            // On initial load, get the active visualization ID we should display and initialize the current chart object
            $scope.app = qlik.currApp(this);
            $scope.currentChart = getActiveVisID($scope.component.model.layout.conditionalVis);
            $scope.currentChartModel = null;

            // If we do have a chart ID, render the object.
            if ($scope.currentChart) {
                renderChart();
            }

            // When data has been updated on the server
            $scope.component.model.Validated.bind(function () {
                // Make sure the selections bar can overlay the extension's boundaries
                $element.find(".qv-object .qv-inner-object").css('overflow', 'visible');

                // Get the active visualization ID after the data is updated
                var chart = getActiveVisID($scope.component.model.layout.conditionalVis);

                // If we do have a chart ID and it's a different one than the currentChart, update the currentChart and then render the new object
                if (chart && chart !== $scope.currentChart) {
                    $scope.currentChart = chart;
                    renderChart();
                }
                /* Else if we do not have a chart ID, check if this is the first time we don't have a chart ID. If it is, destroy the current chart object first. If it's not the first time, we can safely assume there aren't any leftover unused objects.*/
                else if (!chart && chart !== $scope.currentChart) {
                    if ($scope.currentChartModel) {
                        $scope.currentChart = null;
                        destroyObject();
                    }
                }
                else if (!chart && chart === $scope.currentChart) {
                    $scope.currentChartModel = null;
                }
            });

            /* If there is no current chart object (on initialization or a null chart ID), do the getObject and assign it to our template div.
               Else if there is a current chart object, destroy it first, then do the getObject and assign it to our template div. */
            function renderChart() {
                if ($scope.currentChartModel == null) {
                    createObject();
                } else {
                    $scope.currentChartModel.enigmaModel.endSelections(true)
                        .then(destroyObject)
                        .then(createObject);
                }
            };

            // Creates a chart with the content of the master object
            function createObject() {
                var objectOptions = {
                    noInteraction: !$scope.canInteract,
                    noSelections: $scope.noSelections
                };

                $scope.app.getObjectProperties($scope.currentChart).then(function (chartModel) {
                    var newChartId = $scope.layout.qInfo.qId + "_" + $scope.currentChart;
                    $scope.app.createGenericObject({ qInfo: { qId: newChartId } })
                        .then(function (newModel) {
                            newModel.copyFrom($scope.currentChart).then(function () {
                                newModel.getProperties().then(function (props) {
                                    if (!chartModel.properties.qStateName) {
                                        // No qStateName on child, so make it inherit qStateName of this
                                        props.qStateName = $scope.layout.qStateName || '';
                                    }

                                    newModel.setProperties(props).then(function () {
                                        $scope.app.visualization.get(newChartId).then(function (visualization) {
                                            $scope.currentChartModel = visualization.model;
                                            visualization.show($element.find('div'), objectOptions);
                                        });
                                    });
                                });
                            });
                        });
                });
            }

            //Destroy any leftover models to avoid memory leaks of unused objects
            function destroyObject() {
                $element.find(".qv-object").remove();
                return $scope.app.destroySessionObject($scope.currentChartModel.layout.qInfo.qId)
                    .then(function () { $scope.currentChartModel = null; });
            };
        },
    }
});
