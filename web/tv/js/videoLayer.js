var VideoLayer = Class.create( {

    visible : false,
    zoom : "normal",
    random: false,
    videoWidth: 0,
    videoHeight: 0,
    playAllIndex: 0,
    node: null,
    entries: null,
    itemsPlayed: 0,
    repeatAll: false,
    
    getName: function () {
        return "video";
    },
    
    show : function ( url ) {
        this.visible = true;
        
        if ( !url && this.node && this.node.url ) {
            url = this.node.url;
        } 
            
        $j('.video').css ('display', 'block');
        $j('.video')
                .html (
                        '<video controls="true" id="videoPlayer" autoplay="true" autobuffer="true"'
                                + 'style="margin: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0; "'
                                + // width: 100%"' +
                                'poster="loading_spinner2.gif"'
                                + 'name="media" src="' + url + '"></video>');
        this.visible = true;
        this.zoom = 'normal';
    },

    hide : function () {
        $j('.video').css ('display', 'none');
        $j('.video').html ('');
        this.node = null;
        this.visible = false;        
    },
    
    setObject: function ( node ) {
        this.node = node;
        
        this.entries = null;
        this.playAllIndex = -1;
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
//        this.showVideoPlayer (this.node.entries[playAllIndex].url);
//
//        var videoPlayer = document.getElementById ('videoPlayer');

        var that = this;
        $('videoPlayer').on ('ended', function (event) { that.playNext(); } );
    },

    playNext : function () {

        if ( !this.repatAll && this.itemsPlayed > this.entries.length ) {
            this.hide ();
            return;
        }
        
        if ( this.random ) {
            var loopCount = 0;
            do {
                this.playAllIndex = Math.floor(Math.random() * this.entries.length);  
                loopCount++;
            } while (this.entries[this.playAllIndex].type != "file"
                    && loopCount < this.node.entries.length);
            
            // INFO we looped through the list and found nothing
            if (loopCount >= this.entries.length ) {
                this.hide ();
                return;   
            }
            
        }
        else {
            var loopedBack = 0;
            do {
                this.playAllIndex++;
                if (this.playAllIndex > this.entries.length && this.repeatAll) {
                    this.playAllIndex = 0;
                    loopedBack++;
                }    
            } while (this.entries[this.playAllIndex].type != "file"
                    && loopedBack < 2);
            
            if (loopedBack > 1) {
                this.hide ();
                return;
    
            }
        }
        
        //console.log ('about to play: ' + currentNode.entries[this.playAllIndex].url);

        var videoPlayer = document.getElementById ('videoPlayer');
        this.itemsPlayed++;
        
        if ( !this.visible ) {
            this.show(this.entries[this.playAllIndex].url);
        }
        else {         
            videoPlayer.src = this.entries[this.playAllIndex].url;
        }
    },

    handleKeyUp: function (event) {
        if ( ! this.visible ) {
            return;            
        }
        switch ( event.keyCode ) {
            case 48:
                if ( this.zoom == 'normal' ) {
                    this.videoWidth = $j('#videoPlayer').css('width');
                    this.videoHeight = $j('#videoPlayer').css('height');
                    
                    $j('#videoPlayer').css('width', '100%' );
                    $j('#videoPlayer').css('height', '100%' );
                    this.zoom = 'full';
                }                                
                break;
            case 50:
                if ( this.zoom != 'normal' ) {
                    $j('#videoPlayer').css('width', this.videoWidth );
                    $j('#videoPlayer').css('height', this.videoHeight );
                    this.zoom = 'normal';
                }
                break;
            case 37:
                $j('#videoPlayer')[0].currentTime = $j('#videoPlayer')[0].currentTime - 20;
                break;
            case 38:
                $j('#videoPlayer')[0].currentTime = $j('#videoPlayer')[0].currentTime + 120;
                break;
            case 39:
                $j('#videoPlayer')[0].currentTime = $j('#videoPlayer')[0].currentTime + 20;
                break;
            case 40:
                $j('#videoPlayer')[0].currentTime = $j('#videoPlayer')[0].currentTime - 120;
                break;
            case 'N'.charCodeAt(0):
                if ( this.entries ) {
                    this.playNext ();
                }
                break;
            case 32:
                var myVideo = $j('#videoPlayer')[0];
                if (myVideo.paused) {
                    myVideo.play();
                }
                else {
                   myVideo.pause();
                }
                break;
            case 27:
                event.stopPropagation();
                this.hide();
                break;       
        }
        
    
    },
    
    initialize: function () {

    }

},{});

$j (document).ready (function () {
    layerRegistry.register(new VideoLayer());
});