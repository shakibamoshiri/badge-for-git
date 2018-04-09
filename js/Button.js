'use strict';

function Button()
{
    this.svgns = 'http://www.w3.org/2000/svg';

    this.char_width = 0;
    this.char_height = 0;
    this.font_size = 0;
    this.style = 0;

    this.text_x = 0;
    this.baseline = 0;
    this.char_length = 10;
    this.max_width = 0;

    this.fill      = '#434343';
    this.text_fill = '#FFF';
    this.stroke    = '#434343';
    this.stroke_width = 0;
    this.stroke_width_offset = 0;

    this.begin = '';
}

Button.prototype.div = function( className )
{
    this.char_width = 0;
    this.char_height = 0;
    this.font_size = 0;

    var div = document.createElement( 'DIV' );
    div.className = className;
    document.getElementById( 'terminal' ).appendChild( div );
}

Button.prototype.init = function()
{
    this.char_width  = Math.floor( doc.id( 'badge-font-size' ).getBoundingClientRect().width );
    this.char_height = doc.id( 'badge-font-size' ).getBoundingClientRect().height;
    this.font_size   = parseInt( doc.id( 'badge-font-size' ).style.fontSize );
}

// "text"
Button.prototype.style_1 = function()
{
    // this.being is for cases which we have stroke-width
    // in these cases we should NOT start from 0,0
    var M = 'M' + this.begin;
    var L1 = this.button_width + ',' + + this.stroke_width_offset;
    var L2 = this.button_width + ',' + this.button_height;
    var L3 = this.stroke_width_offset + ',' + this.button_height + 'z';
    return [ M, L1, L2, L3 ].join( ' ' );
}

// "(text"
Button.prototype.style_2 = function()
{
    // move the x to the right to prevent optical illusion
    this.text_x += this.stroke_width_offset;
    var r = this.char_height;
    var M = 'M' +  ( r + this.stroke_width_offset ) + ',' + this.stroke_width_offset;

    var L1 = this.button_width + ',' + this.stroke_width_offset;
    var L2 = this.button_width + ',' + this.button_height;
    var L3 = ( r + this.stroke_width_offset ) + ',' + this.button_height;
    var a  =  'a' + r + ',' + r + ' 0 1,1 ' + this.stroke_width_offset + ',' + ( -r * 2 ) + 'z';
    return [ M, L1, L2, L3, a ].join( ' ' );
}

// "text)"
Button.prototype.style_3 = function()
{
    // move the x to the left to prevent optical illusion
    this.text_x -= this.stroke_width_offset;
    var r = this.char_height;
    var M = 'M' + this.begin;

    var L1 = ( this.button_width - r ) + ',' + this.stroke_width_offset;
    var a  =  'a' + r + ',' + r + ' 0 1,1 0,' + ( r * 2 );
    var L2 = 'L' + this.stroke_width_offset + ','  + ( r * 2 + this.stroke_width_offset ) + 'z';
    return [ M, L1, a, L2 ].join( ' ' );
}

// "(text)"
Button.prototype.style_4 = function()
{
    var r = this.char_height;
    var M = 'M' + ( r + this.stroke_width_offset ) + ',' + this.stroke_width_offset;

    var L1 = ( this.button_width - r ) + ',' + this.stroke_width_offset;
    var a1  =  'a' + r + ',' + r + ' 0 1,1 0,' + ( r * 2 );
    var L2 = 'l-' + ( this.button_width - this.stroke_width_offset - r * 2 ) + ',0';
    var a2  =  'a' + r + ',' + r + ' 0 1,1 ' +  this.stroke_width_offset + ',' + ( -r * 2 ) + 'z';
    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

// "<text"
Button.prototype.style_5 = function()
{
    // move the x to the right to prevent optical illusion
    this.text_x += this.stroke_width_offset;
    var M = 'M' + ( this.char_width * 2 + this.stroke_width_offset ) + ',' + this.stroke_width_offset;

    var L1 = this.button_width + ',' + this.stroke_width_offset;
    var L2 = this.button_width + ',' + this.button_height;
    var L3 = ( this.char_width * 2 + this.stroke_width_offset ) + ',' + this.button_height;
    var L4 = this.stroke_width_offset + ',' + ( this.char_height + this.stroke_width_offset ) + 'z';
    return [ M, L1, L2, L3, L4 ].join( ' ' );
}

// "text>"
Button.prototype.style_6 = function()
{
    // move the x to the left to prevent optical illusion
    this.text_x -= this.stroke_width_offset
    var M = 'M' + this.begin;

    var end = this.button_width - ( this.char_width * 2 );

    var L1 = end + ',' + this.stroke_width_offset;
    var L2 = this.button_width + ',' + ( this.char_height + this.stroke_width_offset );
    var L3 = end + ',' + this.button_height;
    var L4 = this.stroke_width_offset + ',' + this.button_height + 'z';
    return [ M, L1, L2, L3, L4 ].join( ' ' );
}

// "<text>"
Button.prototype.style_7 = function()
{
    var M = 'M' + ( this.char_width * 2 + this.stroke_width_offset ) + ',' + this.stroke_width_offset;

    var end = this.button_width - ( this.char_width * 2 );

    var L1 = end + ',' + this.stroke_width_offset;
    var L2 = this.button_width  + ',' + ( this.char_height + this.stroke_width_offset );
    var L3 = end + ',' + this.button_height;
    var L4 = ( this.char_width * 2 + this.stroke_width_offset ) + ',' + this.button_height;
    var L5 = this.stroke_width_offset + ',' + ( this.char_height + this.stroke_width_offset ) + 'z';
    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Button.prototype.find_points = function( text )
{
    if( text.search( /^[^(<].*[^)>]$/ ) !== -1 ) // "text"
    {
        this.style = 1;
        return this.style_1();
    }
    else
    if( text.search( /^[(].*[^)]$/ ) !== -1 ) // "(text"
    {
        this.style = 2;
        return this.style_2();
    }
    else
    if( text.search( /^[^(].*[)]$/ ) !== -1 ) // "text)"
    {
        this.style = 3;
        return this.style_3();
    }
    else
    if( text.search( /^[(].*[)>]$/ ) !== -1 ) // "(text)"
    {
        this.style = 4;
        return this.style_4();
    }
    else
    if( text.search( /^[<].*[^>]$/ ) !== -1 ) // "<text"
    {
        this.style = 5;
        return this.style_5();
    }
    else
    if( text.search( /^[^<].*[>]$/ ) !== -1 ) // "text>"
    {
        this.style = 6;
        return this.style_6();
    }
    else
    if( text.search( /^[<].*[>]$/ ) !== -1 ) // "<text>"
    {
        this.style = 7;
        return this.style_7();
    }
    // else
    // if( text.search( /^>([a-zA-Z1-9 ]+$/gi ) === 0 ) // ">text"
    // {
    //     this.style = 8;
    //     return this.style_8();
    // }
    // else
    // if( text.search( /^([a-zA-Z1-9 ]+<$/gi ) === 0 ) // "text<"
    // {
    //     this.style = 9;
    //     return this.style_9();
    // }
    // else
    // if( text.search( /^>[a-zA-Z1-9 ]+<$/gi ) === 0 ) // ">text<"
    // {
    //     this.style = 10;
    //     return this.style_10();
    // }
    else
    {
        this.style = 1;
        return this.style_1();
    }
}

Button.prototype.fix_width = function()
{
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].setAttribute( 'width', this.max_width + this.stroke_width );
}

Button.prototype.text = function( string )
{
    var text = document.createElementNS( this.svgns, 'text' );
    text.setAttribute( 'fill', this.text_fill );
    text.setAttribute( 'x', this.text_x );
    text.setAttribute( 'y', this.baseline);
    text.setAttribute( 'font-family', 'DejaVu Sans Mono, Source code variable, monospace' );
    text.setAttribute( 'text-anchor', 'middle' );
    // text.setAttribute( 'font-family', 'DejaVu Sans,Verdana,Geneva,sans-serif' );
    text.setAttribute( 'font-size', this.font_size );

    var contents = document.createTextNode( string );
    text.appendChild( contents );

    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( text );
}

Button.prototype.path = function( text )
{
    var path = document.createElementNS( this.svgns, 'path' );
    path.setAttribute( 'fill', this.fill );
    path.setAttribute( 'stroke-width', this.stroke_width );
    path.setAttribute( 'stroke', this.stroke );
    path.setAttribute( 'd', this.find_points( text ) );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( path );

    // it removes parentheses or angle-brackets from either left or right side
    // and return everything in between
    this.text( text.match( /^(?:[()<>])?(.*?)(?:[()<>])?$/ )[ 1 ] );
}

Button.prototype.title = function()
{
    var title = document.createElementNS( this.svgns, 'title' );
    title.innerHTML = 'badge-for-git: => button => style: ' + this.style;
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( title );
}

// Button.prototype.desc = function()
// {
//     var desc = document.createElementNS( this.svgns, 'desc' );
//     desc.innerHTML =
//         'char-height: ' + this.char_height +
//         ' char_width : ' + this.char_width +
//         ' font-size  : ' + this.font_size;
//     var svg = doc.class( 'svg' );
//     svg[ svg.length - 1 ].appendChild( desc );
// }

Button.prototype.create = function( text )
{
    // add a DIV with "display" class-name which later on, a SVG is inserted there
    this.div( 'display' );

    // set char_wight, char_height and font_size
    this.init();

    // a half of stroke-width
    this.stroke_width_offset = this.stroke_width / 2;

    //  char-length * char-width: 10 * 9 = 90px
    this.max_width           = this.char_width * this.char_length;

    // length of text a the length of it * char-width
    this.text_width          = text.length * this.char_width;

    // the width of a button = max-width + a half of stroke-with
    this.button_width        = this.max_width + this.stroke_width_offset;

    // char-height * 2 plus stroke-width / 2
    // why dividing to 2. Because half of a stroke-width goes outside of a shape
    // other half goes inside
    this.button_height       = this.char_height * 2 + this.stroke_width_offset;

    // x, the place where a "text" should be fixed (+ text-anchor: middle)
    // so it it always will be inserted in the middle of a button
    this.text_x              = ( this.button_width + this.stroke_width_offset ) / 2;

    // y value for a text
    this.baseline            = Math.floor( this.button_height * 0.65 );

    // for cases when we have stroke-width which M should not starts form 0,0
    this.begin               = this.stroke_width_offset + ',' + this.stroke_width_offset;

    var svg = document.createElementNS( this.svgns, 'svg' );
    svg.setAttribute( 'xmlns', this.svgns );
    svg.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink'  );
    svg.setAttribute( 'width', 0 ); // it will be added at the end: fix_width()
    svg.setAttribute( 'height', this.char_height * 2 + this.stroke_width );
    svg.setAttribute( 'class', 'svg' );

    var d = doc.class( 'display' );
    d[ d.length - 1 ].appendChild( svg );

    // create a path, find points and add text to it
    this.path( text );

    // add title to the newly created SVG
    this.title();

    // finally mix the width of the newly created SVG
    this.fix_width();
}
console.log( 'Button.js was loaded' );
