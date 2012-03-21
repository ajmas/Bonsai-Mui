var WebLayer = Class.create( {

    visible : false,
    zoom : "normal",
    random: false,
    webWidth: 0,
    webHeight: 0,
    playAllIndex: 0,
    node: null,
    entries: null,
    itemsPlayed: 0,
    repeatAll: false,
    
    getName: function () {
        return "web";
    },
    
    show : function () {
        this.visible = true;
        
        // var url = this.node.url;
        var url = "http://lights.elliegoulding.com/";
        var html = '';
        
        html += '<iframe src="' + url + '" style="position: absolute; top: 0px; left 0px; right: 0px; bottom: 0px; margin: 0 auto; width: 100%; height: 100%;"></iframe>';

        
       
        $j('.web').css ('display', 'block');
        $j('.web').html ( html );
        
        this.visible = true;
        this.zoom = 'normal';
    },

    hide : function () {
        $j('.web').css ('display', 'none');
        $j('.web').html ('');
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
//        this.showwebPlayer (this.node.entries[playAllIndex].url);
//
//        var webPlayer = document.getElementById ('webPlayer');

        $j('#webPlayer').bind ('ended', playNext);
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

        var webPlayer = document.getElementById ('webPlayer');
        this.itemsPlayed++;
        webPlayer.src = currentNode.entries[this.playAllIndex].url;
    },

    handleKeyUp: function (event) {
        if ( ! this.visible ) {
            return;            
        }
        switch ( event.keyCode ) {
            case 48:
                if ( this.zoom == 'normal' ) {
                    this.webWidth = $j('#webPlayer').css('width');
                    this.webHeight = $j('#webPlayer').css('height');
                    
                    $j('#webPlayer').css('width', '100%' );
                    $j('#webPlayer').css('height', '100%' );
                    this.zoom = 'full';
                }                                
                break;
            case 50:
                if ( this.zoom != 'normal' ) {
                    $j('#webPlayer').css('width', this.webWidth );
                    $j('#webPlayer').css('height', this.webHeight );
                    this.zoom = 'normal';
                }
                break;
            case 37:
                $j('#webPlayer')[0].currentTime = $j('#webPlayer')[0].currentTime - 20;
                break;
            case 3:
                $j('#webPlayer')[0].currentTime = $j('#webPlayer')[0].currentTime + 120;
                break;
            case 39:
                $j('#webPlayer')[0].currentTime = $j('#webPlayer')[0].currentTime + 20;
                break;
            case 40:
                $j('#webPlayer')[0].currentTime = $j('#webPlayer')[0].currentTime - 120;
                break;
            case 32:
                var myVideo = $j('#webPlayer')[0];
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
        
        var that = this;
        document.documentElement.on('keyup', function ( event ) { that.handleKeyUp( event ); });
    }

},{});

$j (document).ready (function () {
    layerRegistry.register(new WebLayer());
});