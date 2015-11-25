Job.processJobs('projectDeployerJobQueue', 'create_repository',
  function(job, callback) {
    var deployment = DeploymentService.get(job.data.deploymentId),
        project = ProjectService.get(deployment.project_id);
        
    DeploymentService.update_status( deployment._id, 'pending', function() {
      CommandRunner.run(
        {
          script: SCRIPTS.CREATE, 
          deployment: deployment,
          project: project,
          stdout: function(data) {
              DeploymentService.appendLog(job.data.deploymentId, data, false);
          }, 
          stderr: function(data) {
              DeploymentService.appendLog(job.data.deploymentId, data, true);
          }
        },
        function() {
            if( callback ) {
                callback();
            }   
        }
      );
    });
  }
);

Job.processJobs('projectDeployerJobQueue', 'delete_repository',
  function(job, callback) {
    CommandRunner.run(
        { 
          script: SCRIPTS.DELETE, 
          project: job.data.project
        },
        function() {
            if( callback ) {
                callback();
            }   
        }
    );    
  }
);

Job.processJobs('projectDeployerJobQueue', 'update_repository',
  function(job, callback) {
    var deployment = DeploymentService.get(job.data.deploymentId),
        project = ProjectService.get(deployment.project_id);
    
    DeploymentService.update_status( deployment._id, 'pending', function() {
      CommandRunner.run(
        { 
          script: SCRIPTS.UPDATE, 
          deployment: deployment,
          project: project,
          stdout: function(data) {
              DeploymentService.appendLog(job.data.deploymentId, data, false);
          }, 
          stderr: function(data) {
              DeploymentService.appendLog(job.data.deploymentId, data, true);
          }
        },
        function() {
            if( callback ) {
                callback();
            }   
        }
      );    
    });
    
  }
);