DEPLOYMENT_FOLDER = '/home/ubuntu/deployment';

STEPS = [
    'CREATION',
    'COMMANDS',
    'RUN'
];

SCRIPTS = {
        CREATE : [
            {
                cmd: 'mkdir %CWD%',
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
        ],
        UPDATE : [
            {
                cmd: 'git pull',
                options : {
                    cwd: '%ROOT_CWD%/%CWD%'
                }
            }
        ],
        DELETE : [
            {
                cmd: 'rm -rf %CWD%',
                options : {
                    cwd: '%ROOT_CWD%'
                }
            }
        ]
    };