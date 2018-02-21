"use strict";

var svg     = new Svg();
var path    = new Path();

var badges  = new Badge();
var lines   = new Line();

var screen  = new Screen();
var command = new Command(); // it uses screen and path

// [Violation] Forced reflow while executing JavaScript took XXXms
console.log( 'main.js was loaded.' );

// update version dynamically
doc.id( 'title' ).textContent = 'badge-for-git: v' + BFG_VERSION;

// by default the background color will be as the same gnome-Terminal on Ubuntu
screen.background( '#2C001E' );

// guide the user, after Control + l or clear, is is cleaned
screen.add( 'SPAN', 'guide', 'type help or press Ctrl + h', 'id' );

// for calculation character width and height
screen.add( 'SPAN', 'screen-font-size', ' ', 'id' );
screen.add( 'SPAN', 'badge-font-size', ' ', 'id' );

// set the font-size just once
doc.id( 'body' ).style.fontSize             = '15px';
doc.id( 'screen-font-size' ).style.fontSize = '15px';
doc.id( 'badge-font-size' ).style.fontSize  = '15px';

// for hwf command
badges.init();

// first prompt
screen.prompt();
screen.add( 'SPAN', 'row' );
screen.cursor();
screen.newline();

// calculate size of a single character
screen.char_width = Math.floor( doc.id( 'screen-font-size' ).getBoundingClientRect().width )

// the main function that handles keystroke for us
function key_down( event )
{
    // store each entered character globally
    var char    = event.key;

    // see init.js
    if( enable_log )
    {
        console.log( "keystroke is: '" + char + "'" );
    }

    // store each row because we might clear it, or modify it later
    var row    =  screen.get( 'row' );

    // store each cursor because we might clear it, or modify it later
    var cursor  = screen.get( 'cursor' );

    // exact position of the cursor. by default it is 0 but if we move
    // it, it becomes negative (= more the left)
    var cursor_pos =  parseInt( cursor.style.left ) / screen.char_width;
    screen.cursor_pos = cursor_pos;

    // handle special keys
    if( event.ctrlKey || event.altKey || event.shiftKey )
    {
        event.preventDefault();

        if( enable_log )
        {
            console.log( 'special key was pressed' );
        }

        if( event.altKey )
        {
            command.alter( char );
            char = '';
        }
        else
        if( event.ctrlKey )
        {
            command.control( char );
            char = '';
        }
        else
        if( event.shiftKey && char === ' ' )
        {
            // nothing to prevent moving up the page
            char = '';
        }
    }

    // the main switch over each key
    switch( char )
    {
        case 'Enter':

        // copy the full row contents
        screen.line_buffer = row.textContent;

        // store this line for history command
        // trim() is for prevent empty and space to be stored
        if( screen.line_buffer.trim() !== '' )
        {
            command.histories.push( screen.line_buffer );
            command.h_index = command.histories.length;

            if( enable_log )
            {
                console.log( 'save command: (' + screen.line_buffer + ') to => history[' + command.h_index + ']' );
            }
        }

        // now this line is clean, without any comments
        var line = screen.get( 'line' );

        // set inti.js
        if( enable_log )
        {
            console.log( 'user entered: (' + line + ')' );
        }

        // check if the command is correct, if so, run it
        if( line !== '' )
        {
            command.check( line );
        }

        // after clearing the screen with [clear] command we should not print prompt
        // otherwise we will get it twice
        if( line !== 'clear' )
        {
            screen.hide_cursor();
            screen.prompt( path.get() );
            screen.add( 'SPAN', 'row' );
            screen.cursor();
            screen.newline();
        }

        screen.line_buffer = '';
        break;

        case 'Backspace':
        // prevent Vivaldi browser from going back
        event.preventDefault();

        // and how many character we have in our row
        var width = row.textContent.length;

        // bit-wise operator ~ converts the positive value to negative but one less
        // so by adding +1 to it it will be fixed: like: ~9 + 1 === -9
        if( width > ( ~cursor_pos + 1 ) )
        {
            var array = row.textContent.split( '' );
            row.textContent = '';
            var result = '';

            var index  = 0;
            var length = array.length;
            var target = ( length + cursor_pos ) - 1;
            while( index < length )
            {
                if( index === target )
                {
                    ++index;
                    continue;
                }
                result += array[ index ];
                ++index;
            }

            row.textContent = result;
            screen.line_buffer = result;
        }
        break;

        case 'Delete':

        // bit-wise operator ~ converts the positive value to negative but one less
        // so by adding +1 to it it will be fixed: like: ~9 + 1 === -9
        if( ( ~cursor_pos + 1 ) > 0 )
        {
            var array = row.textContent.split( '' );
            row.textContent = '';
            var result = '';

            var index  = 0;
            var length = array.length;
            var target = ( length + cursor_pos );
            while( index < length )
            {
                if( index === target )
                {
                    ++index;
                    continue;
                }
                result += array[ index ];
                ++index;
            }

            row.textContent = result;
            screen.line_buffer = result;

            // increase the cursor position one unit (=char_width) to the right, it is vital!
            cursor.style.left = ( ( cursor_pos + 1 ) * screen.char_width ) + 'px';
        }
        break;

        case 'Tab':
        event.preventDefault();
        char = '';

        // current working directory
        var cwd = path.cwd();
        var row_tab = row.textContent;

        var reserve_space = 20;
        var format_width  = ( reserve_space * screen.char_width );
        var widnow_width  = window.innerWidth;
        var max_width     = format_width;

        // for retrieve commands
        if( row_tab.indexOf( ' ' ) == -1 )
        {
            var match = '';
            var match_counter = 0;

            var files = path.root[ 'bin' ];

            // when we could find it then we should break
            if( files[ row_tab ] !== undefined )
            {
                break;
            }

            // file is an array of command, like: ls, clear, echo, etc
            for( var file in files )
            {
                // if this file start-with that characters that user has entered
                // then we print those, for example if the row_tab is: d
                // the df, and date will be printed
                if( file.startsWith( row_tab ) === true )
                {
                    match = file;
                    ++match_counter;

                    // concatenation file name + ( 20 - file.length ) space for formatting output
                    // like printf( "%-20s", file );
                    screen.text( file + " ".repeat( reserve_space - file.length ), files[ file ] );
                    max_width += format_width;

                    // if we are close/near to edge of window then we should add new line
                    if( max_width >= widnow_width )
                    {
                        screen.newline();
                        max_width = format_width;
                    }
                }
            }

            screen.newline();
            screen.hide_cursor();
            screen.prompt( path.get() );

            // if there is only one match, then we will add new row and update it with: match
            // after this if statement, the new row contains match
            // and: if( files[ row_tab ] !== undefined )
            // stops process Tab
            if( match_counter === 1 )
            {
                screen.line_buffer = match;
                screen.add( 'SPAN', 'row', screen.line_buffer );
            }
            else
            {
                // when we could not find a match, we keep updating our row
                // just for getting more characters from the user
                screen.add( 'SPAN', 'row', row_tab );
            }

            screen.cursor();
            screen.newline();
        }
        else
        {
            // if the user has entered a command or just space
            // then we print the contents a current working directory
            // it acts like above except we have to parse the characters
            // after command and NOT the whole line, like:
            // ls De
            // we should look for 'De' in this directory and also for updating
            // the line after founding a match, then we should put both command and
            // word to the row
            var match = '';
            var match_counter = 0;

            // other directories except path.root.bin
            var files = path.root[ cwd ];
                        // get out of here when this command has no more sub-command
            if( files === undefined )
            {
                break;
            }

            var user_input = row_tab.substr( row_tab.lastIndexOf( ' ' ) + 1, row_tab.length );

            for( var file in files )
            {
                if( file.startsWith( user_input ) === true )
                {
                    match = file;
                    ++match_counter;

                    // concatenation file name + ( 20 - file.length ) space for formatting output
                    // like printf( "%-20s", file );
                    screen.text( file + " ".repeat( reserve_space - file.length ), files[ file ] );
                    max_width += format_width;

                    // if we are close/near to edge of window then we should add new line
                    if( max_width >= widnow_width )
                    {
                        screen.newline();
                        max_width = format_width;
                    }
                }
            }

            screen.newline();
            screen.hide_cursor();
            screen.prompt( path.get() );

            if( match_counter === 1 )
            {
                screen.line_buffer = row_tab + match.substr( user_input.length, match.length );
                screen.add( 'SPAN', 'row', screen.line_buffer );
            }
            else
            {
                screen.add( 'SPAN', 'row', row_tab );
            }

            screen.cursor();
            screen.newline();
        }
        break;

        // ignore F1 - F12
        case 'F1':
        case 'F2':
        case 'F3':
        case 'F4':
        case 'F5':
        case 'F6':
        case 'F7':
        case 'F8':
        case 'F9':
        case 'F10':
        case 'F11':
        case 'F12':

        // in Chrome
        case 'Meta':

        // should be ignored:
        case 'Control':
        case 'Alt':
        case 'Shift':
        case 'Escape':
        case 'Pause':
        case 'OS':
        case 'NumLock':
        case 'ContextMenu':
        case 'Shift':
        case 'CapsLock':
        case 'ScrollLock':
        case 'PageDown':
        case 'PageUp':
        case 'Insert':
        if( screen.cursor_shape === ' ' )
        {

        }
        else
        {

        }
        break;

        case 'ArrowUp':
        // goes back to previous command
        event.preventDefault();
        char = '';

        if( command.h_index > 0 )
        {
            // reset the position to zero to avoid conflict cursor position
            // with other old command in the command.histories
            cursor.style.left = '0px';

            --command.h_index;
            row.textContent = command.histories[ command.h_index ];
            if( enable_log )
            {
                console.log( 'Arrow-Up: ', command.histories[ command.h_index ] );
            }
        }
        break;

        case 'ArrowDown':
        // come back to latest command
        event.preventDefault();
        char = '';

        var length = command.histories.length;
        if( command.h_index < length )
        {
            ++command.h_index;
            if( command.h_index == length )
            {
                row.textContent = screen.line_buffer;
                if( enable_log )
                {
                    console.log( 'restore the last line', screen.line_buffer );
                }
            }
            else
            {
                row.textContent = command.histories[ command.h_index ];
                if( enable_log )
                {
                    console.log( 'Arrow-Down: ', command.histories[ command.h_index ] );
                }
            }
        }
        break;

        case 'ArrowLeft':
        event.preventDefault();
        char = '';

        var row_width  = row.textContent.length * screen.char_width;
        var cursor_pos_px = parseInt( cursor.style.left );

        if( cursor_pos_px + row_width <= 0 )
        {
            break;
        }

        // more to the left and update it
        cursor_pos_px -= screen.char_width;
        cursor.style.left = cursor_pos_px + 'px';

        if( enable_log )
        {
            console.log( 'cursor pos:', cursor_pos_px );
        }

        break;

        case 'ArrowRight':
        event.preventDefault();
        char = '';

        var cursor_pos_px = parseInt( cursor.style.left );
        if( cursor_pos_px === 0 )
        {
            break;
        }

        // more to the right and update it
        cursor_pos_px += screen.char_width;
        cursor.style.left = cursor_pos_px + 'px';

        if( enable_log )
        {
            console.log( 'cursor pos:', cursor_pos_px );
        }
        break;

        case 'Home':
        event.preventDefault();
        char = '';

        // for getting a fix number with should textContent.length
        // or innerHTML.length. 
        var row_width = row.textContent.length * screen.char_width;

        // row_width = ( row_width ^ 0xFFFFFFFF ) + 1;
        // bit-wise operator ~ converts the positive value to negative but one less
        // so by adding +1 to it it will be fixed: like: ~9 + 1 === -9
        row_width = ( ~row_width ) + 1;

        // go to the beginning of line (=left side)
        cursor.style.left = row_width + 'px';

        if( enable_log )
        {
            console.log( 'Home: cursor pos:', row_width );
        }
        break;

        case 'End':
        event.preventDefault();
        char = '';

        // go to the end of line (=right side)
        cursor.style.left = '0px';

        if( enable_log )
        {
            console.log( 'End: cursor pos:', 0 );
        }
        break;

        default:
        event.preventDefault();

        // cursor_pos is negative
        if( cursor_pos != 0 )
        {
            var array = row.textContent.split( '' );
            row.textContent = '';
            var result = '';

            var index  = 0;
            var length = array.length;
            var target = ( length + cursor_pos );
            while( index < length )
            {
                if( index === target )
                {
                    result += char;

                }
                result += array[ index ];
                ++index;
            }

            row.textContent = result;
            screen.line_buffer = result;
        }
        else
        {
            row.textContent += char;
            screen.line_buffer += char;
        }

        break;
    }

}

document.addEventListener( 'keydown', key_down, false );

// function key_up( event )
// {
//     var cursor = screen.get( 'cursor' );
//     cursor.classList.toggle( 'cursor-active' );

//     console.log( 'key up' );
// }

// document.addEventListener( 'keyup', key_up, false );


console.log( 'finished loading.' );
console.log( 'Welcome to badge-for-git: v' + BFG_VERSION );
console.log( 'console.log is disable. For turn it on/off try: Alt + l' );
