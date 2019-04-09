///////////////////////
/// Load Media File ///
///////////////////////

function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('./audio/sound1.mp3');
}



/////////////////////
/// Set up Canvas ///
/////////////////////

function setup() {

    var cnv = createCanvas(900, 600);
    cnv.mouseClicked(togglePlay);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    fft = new p5.FFT();
    slider = createSlider(0, 1, 0.5, 0.01);


}


function draw() {

    sound.setVolume(slider.value()); /// Volume Slider ///
    background(55);
    noStroke();
    var spectrum = fft.analyze(); /// Global Analyzer ///

    ////////////////////////////////
    /// Analyze: Bass, Mid, High ///
    ////////////////////////////////

    var soundBass       = fft.getEnergy("bass");
    var soundMid        = fft.getEnergy("mid");
    var soundLowMid     = fft.getEnergy("lowMid");
    var soundHighMid    = fft.getEnergy("highMid");
    var soundTreble     = fft.getEnergy("treble");

    ////////////////////////////////
    /// Map: Bass, Mid, High     ///
    ////////////////////////////////

    var mapBass         = map(soundBass, 0, 255, -200, 0 );
    var mapMid          = map(soundMid, 0, 255, -150, 50 );
    var mapLowMid       = map(soundLowMid,0, 255, -200, 0 );
    var mapHighMid      = map(soundHighMid, 0, 255, -150, 50 );
    var mapTreble       = map(soundTreble, 0, 255, -200, 0 );

    // Define in how many pieces you want to divide the circle
    var pieces = 32;

    // Circle's radius
    var radius = 150;

    // Move the origin to the center of the canvas
    translate( width/2, height/2 );

    // The centered circle

    stroke(55);
    ellipse( 0, 0, radius );

    // For each piece draw a line
    for( var i = 0; i < pieces; i++ ) {

        // Rotate the point of origin
        rotate( TWO_PI / pieces );

        // Draw the red lines
        stroke(0,191,255);
        line( 10, radius/2, 0, radius );

        //Optionally also draw to the opposite direction
        // stroke( 0 );
        // line( -10, radius/2, 0, radius );
    }


    for( var i = 0; i < pieces; i++ ) {

        rotate( TWO_PI / pieces );

        // Draw the bass lines
        line( mapBass, radius/2, 0, radius );

        // // Draw the mid lines
        line( mapLowMid, radius/2, 0, radius );

        // Draw the mid lines
        line( mapMid, radius/2, 0, radius );

        // // Draw the mid lines
        line( mapHighMid, radius/2, 0, radius );

        // Draw the treble lines
        line( mapTreble, radius/2, 0, radius );

    }









    // fill(0, 255, 0); /// Spectrum Color ////
    //
    //
    // for (var i = 0; i < spectrum.length; i++) {
    //     var x = map(i, 0, spectrum.length, 0, width);
    //     var h = -height + map(spectrum[i], 0, 255, height, 0);
    //     rect(x, height, width / spectrum.length, h)
    // }
    //
    // var waveform = fft.waveform();
    //
    // noFill();
    // beginShape();
    // stroke(255, 0, 0); // waveform is red
    // strokeWeight(1);
    //
    // for (var i = 0; i < waveform.length; i++) {
    //     var x = map(i, 0, waveform.length, 0, width);
    //     var y = map(waveform[i], -1, 1, 0, height);
    //     vertex(x, y);
    // }
    // endShape();


}

/// Play / Pause Option ///

function togglePlay() {
    if (sound.isPlaying()) {
        sound.pause();
    } else {
        sound.loop();
    }
}



