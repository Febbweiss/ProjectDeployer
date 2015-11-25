Deployments = new Mongo.Collection('deployments');

DeploymentService = {
    list: function(id) {
      var deployments = Deployments.find(),
            altered = deployments.map(function(doc, index, cursor) {
                return _.extend(doc, {index: deployments.count() - index});
              });
      return altered;  
    }
};