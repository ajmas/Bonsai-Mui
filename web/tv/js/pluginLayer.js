var PluginLayer = Class.create( {

    visible : false,
    zoom : "normal",
    random: false,
    pluginWidth: 0,
    pluginHeight: 0,
    playAllIndex: 0,
    node: null,
    entries: null,
    itemsPlayed: 0,
    repeatAll: false,
    
    getName: function () {
        return "plugin";
    },
    
    show : function () {
        this.visible = true;
        
        
        var html = '';
        // http://forum.telestream.net/forum/messageview.aspx?catid=8&threadid=2896
        // http://www.videolan.org/doc/play-howto/en/ch04.html#id591206
        html += '<div style="text-align: center; " class="className">';
        //type="application/x-vlc-plugin" 
        html += '<embed id="pluginPlayer" src="' + this.node.url + '"  target="' + this.node.url + '" scale="aspect" autostart="true" showControls="true" style="margin: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0; " />';
        html += '</div>';
        html += '<a href="javascript:;" onclick="$j(\'#pluginPlayer\').play()">Play video1</a>';
        html += '<a href="javascript:;" onclick="$j(\'#pluginPlayer\').pause()">Pause video1</a>';
        html += '<a href="javascript:;" onclick="$j(\'#pluginPlayer\').stop()">Stop video1</a>';
        html += '<a href="javascript:;" onclick="$j(\'#pluginPlayer\').fullscreen()">Fullscreen</a>';
       
        $j('.plugin').css ('display', 'block');
        $j('.plugin').html ( html );
        
        this.visible = true;
        this.zoom = 'normal';
    },

    hide : function () {
        $j('.plugin').css ('display', 'none');
        $j('.plugin').html ('');
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
//        this.showpluginPlayer (this.node.entries[playAllIndex].url);
//
//        var pluginPlayer = document.getElementById ('pluginPlayer');

        $j('#pluginPlayer').bind ('ended', playNext);
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

        var pluginPlayer = document.getElementById ('pluginPlayer');
        this.itemsPlayed++;
        pluginPlayer.src = currentNode.entries[this.playAllIndex].url;
    },

    handleKeyUp: function (event) {
        if ( ! this.visible ) {
            return;            
        }
        switch ( event.keyCode ) {
            case 48:
                if ( this.zoom == 'normal' ) {
                    this.pluginWidth = $j('#pluginPlayer').css('width');
                    this.pluginHeight = $j('#pluginPlayer').css('height');
                    
                    $j('#pluginPlayer').css('width', '100%' );
                    $j('#pluginPlayer').css('height', '100%' );
                    this.zoom = 'full';
                }                                
                break;
            case 50:
                if ( this.zoom != 'normal' ) {
                    $j('#pluginPlayer').css('width', this.pluginWidth );
                    $j('#pluginPlayer').css('height', this.pluginHeight );
                    this.zoom = 'normal';
                }
                break;
            case 37:
                $j('#pluginPlayer')[0].currentTime = $j('#pluginPlayer')[0].currentTime - 20;
                break;
            case 3:
                $j('#pluginPlayer')[0].currentTime = $j('#pluginPlayer')[0].currentTime + 120;
                break;
            case 39:
                $j('#pluginPlayer')[0].currentTime = $j('#pluginPlayer')[0].currentTime + 20;
                break;
            case 40:
                $j('#pluginPlayer')[0].currentTime = $j('#pluginPlayer')[0].currentTime - 120;
                break;
            case 32:
                var myVideo = $j('#pluginPlayer')[0];
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
    layerRegistry.register(new PluginLayer());
});