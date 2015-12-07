Template.projects.helpers({
  projects: function () {
    return ProjectService.list();
  }
});

Template.projectForm.onRendered(function() {
   new Clipboard('.btn.clipboard');
   Session.set('vars', []);
   $('.variables input').val('');
});

Template.projectForm.events({
  'submit .new-project': function (event) {
      event.preventDefault();
      var form = event.target,
          variables = Session.get('vars'),
          callback = function(errors, result) {
            
            if( errors ) {
              
            } else {
              Session.set('projectToEdit', undefined);
              Session.set('vars', []);
              $('.new-project input').val('');
              $('.new-project textarea').val('');
            }
          };
      if( form.id.value ) {
        Meteor.call('editProject',
            form.id.value, 
            form.label.value, 
            form.git_url.value, 
            form.public_url.value, 
            form.commands.value, 
            form.run.value, 
            variables,
            callback);
      } else {
        Meteor.call('addProject', 
            form.label.value, 
            form.git_url.value, 
            form.public_url.value, 
            form.commands.value, 
            form.run.value, 
            variables,
            callback);
      }
  },
  
  'click .cancel': function(event) {
    event.preventDefault();
    
    Session.set('projectToEdit', undefined);
    Session.set('vars', []);
    $('.variables input').val('');
  },
  
  'click .trash': function(event) {
    event.preventDefault();
    
    Meteor.call('deleteProject', Session.get('projectToEdit')._id);
    Session.set('projectToEdit', undefined);
    Session.set('vars', []);
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
  },
  
  vars: function() {
    return Session.get('vars');
  }
});

Template.variables.events({
  'click .remove': function(event) {
    event.preventDefault();
    var variable = Template.currentData().name
        vars = Session.get('vars');
        
    vars = _.filter(vars, function(object) {
      return object.name !== variable;
    });
    
    Session.set('vars', vars);
  },
  
  'click .add': function(event) {
    event.preventDefault();
    var instance = Template.instance(),
        name = instance.$('.name').val(),
        value = instance.$('.value').val();
        
    var variables = Session.get('vars');
    variables.push({name: name, value: value});
    Session.set('vars', variables);
    Session.set('variables.active', undefined);
    instance.$('.name').val(undefined);
    instance.$('.value').val(undefined);
  }
});

Template.variables.helpers({
  action: function() {
    return Template.currentData() ? 'remove' : 'add';
  },
  
  logo: function() {
    return Template.currentData() ? 'minus' : 'plus';
  },
  
  active: function() {
    var data = Template.currentData(),  
        active = data && data.name && data.value;
        
    return active || Session.get('variables.active') ? '' : 'disabled';
  },
  
  readonly: function() {
    return Template.currentData() ? 'readonly' : '';
  }
});

Template.variables.events({
  'keyup .name, keyup .value': function(event) {
    var instance = Template.instance(),
        name = instance.$('.name').val(),
        value = instance.$('.value').val();

    Session.set('variables.active', name && value);
  }
});

Template.project.events({
  'click .edit': function(event) {
    event.preventDefault();
    return Meteor.call('getProject', this._id, function(error, result) {
      Session.set('projectToEdit', result);
      Session.set('vars', result.variables || []);
    });
  },
});