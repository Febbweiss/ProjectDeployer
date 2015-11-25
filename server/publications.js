Meteor.publish('projects', function() {
  return ProjectService.list();
});

Meteor.publish('deployment', function(id) {
  return DeploymentService.get(id);
});

Meteor.publish('deployments', function(project_id) {
  return DeploymentService.list(project_id);
});