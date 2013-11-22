mysql = undefined;
connection = undefined;

if (Meteor.isServer) {

    queryTodos = function() {
	connection.connect();
	var ownerName = 'Will Kessler';
	var energyQuery =
	    "select description,energy,marked_today,for_benefit_name1,recurring,activity_id,due_on from activity where description > '' and completed <> 'Y' and owner_name = '" + ownerName + "' and (owner_status is NULL or owner_status = 'processed') order by recurring, energy desc limit 80";
	
	connection.query(energyQuery, Meteor.bindEnvironment(function(err, rows, fields) {
	    if (err) throw err;
	    for (var i = 0; i < rows.length; ++i) {
		if (typeof( activity = Activities.findOne({activityId: rows[i].activity_id})) == 'undefined' ) {
		    Activities.insert({ activityId  : rows[i].activity_id,
					description : rows[i].description,
					energy      : rows[i].energy,
					benefits    : rows[i].for_benefit_name1
				      });
		} else {
		    Activities.update(activity._id, {$set: { activityId  : rows[i].activity_id,
							     description : rows[i].description,
							     energy      : rows[i].energy,
							     benefits    : rows[i].for_benefit_name1
							   }
						    });
		}
	    }
	}, function(err) { console.log("Couldn't wrap the mysql query callback."); }));
	connection.end();
    };


    Meteor.startup(function () {
	mysql      = Npm.require('mysql');
	// code to run on server at startup
	connection = mysql.createConnection({
	    host     : '173.194.107.229',
	    user     : 'root',
	    password : 'weldon',
	    database : 'Weldon2'
	});
	// queryTodos();
    });
}

