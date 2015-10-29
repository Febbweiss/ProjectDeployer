Meteor.publish('projects', function() {
  return ProjectService.list();
});