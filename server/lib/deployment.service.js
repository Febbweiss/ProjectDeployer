Deployments = new Mongo.Collection('deployments');

DeploymentService = {
    get: function(id) {
      return Deployments.findOne({_id: id});  
    },
    
    appendLog: function(id, data, error) {
        var deployment = DeploymentService.get(id),
            project = ProjectService.get(deployment.project_id);
        
        Deployments.update({ _id: id },{ $push: {
            output: {
                timestamp : new Date().getTime(),
                data : data.replace(new RegExp(project._id, 'g'), project.label),
                error: error
            }
        }});
    },
    
    create: function(project) {
        return Deployments.insert({
            project_id: project._id,
            timestamp: new Date().getTime(),
            output: [],
            status: 'opened'
        }, function(errors, deploymentId) {
            JobService.create_repository(deploymentId);
        });
    }, 
    
    delete: function(projectId) {
      Deployments.remove({project_id: projectId}, function(errors) {
          if( !errors ) {
              JobService.delete_repository({_id: projectId});
          }
      });  
    },
    
    update: function(projectId) {
       Deployments.insert({
            project_id: projectId,
            timestamp: new Date().getTime(),
            output: []
        }, function(errors, deploymentId) {
            JobService.update_repository(deploymentId);
        });
    },
    
    update_status: function(id, status, callback) {
        Deployments.update(
            id, 
            { $set: { 
                status: status
                }
            },
            callback
            );
    },
    
    list: function(projectId) {
        return Deployments.find({project_id: projectId}, {sort: {timestamp: -1}});
    },
    
    deploy: function(project) {
        
    }
}