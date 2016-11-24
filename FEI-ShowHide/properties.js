/*global define*/
define( [
    'jquery',
    'underscore',
    'qlik',
    'ng!$http',
    'ng!$q'
], function ($, _, qlik, $http, $q) {

    var app = qlik.currApp();

    // ****************************************************************************************
    // Helper Promises
    // ****************************************************************************************

    var getmasterObjectList = function () {
        var defer = $q.defer();

        app.getAppObjectList('masterobject', function ( data ) {
            var masterObjects = [];
            var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
                return item.qData.rank;
            } );
            _.each( sortedData, function ( item ) {
                masterObjects.push( {
                    value: item.qInfo.qId,
                    label: item.qMeta.title
                } );
            } );
            return defer.resolve( masterObjects );
        } );

        return defer.promise;
    };

    // ****************************************************************************************
    // Layout
    // ****************************************************************************************

    var noOfObjects = {
        ref: "props.noOfObjects",
        component: "dropdown",
        type: "integer",
        label: "No. of Objects",
        options: [
            {value: 2,
             label: "2 Objects"},
            {value: 3,
             label: "3 Objects"},
            {value: 4,
             label: "4 Objects"},
            {value: 5,
             label: "5 Objects"},
            {value: 6,
             label: "6 Objects"},
            {value: 7,
             label: "7 Objects"},
            {value: 8,
             label: "8 Objects"},
            {value: 9,
             label: "9 Objects"},
            {value: 10,
             label: "10 Objects"}
        ],
        defaultValue: 3
    };

    var masterObject0 = {
        type: "string",
        component: "dropdown",
        label: "Default Master Object:",
        ref: "props.masterObject0",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 2;
        }
    };

    var condition1 = {
        ref: "props.condition1",
        label: "Show Condition for Chart 1",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 2;
        }
    };

    var masterObject1 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 1:",
        ref: "props.masterObject1",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 2;
        }
    };

    var condition2 = {
        ref: "props.condition2",
        label: "Show Condition for Chart 2",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 3;
        }
    };

    var masterObject2 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 2:",
        ref: "props.masterObject2",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 3;
        }
    };

    var condition3 = {
        ref: "props.condition3",
        label: "Show Condition for Chart 3",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 4;
        }
    };

    var masterObject3 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 3:",
        ref: "props.masterObject3",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 4;
        }
    };

    var condition4 = {
        ref: "props.condition4",
        label: "Show Condition for Chart 4",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 5;
        }
    };

    var masterObject4 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 4:",
        ref: "props.masterObject4",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 5;
        }
    };

    var condition5 = {
        ref: "props.condition5",
        label: "Show Condition for Chart 5",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 6;
        }
    };

    var masterObject5 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 5:",
        ref: "props.masterObject5",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 6;
        }
    };

    var condition6 = {
        ref: "props.condition6",
        label: "Show Condition for Chart 6",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 7;
        }
    };

    var masterObject6 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 6:",
        ref: "props.masterObject6",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 7;
        }
    };

    var condition7 = {
        ref: "props.condition7",
        label: "Show Condition for Chart 7",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 8;
        }
    };

    var masterObject7 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 7:",
        ref: "props.masterObject7",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 8;
        }
    };

    var condition8 = {
        ref: "props.condition8",
        label: "Show Condition for Chart 8",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 9;
        }
    };

    var masterObject8 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 8:",
        ref: "props.masterObject8",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 9;
        }
    };

    var condition9 = {
        ref: "props.condition9",
        label: "Show Condition for Chart 9",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.noOfObjects >= 10;
        }
    };

    var masterObject9 = {
        type: "string",
        component: "dropdown",
        label: "Master Object 9:",
        ref: "props.masterObject9",
        options: function () {
            return getmasterObjectList().then( function ( items ) {
                return items;
            } );
        },
        show: function ( data ) {
            return data.props.noOfObjects >= 10;
        }
    };

    var calculationConditionSwitch = {
        ref: "props.calculationConditionSwitch",
        type: "boolean",
        component: "switch",
        label: "Calculation Condition Switch",
        options: 
        [{
            value: true,
            label: "On"
        },
         {
             value: false,
             label: "Off"
         }],
        defaultValue: false
    }

    var calculationCondition = {
        ref: "props.calculationCondition",
        label: "Calculation Condition",
        type: "integer",
        defaultValue:"0",
        expression: "optional",
        show: function ( data ) {
            return data.props.calculationConditionSwitch == true;
        }
    };

    var calculationConditionMessage = {
        ref: "props.calculationConditionMessage",
        label: "Calculation Condition Message",
        type: "string",
        defaultValue:"",
        expression: "optional",
        show: function ( data ) {
            return data.props.calculationConditionSwitch == true;
        }
    };
    
    // ****************************************************************************************
    // Setup
    // ****************************************************************************************
    var settings = {
        uses: "settings",
        label: "Settings",
        items: {
            general: {
                items: {
                    showTitles: {
                        defaultValue: false
                    }
                }
            },
            bookmarkSettings: {
                type: "items",
                label: "Settings",
                items: {
                    noOfObjects: noOfObjects,
                    masterObject0: masterObject0,
                    masterObject1: masterObject1,
                    condition1: condition1,
                    masterObject2: masterObject2,
                    condition2: condition2,
                    masterObject3: masterObject3,
                    condition3: condition3,
                    masterObject4: masterObject4,
                    condition4: condition4,
                    masterObject5: masterObject5,
                    condition5: condition5,
                    masterObject6: masterObject6,
                    condition6: condition6,
                    masterObject7: masterObject7,
                    condition7: condition7,
                    masterObject8: masterObject8,
                    condition8: condition8,
                    masterObject9: masterObject9,
                    condition9: condition9
                }
            },
            calculationCondition: {
                type: "items",
                label: "Calculation Condition",
                items: {
                    calculationConditionSwitch: calculationConditionSwitch,
                    calculationCondition: calculationCondition,
                    calcualtionConditionMessage: calculationConditionMessage
                }
            }
        }
    };

    var panelDefinition = {
        type: "items",
        component: "accordion",
        items: {
            settings: settings
        }
    };

    // ****************************************************************************************
    // Return Values
    // ****************************************************************************************
    return panelDefinition;
});