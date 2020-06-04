import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
    rebornS: service('reborn-service'), 

    model(params) {
        return RSVP.hash({
            "event": this.rebornS.getEventById(params.id),
            "results": this.rebornS.getResults(params.id).then(function(items) {
                return items.map(function(result) {
                    var time = result["playerResult"];
                    var minutes = Math.floor(time / 60000).toString().padStart(2, "0");
                    var seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, "0");
                    var miliseconds = Math.floor(((time % 60000) % 1000) / 10).toString().padStart(2, "0");
                    result["goodTime"] = minutes + ":" + seconds + ":" + miliseconds;

                    if(result["raceType"] == "s"){
                        var minutes2 = Math.floor(result["raceValue"] / 60);
                        var secs = result["raceValue"] % 60;
                        if(minutes2 / 10 == 0){
                           result["formattedCustomTime"] = "0" + minutes2 + ":" + secs + ":00"; 
                        }else{
                            result["formattedCustomTime"] = minutes2 + ":" + secs + ":00";
                        }
                    }
                    
                    return result
                })
            }) 
        });
    }
});