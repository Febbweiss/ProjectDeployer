Deployments = new Mongo.Collection('deployments');

DeploymentService = {
    get: function(id) {
      return Deployments.find({_id: id}, {date: 1});  
    },
    
    appendLog: function(id, data, error) {
        Deployments.update({ _id: id },{ $push: {
            output: {
                timestamp : new Date().getTime(),
                data : data
            }
        }});
    },
    create: function(project, callback) {
        return Deployment.insert({
            project_id: projet._id,
            timestamp: new Date().getTime(),
            output: []
        }, function(errors, deploymentId) {
            _execSync(cmd, function(data) {
                DeploymentService.appendLog(deploymentId, data, false);
            }, function(data) {
                DeploymentService.appendLog(deploymentId, data, true);
            });
        });
    }, 
    
    deploy: function(project) {
        
    }
}