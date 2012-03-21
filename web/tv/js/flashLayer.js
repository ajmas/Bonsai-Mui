var FlashLayer = Class.create( {

    visible : false,
    zoom : "normal",
    random: false,
    flashWidth: 0,
    flashHeight: 0,
    playAllIndex: 0,
    node: null,
    entries: null,
    itemsPlayed: 0,
    repeatAll: false,
    
    getName: function () {
        return "flash";
    },
    
    show : function () {
        this.visible = true;
        
        var url = this.node.url;
        
        var html = '<div style="margin: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0;  " id="flashPlayer"'
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
        
        $j('.flash').css ('display', 'block');
        $j('.flash').html (html);
        this.visible = true;
        this.zoom = 'normal';
    },

    hide : function () {
        $j('.flash').css ('display', 'none');
        $j('.flash').html ('');
        this.visible = false;        
    },
    
    setObject: function ( node ) {
        this.node = node;       
    },
    
    setRandom: function ( random ) {
        this.random = random;        
    },

    setRepeatAll: function ( repeatAll ) {
        this.repeatAll = repeatAll;        
    },
    
    playAll : function ( entries, idx ) {
        this.entries = entries;
        this.playAllIndex = 0;
        this.itemsPlayed = 0;
        
        if ( idx ) {
            this.playAllIndex = idx;
        }
        
        this.playNext ();
        
//        var loopedBack = 0;
//        do {
//            this.playAllIndex++;
//
//            if ( this.playAllIndex > this.entries.length ) {
//                this.playAllIndex = 0;
//                loopedBack++;
//            }
//        } while (this.node.entries[playAllIndex].type != "file"
//                && loopedBack < 2);
//
//        if (loopedBack > 1) {
//            console.log ('returning');
//            this.hide ();
//            return;
//
//        }
//
//        this.showflashPlayer (this.node.entries[playAllIndex].url);
//
//        var flashPlayer = document.getElementById ('flashPlayer');

        $j('#flashPlayer').bind ('ended', playNext);
    },

    playNext : function () {

        if ( !this.repatAll && this.itemsPlayed > this.node.entries.length ) {
            this.hide ();
            return;
        }
        
        if ( this.random ) {
            var loopCount = 0;
            do {
                this.playAllIndex = Math.floor(Math.random() * this.node.entries.length);  
                loopCount++;
            } while (this.node.entries[playAllIndex].type != "file"
                    && loopCount < this.node.entries.length);
            
            // INFO we looped through the list and found nothing
            if (loopCount >= this.node.entries.length ) {
                this.hide ();
                return;   
            }
            
        }
        else {
            var loopedBack = 0;
            do {
                this.playAllIndex++;
                if (this.playAllIndex > this.node.entries.length && this.repeatAll) {
                    this.playAllIndex = 0;
                    loopedBack++;
                }    
            } while (this.node.entries[playAllIndex].type != "file"
                    && loopedBack < 2);
            
            if (loopedBack > 1) {
                this.hide ();
                return;
    
            }
        }
        
        //console.log ('about to play: ' + currentNode.entries[this.playAllIndex].url);

        var flashPlayer = document.getElementById ('flashPlayer');
        this.itemsPlayed++;
        flashPlayer.src = currentNode.entries[this.playAllIndex].url;
    },

    handleKeyUp: function (event) {
        if ( ! this.visible ) {
            return;            
        }
        switch ( event.keyCode ) {
            case 48:
                if ( this.zoom == 'normal' ) {
                    this.flashWidth = $j('#flashPlayer').css('width');
                    this.flashHeight = $j('#flashPlayer').css('height');
                    
                    $j('#flashPlayer').css('width', '100%' );
                    $j('#flashPlayer').css('height', '100%' );
                    this.zoom = 'full';
                }                                
                break;
            case 50:
                if ( this.zoom != 'normal' ) {
                    $j('#flashPlayer').css('width', this.flashWidth );
                    $j('#flashPlayer').css('height', this.flashHeight );
                    this.zoom = 'normal';
                }
                break;
            case 37:
                $j('#flashPlayer')[0].currentTime = $j('#flashPlayer')[0].currentTime - 20;
                break;
            case 3:
                $j('#flashPlayer')[0].currentTime = $j('#flashPlayer')[0].currentTime + 120;
                break;
            case 39:
                $j('#flashPlayer')[0].currentTime = $j('#flashPlayer')[0].currentTime + 20;
                break;
            case 40:
                $j('#flashPlayer')[0].currentTime = $j('#flashPlayer')[0].currentTime - 120;
                break;
            case 32:
                var myVideo = $j('#flashPlayer')[0];
                if (myVideo.paused) {
                    myVideo.play();
                }
                else {
                   myVideo.pause();
                }
                break;
            case 27:
                this.hide();
                break;       
        }
    
    },
    
    initialize: function () {
//        $j(document.documentElement).bind('keyup', this.handleKeyUp);
        
//        var that = this;
//        document.documentElement.on('keyup', function ( event ) { that.handleKeyUp( event ); });
    }

},{});

$j (document).ready (function () {
    layerRegistry.register(new FlashLayer());
});