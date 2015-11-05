
var exec = Npm.require('child_process').exec,
    execSync = function(cmd, options, stdoutHandler, stderrHandler) {
        exec(cmd, 
            options, 
            Meteor.bindEnvironment(
                function(error, stdout, stderr) {
                    if( stdout != '' ) {
                        stdoutHandler(stdout);
                    }
                    if( stderr != '' ) {
                        stderrHandler(stderr);
                    }
                }
            )
        );
    };
    
var CommandRunner = {
    run: function( script, deployment, stdout, stderr, counter, callback ) {
        var command = script[command].cmd.replace('%ROOT_CWD%', DEPLOYMENT_FOLDER).replace('%CWD%', deployment._id), 
            options = script[command].options;
        options.cwd.replace('%ROOT_CWD%', DEPLOYMENT_FOLDER).replace('%CWD%', deployment._id);
        
        execSync(command, options, stdout, stderr, function() {
            counter++;
            if( counter > script.length ) {
                if( callback ) {
                    callback();
                }
            } else {
                CommandRunner.run(script, deployment, stdout, stderr, counter, callback);
            }
        });
    }
}