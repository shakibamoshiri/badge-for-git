'use strict';

console.log( 'Line.js was loaded' );

function Line()
{
    this.svgns = 'http://www.w3.org/2000/svg';

    this.char_width = 0;
    this.char_height = 0;
    this.font_size = 0;
    this.style = 0;

    this.begin = 0;
    this.end = 0;

    this.max_pattern = 0;
    this.max_width = 0;

    this.color = '#CB0000';

    this.delimiter = 0;
}

Line.prototype.div = function( className )
{
    this.max_pattern = 0;
    this.max_width = 0;

    this.begin = 0;
    this.end = 0;

    var div = document.createElement( 'DIV' );
    div.className = className;
    document.getElementById( 'terminal' ).appendChild( div );
}

Line.prototype.init = function()
{
    // instead of writing Line.init we can you the init function in Badge
    badges.init.call( lines );
}

Line.prototype.style_1 = function()
{
    var M = 'M0,0 h' + this.user_length + ' v' + this.char_height + ' h' + ( -this.user_length );
    this.max_width = this.user_length;
    return M;
}

Line.prototype.style_2 = function()
{
    var r = this.char_height / 2;

    this.max_width = this.user_length;
    this.user_length -= this.char_height;

    // d="m50,0
    // 100,0
    // a50,50 0 1,1 0,100
    // l-100,0
    // a50,50 0,1,1 0,-100
    var M = 'M' + r + ',0';
    var L1 = 'l' + this.user_length + ',0';
    var a1 = 'a' + r + ',' + r + ' 0 1,1 0,' + this.char_height;
    var L2 = 'l-' + this.user_length + ',0';
    var a2 = 'a' + r + ',' + r + ' 0 1,1 0,' + ( -this.char_height );

    return [ M, L1, a1, L2, a2 ].join( ' ' );
}

Line.prototype.style_3 = function()
{
    var M = '';

    this.max_width = this.char_height * this.max_pattern;
    if( this.delimiter !== 0 )
    {
        this.max_width += ( this.delimiter * ( this.max_pattern - 1 ) );
    }

    // M0,0 h100 v100 h-100
    // M100,0 h100 v100 h-100
    // M200,0 h100 v100 h-100
    // and so on
    while( this.max_pattern-- )
    {
        M += ' M' + this.begin + ',0' + ' h' + this.char_height + ' v' + this.char_height + ' h-' + this.char_height;
        this.begin += this.char_height + this.delimiter;
    }

    return M;
}

Line.prototype.style_4 = function( )
{
    var m = '';
    var tip = ( this.char_height / 2 );
    this.end = 0;
    this.begin = tip;

    this.max_width = this.char_height * this.max_pattern;
    if( this.delimiter !== 0 )
    {
        this.max_width += ( this.delimiter * ( this.max_pattern - 1 ) );
    }

    // m50,0    50,50 -50,50 -50,-50
    // m150,-50 50,50 -50,50 -50,-50
    // m150,-50 50,50 -50,50 -50,-50
    // and so on
    m += ' m' + this.begin + ',' + this.end + ' ' + ( tip + ',' + tip ) + ' -' + tip + ',' + tip + '-' + tip + ',-' + tip;
    this.max_pattern--;
    this.begin = this.char_height + tip + this.delimiter;
    this.end = -tip;

    while( this.max_pattern-- )
    {
        m += ' m' + this.begin + ',' + this.end + ' ' + ( tip + ',' + tip ) + ' -' + tip + ',' + tip + '-' + tip + ',-' + tip;
    }

    return m;
}

Line.prototype.style_5 = function()
{
    var r = this.char_height / 2;
    var temp = r;
    var m = '';

    this.max_width = this.char_height * this.max_pattern;
    if( this.delimiter !== 0 )
    {
        this.max_width += ( this.delimiter * ( this.max_pattern - 1 ) );
    }

    // m0,50  a50,50 0 1,1 0,0.001
    // m110,0 a50,50 0 1,1 0,0.001
    // m110,0 a50,50 0 1,1 0,0.001
    // and so on
    m += 'm' + this.begin + ',' + temp + ' a' + r + ',' + r + ' 0 1,1 0,0.001 ';
    this.max_pattern--;
    this.begin = this.char_height + this.delimiter;
    temp = 0;

    while( this.max_pattern-- )
    {
        m += 'm' + this.begin + ',' + temp + ' a' + r + ',' + r + ' 0 1,1 0,0.001 ';
    }

    return m;
}

Line.prototype.find_points = function()
{
    switch( this.style )
    {
        case 1:
        return this.style_1();
        break;

        case 2:
        return this.style_2();
        break;

        case 3:
        return this.style_3();
        break;

        case 4:
        return this.style_4();
        break;

        case 5:
        return this.style_5();
        break;

        default:
        return this.style_1();
        break;
    }
}

Line.prototype.fix_width = function()
{
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].setAttribute( 'width', this.max_width );;
}

Line.prototype.path = function()
{
    var path = document.createElementNS( this.svgns, 'path' );
    path.setAttribute( 'fill', this.color );
    path.setAttribute( 'd', this.find_points() );
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( path );
}

Line.prototype.title = function()
{
    var title = document.createElementNS( this.svgns, 'title' );
    title.innerHTML = 'badge-for-git. (line) Style: ' + this.style;
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( title );
}

Line.prototype.desc = function()
{
    var desc = document.createElementNS( this.svgns, 'desc' );
    desc.innerHTML =
        'char-height: ' + this.char_height +
        ' char_width:' + this.char_width +
        ' font-size :' + this.font_size;
    var svg = doc.class( 'svg' );
    svg[ svg.length - 1 ].appendChild( desc );
}

Line.prototype.create = function( array )
{
    // array[ 1..2 ] is a string-type and it should be an integer
    // array[ 3 ] is color
    this.style       = parseInt( array[ 1 ] );
    this.user_length = parseInt( array[ 2 ] );

    this.div( 'display' );

    // "+ this.delimiter" is important
    // if we do not add this variable we will get a longer line other
    // other user_length.
    // this.delimiter by default is 0
    this.max_pattern = Math.ceil( this.user_length / ( this.char_height + this.delimiter ) );

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

    // add <title> and <desc> elements to our svg
    this.title();
    this.desc();

    this.path();

    // svg.width at the first is 0 but it will be added by this function
    this.fix_width();
}
