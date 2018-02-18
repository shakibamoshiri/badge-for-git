'use strict';

console.log( 'Screen.js was loaded.' );

function Screen( )
{
    this.nrow = 0;

    this.char_width = 0;

    this.cursor_pos = 0;

    this.cursor_shape = '';

    this.line_buffer = '';

    // change background color by: fs command
    this.background = function( color )
    {
        if( color === undefined )
        {
            doc.tag( 'HTML' )[ 0 ].style.backgroundColor = '#2C001E';
        }
        else
        {
            if( enable_log )
            {
                console.log( 'change background color to: ' + color );
            }
            // doc.tag( 'HTML' )[ 0 ].style.backgroundColor = color;
            doc.id( 'html' ).style.backgroundColor = color;
        }
    }

    // change font size by: fs command
    this.font_size = function( size )
    {
        if( size === undefined )
        {
            doc.id( 'body' ).style.fontSize             = '15px';
            doc.id( 'screen-font-size' ).style.fontSize = doc.id( 'body' ).style.fontSize;
        }
        else
        {
            if( enable_log )
            {
                console.log( 'change font-size to: ' + size );
            }
            doc.id( 'body' ).style.fontSize = ( size + 'px' );
            doc.id( 'screen-font-size' ).style.fontSize = doc.id( 'body' ).style.fontSize;
        }

        //screen.char_width = screen.get( 'cursor' ).getBoundingClientRect().width;
      //screen.char_width = Math.floor( doc.id( 'character' ).getBoundingClientRect().width );
      screen.char_width = Math.floor( doc.id( 'screen-font-size' ).getBoundingClientRect().width );


        // for Opera, Safari, Chrome
        // screen.char_width = Math.floor( screen.char_width );

        // update badges font-size, char-height and char-width
        badges.init();
    }

    // add simple text to the screen
    this.text = function( string, class_name = 'text' )
    {
        var span = document.createElement( 'SPAN' );

        var contents = document.createTextNode( string );
        span.appendChild( contents );

        doc.id( 'terminal' ).appendChild( span );
        span.classList.add( class_name );
    }

    // print prompt, it is in SVG
    this.prompt = function( ps1 = 'home/badge-for-git' )
    {
        var prompt = document.createElement( 'SPAN' );
        doc.id( 'terminal' ).appendChild( prompt );
        prompt.className = 'prompt';

        // create polygon, text passed on ps1
        svg.create( ps1 );
    }

    // add an arbitrary element to the terminal
    this.add = function( tag_name, class_name, string, type )
    {
        var tag  = document.createElement( tag_name );
        if( string !== undefined )
        {
            var contents = document.createTextNode( string );
            tag.appendChild( contents );
        }
        if( type === undefined )
        {
            tag.classList.add( class_name );
        }
        else
        {
            tag.id = class_name;
        }
        doc.id( 'terminal' ).appendChild( tag );
    }


    // handling cursor
    this.cursor = function()
    {
        ++this.nrow;

        var cursor = document.createElement( 'SPAN' );

        // var underscore = document.createTextNode( this.cursor_shape );
        // cursor.appendChild( underscore );

        doc.id( 'terminal' ).appendChild( cursor );
        cursor.className = 'cursor';

        // each time it is created, it should be 0
        cursor.style.left = '0px';

        // auto scroll to the bottom
        // if we do no put it here and instead we would put it
        // in the main function it did not work properly
        // thus after each time a cursor is added then the scroll-bar
        // will be fixed to the very last point
        window.scrollTo(  0, document.body.scrollHeight );

        svg.cursor();
    }

    this.hide_cursor = function()
    {
        // we can hide the cursor, it is much faster than remove-child
        var cursor = doc.class( 'cursor' )[ this.nrow - 1 ];
        cursor.style.display = 'none';

        // also we can remove it
        //var cursor = doc.class( 'cursor' )[ 0 ];
        //doc.id( 'terminal' ).removeChild( cursor );
    }

    this.newline = function()
    {
        var br = document.createElement( 'BR' );
        doc.id( 'terminal' ).appendChild( br );
    }

    this.get = function( name )
    {
        if( name === 'line' )
        {
            var line = this.line_buffer.replace( /#[^0-9abcdef]+.*/ig, '' );
            if( line.startsWith( '#' ) )
            {
                return '';
            }
            return line.trim();
        }
        else
        {
            return doc.class( name )[ this.nrow - 1 ];
        }
    }

    this.clear = function()
    {
        doc.id( 'terminal' ).innerHTML = '';
        this.nrow = 0;

        // when we clear the screen the previous span.screen-font-size/badge-font-size is cleaned
        // we should add it again because svg class needs it
        screen.add( 'SPAN', 'screen-font-size', ' ', 'id' );
        screen.add( 'SPAN', 'badge-font-size', ' ', 'id' );

        // add the last font-size
        doc.id( 'badge-font-size' ).style.fontSize  = ( badges.font_size + 'px' );
    }

}
