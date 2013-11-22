if (Meteor.isClient) {
    Meteor.subscribe('activities');

    Template.activities.activities = function() {
	return Activities.find();	
    };

/*
    Template.hello.greeting = function () {
	return "Weldon Healthy To-Do System.";
    };

    Template.hello.events({
	'click input' : function () {
	    // template data, if any, is available in 'this'
	    if (typeof console !== 'undefined')
		console.log("You pressed the button");
	    Meteor.call('queryTodos', function(error, result) {
		console.log('We queried todos');
		console.dir(result);
	    });
	}
    });
*/
}
