var AudioLayer = Class.create( {

    visible : false,
    zoom : "normal",
    random: false,
    audioWidth: 0,
    audioHeight: 0,
    playAllIndex: 0,
    node: null,
    entries: null,
    itemsPlayed: 0,
    repeatAll: false,
    
    getName: function () {
        return "audio";
    },

    show : function () {
        this.visible = true;
        
        
        var html = '';
        
        html += '<div style="text-align: center; " class="className">';
        html += '<img src="images/music_background_240x320_9.gif" /><br/>';
        html += '<audio controls="true" id="audioPlayer" autoplay="true" autobuffer="true"'
            + 'style="margin: auto;"'
            + // width: 100%"' +
            'poster="loading_spinner2.gif"'
            + 'name="media" src="' + this.node.url + '"></audio>';
        html += '</div>';
       
        $j('.audio').css ('display', 'block');
        $j('.audio').html ( html );
        
        this.visible = true;
        this.zoom = 'normal';
    },

    hide : function () {
        $j('.audio').css ('display', 'none');
        $j('.audio').html ('');
        this.visible = false;        
    },
    
    setNode: function ( node ) {
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
//        this.showaudioPlayer (this.node.entries[playAllIndex].url);
//
//        var audioPlayer = document.getElementById ('audioPlayer');

        $j('#audioPlayer').bind ('ended', playNext);
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

        var audioPlayer = document.getElementById ('audioPlayer');
        this.itemsPlayed++;
        audioPlayer.src = currentNode.entries[this.playAllIndex].url;
    },

    handleKeyUp: function (event) {
        if ( ! this.visible ) {
            return;            
        }
        switch ( event.keyCode ) {
            case 48:
                if ( this.zoom == 'normal' ) {
                    this.audioWidth = $j('#audioPlayer').css('width');
                    this.audioHeight = $j('#audioPlayer').css('height');
                    
                    $j('#audioPlayer').css('width', '100%' );
                    $j('#audioPlayer').css('height', '100%' );
                    this.zoom = 'full';
                }                                
                break;
            case 50:
                if ( this.zoom != 'normal' ) {
                    $j('#audioPlayer').css('width', this.audioWidth );
                    $j('#audioPlayer').css('height', this.audioHeight );
                    this.zoom = 'normal';
                }
                break;
            case 37:
                $j('#audioPlayer')[0].currentTime = $j('#audioPlayer')[0].currentTime - 20;
                break;
            case 3:
                $j('#audioPlayer')[0].currentTime = $j('#audioPlayer')[0].currentTime + 120;
                break;
            case 39:
                $j('#audioPlayer')[0].currentTime = $j('#audioPlayer')[0].currentTime + 20;
                break;
            case 40:
                $j('#audioPlayer')[0].currentTime = $j('#audioPlayer')[0].currentTime - 120;
                break;
            case 32:
                var myVideo = $j('#audioPlayer')[0];
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

    }

},{});

$j (document).ready (function () {
    layerRegistry.register(new AudioLayer());
});
layerRegistry.register(new AudioLayer());