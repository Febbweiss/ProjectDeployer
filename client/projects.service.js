Projects = new Mongo.Collection('projects');

ProjectService = {
  list: function() {
    return Projects.find({}, {sort: {label: 1}});
  },
  
  get: function(id) {
    return Projects.findOne({_id: id});
  }
};
