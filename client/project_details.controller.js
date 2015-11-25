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
    if( !string ) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  deployment_status: function() {
    switch( this.status ) {
      case 'closed' :
        return this.output[this.output.length - 1].error ? 'bg-danger' : 'bg-success';
      case 'pending' :
        return 'bg-info';
      default :
        return 'bg-default';
    }
  }
});

Template.deploymentBtn.helpers({
  running: function() {
    return this.status === 'pending' ? 'visible' : 'hidden';
  }
})