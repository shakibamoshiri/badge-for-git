'use strict';

/********************************************************************************

MIT License

badge-for-git Copyright (c) 2018 Shakiba Moshiri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*********************************************************************************/

console.log( 'init.js was loaded' );

var doc =
    {
        id : function( name )
        {
            return document.getElementById( name );
        },

        tag : function( name )
        {
            return document.getElementsByTagName( name );
        },

        class : function( name )
        {
            return document.getElementsByClassName( name );
        },

        name : function( name )
        {
            return document.getElementsByName( name );
        },

    };

var clipboard = document.createElement( 'INPUT' );
clipboard.id = 'clipboard';
document.body.appendChild( clipboard );

// global variable to turn console.log() on or off
// do not modify this flag anywhere you see it
var enable_log = false;

// print SVG code to the console
var enable_svg_log = false;

// version of the application
var BFG_VERSION = '1.0.0';
