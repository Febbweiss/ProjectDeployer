Router.configure({
   layoutTemplate: 'layout'  //can be any template name
 });


Router.map(function () {
  this.route('home', {
    path: '/',
  });
  this.route('projects', {
    waitOn: function() {
        return Meteor.subscribe('projects');
    },
    action: function() {
        if (this.ready()) {
            this.render();
        } else {
            this.render('Loading');
        }
    }
  });
  this.route('project_details', {
      path: '/project/:_id',
      waitOn: function() {
        return [Meteor.subscribe('projects', this.params._id), Meteor.subscribe('deployments', this.params._id)];
      },
      data: function () {
        return ProjectService.get(this.params._id);
      },
      action: function() {
          if (this.ready()) {
            this.render();
        } else {
            this.render('Loading');
        }
      }
  });
});