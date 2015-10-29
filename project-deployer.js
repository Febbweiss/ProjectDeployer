Projects = new Mongo.Collection('projects');

ProjectService = {
  insert: function(label, git_url, public_url, commands, callback) {
    Projects.insert({
      label: label,
      git_url: git_url,
      public_url: public_url,
      commands: commands
    }, callback);
  },
  
  update: function(id, label, git_url, public_url ,commands) {
    Projects.update(
      id, 
      { $set: { 
        label: label,
        git_url: git_url,
        public_url: public_url,
        commands: commands
        } 
      }
    );
  },
  
  delete: function(id) {
    Projects.remove(id);
  },
  
  get: function(id) {
    return Projects.findOne({_id: id});
  },
  
  list: function() {
    return Projects.find({}, {sort: {label: 1}});
  }
};

if (Meteor.isClient) {
  Meteor.subscribe('projects');

  Template.management.helpers({
    projects: function () {
      return ProjectService.list();
    }
  });

  Template.projectForm.onRendered(function() {
     new Clipboard('.btn.clipboard');
  });
  
  Template.projectForm.events({
    'submit .new-project': function (event) {
        event.preventDefault();
        var form = event.target;
        if( form.id.value ) {
          Meteor.call('editProject',form.id.value, form.label.value, form.git_url.value, form.public_url.value, form.commands.value);
          form.id.value = '';
        } else {
          Meteor.call('addProject', form.label.value, form.git_url.value, form.public_url.value, form.commands.value);
        }
        
        Session.set('projectToEdit', undefined);
        form.label.value = '';
        form.git_url.value = '';
        form.public_url.value = '';
        form.commands.value = '';
    },
    
    'click .cancel': function(event) {
      event.preventDefault();
      
      Session.set('projectToEdit', undefined);
    },
    
    'click .trash': function(event) {
      event.preventDefault();
      
      Meteor.call('deleteProject', Session.get('projectToEdit')._id);
      Session.set('projectToEdit', undefined);
    }
  });
  
  Template.projectForm.helpers({
    project: function() {
      return Session.get('projectToEdit');
    }, 
    
    editionMode: function() {
      return Session.get('projectToEdit') ? '' : 'hidden';
    },
    
    deployLink: function() {
      return Meteor.absoluteUrl('deploy?token=XXXX&project_id=' + Session.get('projectToEdit')._id);
    }
  });
  
  Template.project.events({
    'click .edit': function(event) {
      event.preventDefault();
      return Meteor.call('getProject', this._id, function(error, result) {
        Session.set('projectToEdit', result);
      });
    },
  });
  
}

if (Meteor.isServer) {
  Meteor.publish('projects', function() {
      return Projects.find({});
  });
}

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
