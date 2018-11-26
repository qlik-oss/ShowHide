define(['./get-master-items'], function (getMasterItems) {

    var settingsDefinition = {
        uses: 'settings',
        items: {
            conditionalVis: {
                type: 'array',
                ref: 'conditionalVis',
                label: 'Visualizations',
                itemTitleRef: function (data) { return data.conditionalMasterObject.split('|')[0] },
                allowAdd: true,
                allowRemove: true,
                addTranslation: 'Add Visualization',
                items: {
                    conditionalMasterObject: {
                        type: "string",
                        component: "dropdown",
                        label: "Master Object",
                        ref: "conditionalMasterObject",
                        options: function () {
                            return getMasterItems().then(function (items) {
                                return items;
                            });
                        }
                    },
                    condition: {
                        ref: 'condition',
                        label: 'Show Condition for Chart',
                        type: 'string',
                        defaultValue: '',
                        expression: 'optional',
                        change: function (data, a, b) {
                            //inject = if there isn't one
                            if (data.condition && !data.condition.qStringExpression) {
                                data.condition = { qStringExpression: { qExpr: '=' + data.condition } };
                            }
                        }
                    }
                }
            },
            selections:{
              show:false
            },
            general: {
				items: {
					details: {
						show: false
					}
				}
			},
        }
    };

    var aboutDefinition = {
        component: 'items',
        label: 'About',
        items: {
          header: {
            label: 'Show/hide container',
            style: 'header',
            component: 'text'
          },
          paragraph1: {
            label: 'A container object that can contain several master visualizations. The app developer defines expressions that control which object that is displayed.',
            component: 'text'
          },
          paragraph2: {
            label: 'Show/hide container is based upon an extension created by Fady Heiba at QlikTech International AB.',
            component: 'text'
          }
        }
      };

    return {
        type: "items",
        component: "accordion",
        items: {
            settings: settingsDefinition,
            about: aboutDefinition 
        }
    }

});