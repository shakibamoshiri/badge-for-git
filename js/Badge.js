'use strict';

console.log( 'Badges.js was loaded' );

function Badge()
{
    this.svgns = 'http://www.w3.org/2000/svg';

    // should NOT be rested with div() function
    this.text_offset = 0;
    this.offset = 0;
    this.colors = [ '#434343', '#CB0000' ];

    // it is modified by TC, see Command.js var TC
    this.text_color = '#FFF';

    // should be rested with div() function
    this.char_width = 0;
    this.char_height = 0;
    this.font_size = 0;

    this.rescue = '';
    this.begin = 0;
    this.tip = 0;
    this.end = 0;

    this.max_suffix = 0;
    this.max_width = 0;

    // no matter
    this.style = 0;

    // for style: 1, 4, 5, 7, 9, 10, 11, 12, 15, 16, 17, 18 and 19
    this.delimiter = 0;
}

Badge.prototype.div = function( class_name )
{
    this.char_width = 0;
    this.char_height = 0;
    this.font_size = 0;

    this.rescue = '';
    this.begin = 0;
    this.tip = 0;
    this.end = 0;

    this.max_suffix = 0;
    this.max_width = 0;

    var div = document.createElement( 'DIV' );
    div.className = class_name;
    doc.id( 'terminal' ).appendChild( div );
}

Badge.prototype.init = function()
{
    this.char_width  = Math.floor( doc.id( 'badge-font-size' ).getBoundingClientRect().width );
    this.char_height = doc.id( 'badge-font-size' ).getBoundingClientRect().height;
    this.font_size   = parseInt( doc.id( 'badge-font-size' ).style.fontSize );
    this.text_offset = this.char_width;
    this.offset      = this.char_width / 2;
}

Badge.prototype.style_1 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.begin + this.text_offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    var L1 = this.end + ',0';

    var L2 = this.end + ',' + this.char_height;

    var L3 = this.begin + ',' + this.char_height;

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.max_width = this.end;
    this.begin = this.end;

    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_2 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.end + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.max_width = this.end;
    var L1 = ( this.end + this.offset  * 2 ) + ',0';

    var L2 = ( this.end - this.offset  ) + ',' + this.char_height;

    var L3 = ( this.begin - this.rescue  ) + ',' + this.char_height;

    this.begin = this.end + this.offset;
    this.tip = this.end;
    this.rescue = this.offset * 2;
    this.offset = 0;

    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_3 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.end + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.max_width = this.end;
    var L1 = ( this.end - this.offset ) + ',0';

    var L2 = ( this.end + this.offset * 2  ) + ',' + this.char_height;

    var L3 = this.begin + this.rescue +  ',' + this.char_height;

    this.begin = this.end - this.offset ;
    this.tip = this.end;
    this.rescue = this.offset * 2;
    this.offset = 0;

    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_4 = function( text )
{
    var M = 'M' + this.begin + ',' + this.char_height;
    this.text_x = this.tip + this.text_offset * 2;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.end += this.text_offset;
    var L1 = this.end + ',' + this.char_height;

    var L2 = ( this.end + this.offset * 3 ) + ',0';

    var L3 = ( this.begin + this.offset * 3 ) + ',0';

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end;
    this.tip = this.begin;
    this.max_width = this.end + ( this.offset * 3 );

    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_5 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset * 2;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.end += this.text_offset;
    var L1 = this.end + ',0';

    var L2 = ( this.end + this.offset * 3 ) + ',' + this.char_height;

    var L3 = ( this.begin + this.offset * 3 ) + ',' + this.char_height;

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end;
    this.tip = this.begin;
    this.max_width = this.end + ( this.offset * 3 );
    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_6 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.max_width = this.end;
    var L1 = this.end + ',0';

    var L2 = this.end + ( this.offset * 2 ) + ',' + ( this.char_height / 2 );

    var L3 = this.end + ',' + this.char_height;

    var L4 = this.begin + ',' + this.char_height;

    var L5 = this.rescue;

    this.rescue = ( this.end + this.offset * 2 ) + ',' + ( this.char_height / 2 );

    this.begin = this.end + this.offset * 4;
    this.tip = this.end + this.offset * 4;
    this.offset = 0;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Badge.prototype.style_7 = function( text )
{
    var M = 'M' + this.tip + ',' + ( this.char_height / 2 );
    this.text_x = this.tip + this.text_offset + this.offset;

    var L1 = ( this.begin + this.text_offset ) + ',0';

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );

    if( text.length !== 0 )
    {
        // for increasing the sides of each shape
        // for this style we no need to use it
        // this.end += this.offset;
    }
    else
    {
        this.end -= this.text_offset;
    }

    var L2 = this.end + ',0';

    var L3 = ( this.end + this.text_offset ) + ',' + ( this.char_height / 2 );

    var L4 = this.end + ',' + this.char_height;

    var L5 = ( this.begin + this.text_offset  ) + ',' + this.char_height;

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end + this.text_offset;
    this.tip = this.begin;
    this.max_width = this.tip;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Badge.prototype.style_8 = function( text )
{
    var M = 'M' + this.tip + ',' + ( this.char_height / 2 );
    this.text_x = this.begin + this.text_offset + this.offset;

    var L1 = ( this.begin + this.offset * 2 )  + ',0';

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.end += this.offset;
    var L2 = ( this.end - this.rescue ) + ',0';

    var L3 = ( this.end + this.rescue ) + ',' + ( this.char_height / 2 );

    var L4 = ( this.end - this.rescue ) + ',' + this.char_height;

    var L5 = this.begin + ( this.offset * 2 ) +  ',' + this.char_height;

    this.begin = this.end;
    this.tip = this.end;
    this.rescue = this.offset;
    this.max_width = this.end + ( this.text_offset / 2 );
    this.offset = 0;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Badge.prototype.style_9 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.begin + this.text_offset + this.offset;

    this.end    = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    var L1 = this.end + ',0';

    this.tip = this.end + this.text_offset;
    this.max_width = this.tip;
    var L2 = this.tip + ',' + ( this.char_height / 2 );

    var L3 = this.end + ',' + this.char_height;

    var L4 = this.begin + ',' + this.char_height;

    var L5 = this.begin + this.text_offset + ',' + ( this.char_height / 2 );

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Badge.prototype.style_10 = function( text )
{
    var M = 'M' + this.tip + ',' + ( this.char_height / 2 );
    this.text_x = this.begin + this.text_offset + this.offset;

    var L1 = this.begin + this.text_offset + ',0';

    this.end    = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.end   += this.text_offset;
    this.max_width = this.end;
    var L2 = this.end + ',0';

    this.tip = this.end - this.text_offset;

    var L3 = this.tip + ',' + ( this.char_height / 2 );

    var L4 = this.end + ',' + this.char_height;

    var L5 = ( this.begin + this.text_offset ) + ',' + this.char_height;

    var L6 = this.begin +  ',' + ( this.char_height / 2 );

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end - this.text_offset;
    this.tip = this.begin;

    return [ M, L1, L2, L3, L4, L5, L6 ].join( ' ' );
}

Badge.prototype.style_11 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.begin + this.text_offset + this.offset;

    this.end    = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    if( text.length !== 0 )
    {
        this.end += this.text_offset;
    }
    this.max_width = this.end;
    var L1 =  this.end + ',0';

    this.tip = this.end - this.text_offset;
    var L2 = this.tip + ',' + ( this.char_height / 2 );

    var L3 = this.end + ',' + this.char_height;

    var L4 = this.begin + ',' + this.char_height;

    var L5 = this.begin + this.text_offset + ',' + ( this.char_height / 2 );

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Badge.prototype.style_12 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.begin + this.text_offset + this.offset;

    this.end    = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );

    if( text.length !== 0 )
    {
        this.end += this.text_offset;
    }

    this.max_width = this.end;
    var L1 = this.end + ',0';

    this.tip = this.end - this.text_offset;
    var L2 = this.tip + ',' + ( this.char_height / 2 );

    var L3 = this.end + ',' + this.char_height;

    var L4 = this.begin + ',' + this.char_height;

    var L5 = this.begin + this.text_offset + ',' + ( this.char_height / 2 );

    this.rescue = this.max_suffix;
    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    var P = this.end;
    this.max_suffix = this.rescue;

    if( --this.max_suffix )
    {
        var A = 'M' + P + ',0';
        var B = P + this.text_offset + ',' + ( this.char_height / 2 );
        var C = P + ',' + this.char_height;
        var D = P -  this.text_offset + ',' + ( this.char_height / 2 );

        var path = document.createElementNS( this.svgns, 'path' );
        path.setAttribute( 'fill', '#00E100' );
        path.setAttribute( 'd', [ A, B, C, D ].join( ' ' ) );
        var svg = doc.class( 'svg' );
        svg[ svg.length - 1 ].appendChild( path );
    }

    this.max_suffix = this.rescue;
    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }
    this.max_suffix = this.rescue - 1;

    this.begin = this.end;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Badge.prototype.style_13 = function( text )
{
    var M = 'M' + this.begin + ',' + this.char_height;
    this.text_x = this.tip + this.text_offset + this.offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.max_width = this.end;
    var L1 = this.end + ',' + this.char_height;

    var L2 = ( this.end - this.rescue ) + ',0';

    var L3 = ( this.begin + this.offset * 2 ) + ',0';

    this.begin = this.end;
    this.tip = this.end - this.offset;
    this.rescue = this.text_offset;
    this.offset = 0;

    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_14 = function( text )
{
    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset + this.offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.max_width = this.end;
    var L1 = this.end + ',0';

    var L2 = ( this.end - this.rescue ) + ',' + this.char_height;

    var L3 = ( this.begin + this.offset * 2 ) + ',' + this.char_height;

    this.begin = this.end;
    this.tip = this.end - this.offset;
    this.rescue = this.text_offset;
    this.offset = 0;

    return [ M, L1, L2, L3 ].join( ' ' );
}

Badge.prototype.style_15 = function( text )
{
    var r = this.char_height / 2;

    var M = 'M' + this.begin + ',0';
    this.text_x = this.begin + this.text_offset + this.offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.max_width = this.end + r;
    var L1 = this.end + ',0';

    // a10,10 0 0,1 0,20
    var a1 = 'a' + r + ',' + r + ' 0 0,1 0,' + this.char_height;

    var L2 = 'L' + this.begin + ',' + this.char_height;

    // a10,10 0 1,0 0,-20
    var a2 = 'a' + r + ',' + r + ' 0 1,0 0,' + ( -this.char_height );

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end;

    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

Badge.prototype.style_16 = function( text )
{
    var r = this.char_height / 2;

    var M = 'M' + ( this.begin + r ) + ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.end += r;
    this.max_width = this.end;
    var L1 = this.end + ',0';

    // a10,10 0 1,0 0,20
    var a1 = 'a' + r + ',' + r + ' 0 1,0 0,' + this.char_height;

    var L2 = 'L' + ( this.begin + r ) + ',' + this.char_height;

    // a10,10 0 0,1 0,-20
    var a2 = 'a' + r + ',' + r + ' 0 0,1 0,' + ( -this.char_height );

    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end - r;
    this.tip = this.end - r ;

    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

Badge.prototype.style_17 = function( text )
{
    var r = this.char_height / 2;

    var M = 'M' + ( this.begin + r ) + ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    this.end -= r;
    var L1 = this.end + ',0';

    var a1 = 'a' + r + ',' + r + ' 0 0,1 0,' + this.char_height;

    var L2 = 'L' + ( this.begin + this.text_offset ) + ',' + this.char_height;

    // a10,10 0 1,0 0,-20
    var a2 = 'a' + r + ',' + r + ' 0 0,1 0,' + ( -this.char_height );

    this.max_suffix = this.rescue;
    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end + r;
    this.tip = this.begin;
    this.max_width = this.tip;

    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

Badge.prototype.style_18 = function( text )
{
    var r = this.char_height / 2;

    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset + this.offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    if( text.length !== 0 )
    {
        this.end += r;
    }

    var L1 = this.end + ',0';
    this.max_width = this.end;

    // a10,10 0 1,0, 0,20
    var a1 = 'a' + r + ',' + r + ' 0 1,0 0,' + this.char_height;

    var L2 = 'L' + this.begin + ',' + this.char_height;

    // a10,10 0 1,0 0,-20
    var a2 = 'a' + r + ',' + r + ' 0 1,0 0,' + ( -this.char_height );

    this.max_suffix = this.rescue;
    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    this.begin = this.end;
    this.tip = this.end;

    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

Badge.prototype.style_19 = function( text )
{
    var r = this.char_height / 2;

    var M = 'M' + this.begin + ',0';
    this.text_x = this.tip + this.text_offset + this.offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );

    if( text.length !== 0 )
    {
        this.end += r;
    }

    var L1 = this.end + ',0';

    // a10,10 0 1,0, 0,20
    var a1 = 'a' + r + ',' + r + ' 0 1,0 0,' + this.char_height;

    var L2 = 'L' + this.begin + ',' + this.char_height;

    // a10,10 0 1,0 0,-20
    var a2 = 'a' + r + ',' + r + ' 0 1,0 0,' + ( -this.char_height );

    this.rescue = this.max_suffix;
    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }

    var P = this.end;
    this.max_suffix = this.rescue;
    //  d="M110,10 a10,10 0 1,0 0,0.1"
    if( --this.max_suffix )
    {
        var A = 'M' + ( P + r ) + ',' + r;
        var B = 'a' + r + ',' + r + ' 0 1,0 0,0.1';

        var path = document.createElementNS( this.svgns, 'path' );
        path.setAttribute( 'fill', '#00E100' );
        path.setAttribute( 'd', [ A, B ].join( ' ' ) );
        var svg = doc.class( 'svg' );
        svg[ svg.length - 1 ].appendChild( path );
    }

    this.max_suffix = this.rescue;
    if( this.delimiter !== 0 && --this.max_suffix )
    {
        this.end += this.delimiter;
    }
    this.max_suffix = this.rescue - 1;

    this.begin = this.end;
    this.tip = this.end;
    this.max_width = this.end;

    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

// style 20 == heart
Badge.prototype.style_heart = function( text )
{
    // prefix and suffix => ps
    var ps = text.split( ':' );
    if( ps.length > 2 )
    {
        alert( 'only a single suffix is allowed' );
    }

    var prefix = ps[ 0 ];
    var suffix = ps[ 1 ];

    // prefix part
    var M = 'M' + ( this.begin + this.offset ) + ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.begin + ( this.text_offset * 2 ) + ( prefix.length * this.char_width );
    this.end += this.offset;

    var L1 = ( this.end - this.offset ) + ',0';
    var L2 = ( this.end - this.offset * 2 ) + ',' + ( this.char_height / 4 );
    var L3 = ( this.end - this.offset * 2 ) + ',' + ( this.char_height / 2 );
    var L4 =   this.end + ',' + this.char_height;
    var L5 = ( this.begin + this.offset * 2 ) + ',' + this.char_height;
    var L6 = this.begin + ',' + ( this.char_height / 2 );
    var L7 = this.begin + ',' + ( this.char_height / 4 );

    var path = document.createElementNS( this.svgns, 'path' );
    path.setAttribute( 'fill', '#434343' );
    path.setAttribute( 'd', [ M, L1, L2, L3, L4, L5, L6, L7 ].join( ' ' ) );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( path );

    this.text( prefix );

    // heart part
    this.end -= this.offset;
    M = 'M' + this.end + ',0';

    L1 = ( this.end + this.offset ) + ',' + ( this.char_height / 4 );
    L2 = ( this.end + this.offset * 2 ) + ',0';
    L3 = ( this.end + this.offset * 3 ) + ',' + ( this.char_height / 4 );
    L4 = ( this.end + this.offset * 3 ) + ',' + ( this.char_height / 2 );
    L5 = ( this.end + this.offset ) + ',' + this.char_height;
    L6 = ( this.end - this.offset ) + ',' + ( this.char_height / 2 );
    L7 = ( this.end - this.offset ) + ',' + ( this.char_height / 4 );

    path = document.createElementNS( this.svgns, 'path' );
    path.setAttribute( 'fill', '#FF0000' );
    path.setAttribute( 'd', [ M, L1, L2, L3, L4, L5, L6, L7 ].join( ' ' ) );
    svg[ svg.length - 1 ].appendChild( path );

    // suffix part
    this.begin = this.end + this.text_offset;
    this.tip   = this.begin;

    M = 'M' + this.begin +  ',0';
    this.text_x = this.tip + this.text_offset;

    this.end = this.begin + ( this.text_offset + this.offset ) + ( suffix.length * this.char_width );

    L1 =   this.end + ',0' ;
    L2 = ( this.end + this.offset ) + ',' + ( this.char_height / 4 );
    this.max_width = this.end + this.offset;
    L3 = ( this.end + this.offset ) + ',' + ( this.char_height / 2 );
    L4 = ( this.end - this.offset ) + ',' +   this.char_height;
    L5 = ( this.begin - this.offset ) + ',' + this.char_height;
    L6 = ( this.begin + this.offset ) + ',' + ( this.char_height / 2 );
    L7 = ( this.begin + this.offset ) + ',' + ( this.char_height / 4 );

    path = document.createElementNS( this.svgns, 'path' );
    path.setAttribute( 'fill', '#00CB00' );
    path.setAttribute( 'd', [ M, L1, L2, L3, L4, L5, L6, L7 ].join( ' ' ) );
    svg[ svg.length - 1 ].appendChild( path );

    this.text( suffix );
}

Badge.prototype.find_points = function( text )
{
    switch( this.style )
    {
        case 1:
        return this.style_1( text );
        break;

        case 2:
        return this.style_2( text );
        break;

        case 3:
        return this.style_3( text );
        break;

        case 4:
        return this.style_4( text );
        break;

        case 5:
        return this.style_5( text );
        break;

        case 6:
        return this.style_6( text );
        break;

        case 7:
        return this.style_7( text );
        break;

        case 8:
        return this.style_8( text );
        break;

        case 9:
        return this.style_9( text );
        break;

        case 10:
        return this.style_10( text );
        break;

        case 11:
        return this.style_11( text );
        break;

        case 12:
        return this.style_12( text );
        break;

        case 13:
        return this.style_13( text );
        break;

        case 14:
        return this.style_14( text );
        break;

        case 15:
        return this.style_15( text );
        break;

        case 16:
        return this.style_16( text );
        break;

        case 17:
        return this.style_17( text );
        break;

        case 18:
        return this.style_18( text );
        break;

        case 19:
        return this.style_19( text );
        break;

        default:
        return this.style_1( text );
        break;
    }
}

Badge.prototype.fix_width = function()
{
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].setAttribute( 'width', this.max_width );
}


Badge.prototype.text = function( string )
{
    var text = document.createElementNS( this.svgns, 'text' );
    text.setAttribute( 'fill', this.text_color );
    text.setAttribute( 'x', this.text_x );
    text.setAttribute( 'y', this.font_size - 1 );
    text.setAttribute( 'font-family', 'DejaVu Sans Mono, Source code variable, monospace' );
    text.setAttribute( 'font-size', this.font_size );

    var contents = document.createTextNode( string );
    text.appendChild( contents );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( text );
}

Badge.prototype.path = function( text, class_name = '' )
{
    var path = document.createElementNS( this.svgns, 'path' );
    if( class_name === 'prefix' )
    {
        path.setAttribute( 'fill', this.colors[ 0 ] );
    }
    else
    {
        path.setAttribute( 'fill', this.colors[ 1 ] );
    }
    path.setAttribute( 'd', this.find_points( text ) );
    // only for test:
    // path.setAttribute( 'class', class_name );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( path );

    // after each <path> also add <text>
    this.text( text );
}

Badge.prototype.title = function()
{
    var title = document.createElementNS( this.svgns, 'title' );
    title.innerHTML = 'badge-for-git. Style: ' + this.style;
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( title );
}

Badge.prototype.desc = function()
{
    var desc = document.createElementNS( this.svgns, 'desc' );
    desc.innerHTML =
        'char-height: ' + this.char_height +
        ' char_width : ' + this.char_width +
        ' font-size  : ' + this.font_size;
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( desc );
}


Badge.prototype.create = function( array )
{
    // array[ 1 ] is a string-type and it should be an integer
    this.style = parseInt( array[ 1 ] );

    //var text = array[ 3 ];
    var text = array[ 4 ];
    if( text.indexOf( 'Date()' ) !== -1 )
    {
        // replace the first Date() string with real date but only the first 15 characters
        // like: "Mon Feb 12 2018" of "Mon Feb 12 2018 10:44:25 GMT+0330 (+0330)"
        text = text.replace( 'Date()', Date().substr( 0, 15 ) );
    }

    this.div( 'display' );
    this.init();

    /*
      https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS

      Valid Namespace URIs

      HTML - Use http://www.w3.org/1999/xhtml
      SVG - Use http://www.w3.org/2000/svg
      XBL - Use http://www.mozilla.org/xbl
      XUL - Use http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul

      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"

      svg.setAttributeNS( 'http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink' );
    */
    var svg = document.createElementNS( this.svgns, 'svg' );
    svg.setAttribute( 'xmlns', this.svgns );
    svg.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink'  );
    svg.setAttribute( 'width', 0 ); // it will be added at the end: fix_width()
    svg.setAttribute( 'height', this.char_height );
    svg.setAttribute( 'class', 'svg' );

    var display = doc.class( 'display' );
    display[ display.length - 1 ].appendChild( svg );

    var elements = text.split( ':' );
    var max = elements.length;
    var index = 0;
    this.max_suffix = max;

    // add <title> and <desc> elements to our svg
    this.title();
    this.desc();

    if( this.style === 20 )
    {
        this.style_heart( text );
    }
    else
    {
        this.path( elements[ index++ ], 'prefix' );

        while( index < max )
        {
            this.path( elements[ index ], 'suffix' );
            ++index;
        }
    }

    // svg.width at the first is 0 but it will be added by this function
    this.fix_width();
}
