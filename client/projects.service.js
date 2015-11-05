Projects = new Mongo.Collection('projects');

ProjectService = {
  list: function() {
    return Projects.find({}, {sort: {label: 1}});
  }
};
