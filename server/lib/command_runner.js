
var exec = Npm.require('child_process').exec,
    execSync = function(cmd, options, stdoutHandler, stderrHandler, callback) {
        stdoutHandler('$ ' + cmd);
        exec(cmd, 
            options, 
            Meteor.bindEnvironment(
                function(errors, stdout, stderr) {
                    if( stdout !== '' ) {
                        stdoutHandler(stdout);
                    }
                    if( stderr != '' ) {
                        stderrHandler(stderr);
                    } else if( errors ) {
                        stderrHandler('Internal error');
                    }
                    callback(errors);
                }
            )
        );
    },
    replace = function(string, customs = {}) {
        var globals = {'%ROOT_CWD%': DEPLOYMENT_FOLDER};
        for(var key in globals) {
            string = string.replace(key, globals[key]);
        }
        for(var key in customs) {
            string = string.replace(key, customs[key]);
        }
        
        return string;
    };
    
CommandRunner = {
    run: function( data, callback = undefined) {
        var bundle = _.extend({deployment: {}, project:{}, stdout: console.log, stderr: console.error, counter: 0, deploy_script: true}, data),
            customs = {'%CWD%': bundle.project._id, '%GIT%': bundle.project.git_url};
            
        var line = bundle.script[bundle.counter],
            command = replace(line.cmd, customs ), 
            options = line.options;
            
        options.cwd = replace(options.cwd, customs);
        
        execSync(command, options, bundle.stdout, bundle.stderr, function(errors) {
            if( errors ) {
                if( callback ) {
                    return callback();
                } else {
                    return;
                }
            }
            
            bundle.counter++;
            if( bundle.counter >= bundle.script.length ) {
                if( bundle.deploy_script && bundle.project.commands ) {
                    bundle.deploy_script = false;
                    bundle.script = bundle.project.commands.split('\n');
                    bundle.counter = 0;
                    CommandRunner.commands(bundle, callback);
                } else if( callback ) {
                    callback();
                }
            } else {
                CommandRunner.run(bundle, callback);
            }
        });
    },
    
    commands: function(bundle, callback = undefined) {
        var command = bundle.script[bundle.counter], 
            customs = {'%CWD%': bundle.project._id},
            options = {
                cwd: replace('%ROOT_CWD%/%CWD%', customs)
            };
            
        execSync(command, options, bundle.stdout, bundle.stderr, function(errors) {
            if( errors ) {
                if( callback ) {
                    return callback();
                } else {
                    return;
                }
            }
            
            bundle.counter++;
            if( bundle.counter >= bundle.script.length ) {
                callback();
            } else {
                CommandRunner.commands(bundle, callback);
            }
        });
    }
}