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
  
  update: function(id, label, git_url, public_url ,commands, callback) {
    Projects.update(
      id, 
      { $set: { 
        label: label,
        git_url: git_url,
        public_url: public_url,
        commands: commands
        } 
      },
      callback
    );
  },
  
  delete: function(id, callback) {
    Projects.remove(id, callback);
  },
  
  get: function(id) {
    return Projects.findOne({_id: id});
  },
  
  list: function() {
    return Projects.find({}, {sort: {label: 1}});
  }
};
