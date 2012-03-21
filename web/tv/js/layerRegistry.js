var LayerRegistry = Class.create( {
    
    layers: {},
    
    register: function ( layer ) {
        
        var name = layer.getName();
        
        if ( ! name ) {
            throw new "name is undefined for layer";
        }
        
        this.layers[name] = layer;
        
        var layerHtml = '<div class="layer ' + name + '"></div>';
        
        var layersElem = $j('.layers');    
        
        layersElem.html ( layersElem.html() + layerHtml + "\n");
    },
    
    getLayer: function ( name ) {
        return this.layers[name];
    }
    
});

var layerRegistry = new LayerRegistry();