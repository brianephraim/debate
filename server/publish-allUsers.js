Meteor.publish("allUsers", function () {
	//TODO: For testing only, remove this
	return Meteor.users.find({}, {fields: {'profile': 1}});
});