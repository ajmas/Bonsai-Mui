

function showFlash (url) {
    $j ('.video').css ('display', 'block');

    var html = '<div style="margin: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0;  "'
            + '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" height="100%" width="100%" id="movie_name" align="middle">'
            + '    <param name="movie" value="'
            + url
            + '"/>'
            + '    <!--[if !IE]>-->'
            + '    <object type="application/x-shockwave-flash" data="'
            + url
            + '" height="100%" width="100%">'
            + '        <param name="movie" value="'
            + url
            + '"/>'
            + '    <!--<![endif]-->'
            + '        <a href="http://www.adobe.com/go/getflash">'
            + '            <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"/>'
            + '        </a>' + '    <!--[if !IE]>-->' + '    </object>' + '    <!--<![endif]-->' + '</object>' + '</div>';
    $j ('.video').html (html);
    videoVisible = true;

}

$j (document).ready (function () {
    // stack.push (currentPath);

    // var currentNode = openPath (currentPath);

    var windowHeight = $j (window).height ();
    var windowWidth = $j (window).width ();

    if (windowHeight < 1440 || windowWidth < 2560) {

    }

    menuLayer = new MenuLayer ('menuLayer');
    menuLayer.openPath ("/Volumes/Blue%20Mana/media/videos/");    
    
});
