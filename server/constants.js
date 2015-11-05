var DEPLOYMENT_FOLDER = 'deployment',

    SCRIPTS = {
        CREATE : [
            {
                cmd: 'mkdir %CWD%',
                options : {
                    cwd: '%ROOT_CWD%'
                }
            },
            {
                cmd: 'cd %CWD%',
                options : {
                    cwd: '%ROOT_CWD%'
                }
            },
            {
                cmd: 'git clone %GIT% .',
                options : {
                    cwd: '%ROOT_CWD%/%CWD%'
                }
            }
        ]
    };