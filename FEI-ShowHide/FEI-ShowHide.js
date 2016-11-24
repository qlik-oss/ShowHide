define( ["qlik", "jquery",'./properties'],
       function (qlik, $, properties) {
    //    'use strict';
    
    return {
        support : {
            snapshot: true,
            export: true,
            exportData : false
        },
        definition: properties,
        paint: function ($element, layout) {
            console.log("------------------------------------",layout);
            
            if(eval('typeof currentVisID_'+layout.qInfo.qId+'=="undefined"')){
                var r = Math.floor(Math.random()*10001);
                eval('currentVisID_'+layout.qInfo.qId+' = 0;');
            }
            
            var app = qlik.currApp(this); 

            var conditionToShow = 0;  
            var masterObjectIDs = [];
            var conditionCounter = 0;

            //Resetting unused conditions
            for(var i=layout.props.noOfObjects; i<=9; i++){
                eval('layout.props.condition' + i +'=0;');
            }

            //Collecting masterObjectIDs and summing used conditions
            for(var i=0; i<layout.props.noOfObjects; i++){
                masterObjectIDs.push(eval('layout.props.masterObject' + i));
                if(i!=0){
                    conditionCounter = conditionCounter + parseInt(eval('layout.props.condition'+i));
                }
            }
            console.log(layout.qInfo.qId, 'Master Object IDs: ',masterObjectIDs);

            //Show Vis 9
            if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9==1){
                conditionToShow = 9;
            }
            //Show Vis 8
            else if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8==1 && layout.props.condition9!=1){
                conditionToShow = 8;
            }
            //Show Vis 7
            else if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7==1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 7;
            }
            //Show Vis 6
            else if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6==1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 6;
            }
            //Show Vis 5
            else if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5==1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 5;
            }
            //Show Vis 4
            else if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4==1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 4;
            }
            //Show Vis 3
            else if(layout.props.condition1!=1 && layout.props.condition2!=1 && layout.props.condition3==1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 3;
            }
            //Show Vis 2
            else if(layout.props.condition1!=1 && layout.props.condition2==1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 2;
            }
            //Show Vis 1
            else if(layout.props.condition1==1 && layout.props.condition2!=1 && layout.props.condition3!=1 && layout.props.condition4!=1 && layout.props.condition5!=1 && layout.props.condition6!=1 && layout.props.condition7!=1 && layout.props.condition8!=1 && layout.props.condition9!=1){
                conditionToShow = 1;
            }
            //Show Default Vis
            else if(conditionCounter>1 || conditionCounter==0){
                conditionToShow = 0;
            }

            if(conditionToShow==0){console.log(layout.qInfo.qId, 'Showing default condition because:');}
            else{console.log(layout.qInfo.qId, 'Showing condition '+conditionToShow+' because:');}

            for(var i=1; i<layout.props.noOfObjects; i++){console.log(layout.qInfo.qId, '   -Object '+i+' Condition: ', eval('layout.props.condition'+i));}
            console.log(layout.qInfo.qId, '   -Sum of conditions (Anything != 1 is default): ', conditionCounter);

            if(eval('currentVisID_'+layout.qInfo.qId) == masterObjectIDs[conditionToShow] && document.getElementById('ShowHideVis_' + layout.qInfo.qId)!=null){
                console.log(layout.qInfo.qId, 'Previous Vis ID was: ', eval('currentVisID_'+layout.qInfo.qId));
                console.log(layout.qInfo.qId, 'Showing the same Vis ID since the condition persisted: ', masterObjectIDs[conditionToShow]);
            }
            else{
                $( "div[id*=ShowHideVis_" + layout.qInfo.qId +"]").remove();
                var html = '<div id="ShowHideVis_' + layout.qInfo.qId + '" style="display:block; margin-top:35px; width:100%; height:100%"></div>';
                $element.html(html);
                if(layout.props.calculationConditionSwitch){
                    console.log(layout.props.calculationConditionMessage);
                    if(layout.props.calculationCondition==1){
                        var getVis = app.getObject(document.getElementById('ShowHideVis_' + layout.qInfo.qId), masterObjectIDs[conditionToShow]);
                        getVis.then(function(){
                            eval('currentVisID_'+layout.qInfo.qId+' = masterObjectIDs[conditionToShow];'); 
                        }).then(function(){
                            console.log(layout.qInfo.qId, 'Previous Vis ID was: ', eval('currentVisID_'+layout.qInfo.qId));
                            console.log(layout.qInfo.qId, 'Changing container to VisID: ', masterObjectIDs[conditionToShow]);
                        });
                    }
                    else{
                        eval('currentVisID_'+layout.qInfo.qId+' = 0;'); 
                        $( "div[id*=ShowHideVis_" + layout.qInfo.qId +"]").remove();
                        var html = '<p>'+layout.props.calculationConditionMessage+'</p>';
                        $element.html(html);
                    }
                }
                else if(masterObjectIDs[conditionToShow]!=""){                    
                    var getVis = app.getObject(document.getElementById('ShowHideVis_' + layout.qInfo.qId), masterObjectIDs[conditionToShow]);
                    getVis.then(function(){
                        eval('currentVisID_'+layout.qInfo.qId+' = masterObjectIDs[conditionToShow];'); 
                    }).then(function(){
                        console.log(layout.qInfo.qId, 'Previous Vis ID was: ', eval('currentVisID_'+layout.qInfo.qId));
                        console.log(layout.qInfo.qId, 'Changing container to VisID: ', masterObjectIDs[conditionToShow]);
                    });
                }
                else{
                    eval('currentVisID_'+layout.qInfo.qId+' = 0;'); 
                }
            }
        }
    }
});