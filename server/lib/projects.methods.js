Meteor.methods({
  listProjects: function() {
    return ProjectService.list();
  },
  
  getProject: function(id) {
    return ProjectService.get(id);
  },
  
  addProject: function(label, git_url, public_url ,commands) {
    return ProjectService.insert(label, git_url, public_url ,commands, function(errors, id) {
      if( id ) {
        /*DeploymentService.deploy(ProjectService.get(id), function(errors, deploymentId) {
          
        });*/
      }
    });
  },
  
  editProject: function(id, label, git_url, public_url ,commands) {
    ProjectService.update(id, label, git_url, public_url ,commands);
  },
  
  deleteProject: function(id) {
    ProjectService.delete(id);
  }
});
