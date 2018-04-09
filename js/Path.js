'use strict';

console.log( 'Path.js was loaded.' );

function Path()
{
    this.PATH = '/home/badge-for-git/bin/';

    this.pwd =
        [
            'home',
            'badge-for-git'
        ];

    this.get = function()
    {
        return this.pwd.join( '/' );
    }

    // all files and directories
    this.root =
        {
            'badge-for-git' :
            {
                'bin'    : 'directory',
                'doc'    : 'directory',
                'badge'  : 'directory',

                'README' : 'readable',
            },

            'bin' :
            {
                'ls'      : 'executable',
                'df'      : 'executable',
                'cd'      : 'executable',
                'bc'      : 'executable',
                'fs'      : 'executable',
                'cat'     : 'executable',
                'pwd'     : 'executable',
                'open'    : 'executable',
                'date'    : 'executable',
                'help'    : 'executable',
                'echo'    : 'executable',
                'clear'   : 'executable',
                'history' : 'executable',

                'badge'   : 'executable2',
                'line'    : 'executable2',
                'button'  : 'executable2',
                'bfs'     : 'executable2',
                'hwf'     : 'executable2',
                'shc'     : 'executable2',
                'theme'   : 'executable2',

                'TF='     : 'global_variable', // badge/button text-fill, default: #FFF
                'DLM='    : 'global_variable', // delimiter,              default: 0
                'BCL='    : 'global_variable', // button-char-length,     default: 10
                'BS='     : 'global_variable', // button-stroke,          default: #CB0000
                'BSW='    : 'global_variable', // button-stroke-width,    default: 0
            },

            'doc' :
            {
                'contributor'  : 'readable',
                'how-to-use'   : 'readable',
                'NOTE'         : 'readable',
            },

            'badge' :
            {
                'README' : 'readable',
                '1.svg' : 'media',
                '2.svg' : 'media',
                '3.svg' : 'media',
                '4.svg' : 'media',
                '5.svg' : 'media',
                '6.svg' : 'media',
                '7.svg' : 'media',
                '8.svg' : 'media',
                '9.svg' : 'media',
                '10.svg' : 'media',
                '11.svg' : 'media',
                '12.svg' : 'media',
                '13.svg' : 'media',
                '14.svg' : 'media',
                '15.svg' : 'media',
                '16.svg' : 'media',
                '17.svg' : 'media',
                '18.svg' : 'media',
                '19.svg' : 'media',
                '20.svg' : 'media',
            },
        };

    this.readable =
        {
            'badge-for-git' :
            {
                'README' :
                [
                    '█░░░█ █▀▀ █░░ █▀▀ █▀▀█ █▀▄▀█ █▀▀',
                    '█▄█▄█ █▀▀ █░░ █░░ █░░█ █░▀░█ █▀▀',
                    '░▀░▀░ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀▀ ▀░░░▀ ▀▀▀',
                    'to badge-for-git.',
                    'A simple, fast SVG generator.',
                    '',
                    'An app with pure JavaScript, HTML, CSS and SVG.',
                    '',
                    'For navigation between directories use [cd].',
                    'All four arrow keys are handled.',
                    'For reading the contents of files use [cat] command.',
                    '[clear] the screen anytime you need.',
                    '[open] a media when you like.',
                    'Also you can type [help] or just press Control + h',
                    '',
                    'badge-for-git copyright (C) 2018 Shakiba',
                    'https://github.com/k-five/badge-for-git',
                    // 'copyright (C) 2018..' + ( ( Date().toString().split( ' ' ) )[3] ) + ' Shakiba',
                ]
            },

            'doc' :
            {
                'how-to-use' :
                [
                    'At the very first, you can hit "Tab", it will show you all the commands.',
                    'For example you can type [cd] then a single space and press Tab. It will',
                    'show you list of files and directories which are available in the current-',
                    'working-directory. Of course you can see it using [ls] command. If there',
                    'is a readable file (like this one) you can use [cat] command to read it.',
                    '',
                    'For creating badges, you should use [badge] command which has 5 arguments.',
                    'First argument is a number between 1-20 which determines style-number. The',
                    'second argument and third ones are "prefix" and "suffix" which a single',
                    'colon is the delimiter between them, like: "prefix:suffix".',
                    'The fourth and fifth arguments are background color for prefix and suffix.',
                    'These two arguments, each, has its default value and they are optional.',
                    '',
                    'For example: badge 1 "version:v1.0.0"',
                    'It means style-1, prefix->version, suffix->v1.0.0 the their colors will be',
                    'the default color. Which for prefix is "#434343" and suffix: "#CB0000".',
                    'Therefore it is equivalent to: badge 1 "version:v1.0.0" default:default.',
                    '',
                    'If you want to use a color other than default, just enter 3 or 6 HEX-value.',
                    'example: badge 1 "developer:xxx" #000:#0FF',
                    'example: badge 1 "developer:xxx" #000:#00FFFF',
                    'example: badge 1 "developer:xxx" #000000:#00FFFF',
                    'example: badge 1 "developer:xxx" #000:default',
                    'example: badge 1 "developer:xxx" default:#0FF',
                    '',
                    'Some styles have repetition feature which means you can use more then one suffix.',
                    'example: badge 17 "platform:Linux:Windows:Mac"',
                    'here we have the prefix: platform along with there suffixes.',
                    'or even empty suffix:',
                    'example: badge 17 "platform::Linux::Windows::Mac"',
                    'And here we have 6 suffixes',
                ],

                'NOTE' :
                [
                    '1. Commands are case-sensitive [ls] is NOT equal to [Ls].',
                    '2. badge command has 20 styles.',
                    '3. By default after each badge command, source code is copied',
                    '   to you clipboard.',
                    '4. In the case of empty-clipboard you can press F12 (=open console)',
                    '   and see the SVG-source-code related to the last or previous ones.',
                    '5. If you do not like using console you can use [shc] command which',
                    '   means show-clipboard-code. And it will be at the top-right corner.',
                    '   Then you can copy the code from there. It is for old browsers',
                    '6  For seeing SVG-code hit "Alt-v" and you will see the code on your console.',
                    '7. If you want to see every keystrokes in the console just hit "Alt-l".',
                    '8  Although "suffix" repetition is allowed but for style 8,13 and 14 it',
                    '   is undefined. Also style 20 because it is special badge and only uses',
                    '   a "prefix" and a "suffix" even if you add more suffixes.',
                    '9. Along with suffix repetition you can use empty suffix (= :) a single colon',
                    '   which will generate an empty "<path>" and add it to the main SVG.',
                ],

                'contributor' :
                [
                    'If you are willing to contribute I welcome you personally :).',
                    'The app is in pure JS, HTML, CSS and SVG.',
                    'SVG files have no "transform", "scale", "rotate" or other attributes.',
                    'They are based on three simple things:',
                    '    1. character-width',
                    '    2. character-height',
                    '    3. font-size',
                    'It is a headache to generate SVG file with rich diversity of style if we',
                    'do not use a font with "constant-width". So everything is based on a font',
                    'named "monospace" which is a famous font with constant-width. It let us',
                    'calculate a string length, and find it in "pixels" and then based on that',
                    'we can easily generate as many badges as we like/want/please.',
                    'So this is the first rule. Use that font and implement any thing you like',
                    '',
                    'Unfortunately I am still learning English and it is difficult for me, to use',
                    'variable in camel-case style like: "className" and I prefer to use "under_score".',
                    'style like: "class_name", even though I know JS-convention is camel-case.',
                    'Therefore all variables/function-names are in this "under_score" convention.',
                    '',
                    'For any doubts just raise an issue.',
                ]
            },

            'badge'  :
            {
                'README' :
                [
                    'there are 20 badges that you can use/see.',
                    'For seeing them try: open x.svg where x is',
                    'a number from 1 to 20, like: open 20.svg',
                ],

                '1.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '2.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '3.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '4.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '5.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '6.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '7.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '8.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '9.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '10.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '11.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '12.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '13.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '14.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '15.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '16.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '17.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '18.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '19.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
                '20.svg' : 'resizable=yes,top=200,left=200,width=400,height=10',
            },
        };

    // return current working directory
    this.cwd = function( name )
    {
        if( name === undefined )
        {
            return this.pwd [ this.pwd.length - 1 ];
        }
        else
        {
            this.pwd.push( name );
            return this.pwd [ this.pwd.length - 1 ];
        }
    }
}
