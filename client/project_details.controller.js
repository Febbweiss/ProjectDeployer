Template.deploymentsList.helpers({
  deployments: function () {
    return DeploymentService.list();
  }
});

Template.deploymentDetails.helpers({
  format: function() {
    return this.data.replace(/\n/g, '<br />');
  },
  running: function() {
    var string = this.status;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});

Template.deploymentBtn.helpers({
  running: function() {
    return this.status === 'pending' ? 'visible' : 'hidden';
  }
})