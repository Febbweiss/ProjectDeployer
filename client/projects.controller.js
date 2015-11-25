Template.projects.helpers({
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