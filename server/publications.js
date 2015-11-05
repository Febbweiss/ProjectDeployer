Meteor.publish('projects', function() {
  return ProjectService.list();
});

Meteor.publish('deployment', function(id) {
    return DeploymentService.get(id);
});