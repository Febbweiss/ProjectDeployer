Router.configure({
   layoutTemplate: 'layout'  //can be any template name
 });


Router.map(function () {
  this.route('home', {
    path: '/',
  });
  this.route('management', function() {
        this.subscribe('projects').wait();
        
        if (this.ready()) {
            this.render();
        } else {
            this.render('Loading');
        }
  });
});