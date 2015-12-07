Deployments = new Mongo.Collection('deployments');

DeploymentService = {
    list: function(id) {
      var deployments = Deployments.find({}, {sort: {timestamp: -1}}),
            altered = deployments.map(function(doc, index, cursor) {
                return _.extend(doc, {index: deployments.count() - index});
              });
      return altered.slice(0, 10);  
    }
};