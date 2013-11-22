if (Meteor.isClient) {
    Meteor.subscribe('activities');

    Template.activities.activities = function() {
	return Activities.find();	
    };

    Router.configure({
	layoutTemplate: 'layout'
    });

    Router.map(function() {
	this.route('home', {
	    path: '/',
	    template: 'activities'
	});
    });

    Router.map(function() {
	this.route('add', {
	    path: '/add',
	    template: 'addTask'
	});
    });

    Router.map(function() {
	this.route('score', {
	    path: '/score',
	    template: 'score'
	});
    });

    $('.btn-group').button();
}
