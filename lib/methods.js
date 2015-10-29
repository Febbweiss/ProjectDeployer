Meteor.methods({
  listProjects: function() {
    return ProjectService.list();
  },
  
  getProject: function(id) {
    return ProjectService.get(id);
  },
  
  addProject: function(label, git_url, public_url ,commands) {
    ProjectService.insert(label, git_url, public_url ,commands);
  },
  
  editProject: function(id, label, git_url, public_url ,commands) {
    ProjectService.update(id, label, git_url, public_url ,commands);
  },
  
  deleteProject: function(id) {
    ProjectService.delete(id);
  }
});
