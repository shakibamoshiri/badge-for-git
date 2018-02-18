'use strict';

console.log( 'Svg.js was loaded' );

function Svg()
{
    this.svgns = 'http://www.w3.org/2000/svg';

    this.text_offset = 10;

    this.char_width = 0;
    this.char_height = 0;
    this.font_size = 0;

    this.begin = 0;
    this.tip = 0;
    this.end = 0;
    this.max_width = 0;
    this.text_x = 0;
}

Svg.prototype.init = function()
{
    this.char_width  = Math.floor( doc.id( 'screen-font-size' ).getBoundingClientRect().width );
    this.char_height = doc.id( 'screen-font-size' ).getBoundingClientRect().height;
    this.font_size   = parseInt( document.body.style.fontSize );

    this.max_width = 0;
    this.text_x    = 0;
    this.begin = 0;
    this.tip   = 0;
    this.end   = 0;

}

Svg.prototype.find_points = function( text )
{
    var M = 'M' +  this.begin + ',0';
    this.text_x = this.begin + this.text_offset + 5;

    this.end    = this.begin + ( this.text_offset * 2 ) + ( text.length * this.char_width );
    var L1 = this.end + ',0';

    this.tip = this.end + this.text_offset;
    var L2 = this.tip + ',' + ( this.char_height / 2 );

    var L3 = this.end + ',' + this.char_height;

    var L4 = this.begin + ',' + this.char_height;

    var L5 = this.begin + this.text_offset + ',' + ( this.char_height / 2 );

    this.begin = this.tip - 5;
    this.max_width = this.begin + this.text_offset;

    return [ M, L1, L2, L3, L4, L5 ].join( ' ' );
}

Svg.prototype.fix_width = function()
{
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].setAttribute( 'width', this.max_width );
}

Svg.prototype.text = function( string )
{
    var text = document.createElementNS( this.svgns, 'text' );
    text.setAttribute( 'fill', '#000' );
    text.setAttribute( 'x', this.text_x );
    text.setAttribute( 'y', this.font_size  );
    text.setAttribute( 'font-family', 'DejaVu Sans Mono, Source code variable, monospace' );
    text.setAttribute( 'font-size', this.font_size );

    var contents = document.createTextNode( string );
    text.appendChild( contents );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( text );
}

Svg.prototype.path = function( text, class_name = '' )
{
    var path = document.createElementNS( this.svgns, 'path' );

    path.setAttribute( 'fill', '#FFF' ) ;
    path.setAttribute( 'd', this.find_points( text ) );
    path.setAttribute( 'class', class_name );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( path );

    // after each <path> also add <text>
    this.text( text );
}

Svg.prototype.cursor = function()
{
    var svg = document.createElementNS( this.svgns, 'svg' );
    svg.setAttribute( 'xmlns', this.svgns );
    svg.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink'  );
    svg.setAttribute( 'width', this.char_width );
    svg.setAttribute( 'height', this.char_height );
    svg.setAttribute( 'class', 'svg-cursor' );
    var cursor = doc.class( 'cursor' );
    cursor[ cursor.length - 1 ].appendChild( svg );

    // sample:
    // <svg width="1" height="20">
    // <line stroke="#F00" stroke-width="1" x1="0" y1="0" x2="0" y2="18" />
    // </svg>

    var line = document.createElementNS( this.svgns, 'line' );

    line.setAttribute( 'stroke', '#FFF' ) ;
    line.setAttribute( 'stroke-width', 2 ) ; // 1 is tiny and 2 is better
    line.setAttribute( 'stroke-linecap', 'round') ;

    line.setAttribute( 'x1', 0 ) ;
    line.setAttribute( 'y1', 0 ) ;
    line.setAttribute( 'x2', 0 ) ;
    line.setAttribute( 'y2', this.char_height ) ;
    var svg_cursor = doc.class( 'svg-cursor' );
    svg_cursor[ svg_cursor.length - 1 ].appendChild( line );
}

Svg.prototype.create = function( text )
{
    this.init();

    var svg = document.createElementNS( this.svgns, 'svg' );
    svg.setAttribute( 'xmlns', this.svgns );
    svg.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink'  );
    svg.setAttribute( 'width', 0 );
    svg.setAttribute( 'height', this.char_height );
    svg.setAttribute( 'class', 'svg' );
    var prompt = doc.class( 'prompt' );
    prompt[ prompt.length - 1 ].appendChild( svg );

    var dirs = text.split( '/' );
    var max = dirs.length - 1;
    var index = 0;
    while( index < max )
    {
        this.path( dirs[ index ], 'path' );
        ++index;
    }
    // current working directory that has different color
    this.path( dirs[ index ], 'cwd' );

    this.fix_width();
}
