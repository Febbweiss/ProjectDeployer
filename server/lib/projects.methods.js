Meteor.methods({
  listProjects: function() {
    return ProjectService.list();
  },
  
  getProject: function(id) {
    return ProjectService.get(id);
  },
  
  addProject: function(label, git_url, public_url ,commands, run, variables) {
    return ProjectService.insert(label, git_url, public_url ,commands, run, variables, function(errors, id) {
      if( id ) {
        DeploymentService.create(ProjectService.get(id));
      }
    });
  },
  
  editProject: function(id, label, git_url, public_url ,commands, run, variables) {
    ProjectService.update(id, label, git_url, public_url ,commands, run, variables, function(errors, updated_count) {
      if( updated_count ) {
        DeploymentService.update(id);
      }
    });
  },
  
  deleteProject: function(id) {
    ProjectService.delete(id, function(errors) {
      if( ! errors ) {
        DeploymentService.delete(id);
      }
    });
  }
});
