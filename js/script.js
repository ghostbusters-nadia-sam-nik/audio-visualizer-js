///////////////////////
/// Load Media File ///
///////////////////////

function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('./audio/sound4.mp3');
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

// function mousePressed() {
//     ele.showControls();
//     background(0);
//     text('Controls Shown', width / 2, height / 2);
// }

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
    var pieces = 64; // Number of elements around the circle
    var radius = 25; // Circle's Radius

    translate( width/2, height/2 ); // Move the origin to the center of the canvas


    ///////////////////////////
    /// The centered circle ///
    ///////////////////////////

    stroke(0,191,255, 10); // radius color stroke
    fill(55); // middle circle / radius color fill
    ellipse( 0, 0, radius ); // originating circle for all lines

    // For each piece draw a line
    for( var i = 0; i < pieces; i++ ) {

        // Rotate the point of origin
        rotate( TWO_PI / pieces );

        // Draw lines to canvas
        stroke(0,191,255, 10);
        line( 10, radius/2, 0, radius );
    }

    for( var i = 0; i < pieces; i++ ) {

        rotate( TWO_PI / pieces );

        /////////////////////////
        /// Draw canvas lines ///
        /////////////////////////
        stroke(255,73,61, 80);
        line( mapBass, radius/2, 0, radius );
        stroke(73,249,255, 40);
        line( mapLowMid, radius/2, 0, radius );
        stroke(70,250,255, 80);
        line( mapMid, radius/2, 0, radius );
        stroke(65,240,255, 40);
        line( mapHighMid, radius/2, 0, radius );
        stroke(255,213,73, 80);
        line( mapTreble, radius/2, 0, radius );
    }
}

/// Play / Pause Option ///

function togglePlay() {
    if (sound.isPlaying()) {
        sound.pause();
    } else {
        sound.loop();
    }
}



