var jobs = JobCollection('projectDeployerJobQueue');
  jobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return true;
    }
  });

jobs.startJobServer();

JobService = {
    create_repository : function(deploymentId) {
        Job(jobs, 'create_repository',
            {
                deploymentId: deploymentId
            })
            .priority('normal')
            .retry({
                retries: 5,
                wait: 10 * 1000
            })
            .save();
    },
    
    update_repository : function(deploymentId) {
        Job(jobs, 'update_repository',
            {
                deploymentId: deploymentId
            })
            .priority('normal')
            .retry({
                retries: 5,
                wait: 10 * 1000
            })
            .save();
    },
    
    delete_repository: function(project) {
        Job(jobs, 'delete_repository',
            {
                project: project
            })
            .priority('normal')
            .retry({
                retries: 5,
                wait: 10 * 1000
            })
            .save();
    }
}

