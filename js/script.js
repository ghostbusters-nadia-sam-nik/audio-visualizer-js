///////////////////////
/// Load Media File ///
///////////////////////



function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('./audio/sound2.mp3');
}





/////////////////////
/// Set up Canvas ///
/////////////////////

function setup() {

    var cnv = createCanvas(900, 300);
    cnv.mouseClicked(togglePlay);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    fft = new p5.FFT();
    slider = createSlider(0, 1, 0.5, 0.01)

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

    var mapBass         = map(soundBass, 0, 255, -100, 100 );
    var mapMid          = map(soundMid, 0, 255, -150, 150 );
    var mapLowMid       = map(soundLowMid,0, 255, -200, 100 );
    var mapHighMid      = map(soundHighMid, 0, 255, -100, 150 );
    var mapTreble       = map(soundTreble, 0, 255, -100, 250 );

}


function draw() {


    sound.setVolume(slider.value()); /// Volume Slider ///
    background(0);
    noStroke();
    var spectrum = fft.analyze(); /// Global Analyzer ///

    fill(0, 255, 0); /// Spectrum Color ////


    for (var i = 0; i < spectrum.length; i++) {
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h)
    }

    var waveform = fft.waveform();

    noFill();
    beginShape();
    stroke(255, 0, 0); // waveform is red
    strokeWeight(1);
    for (var i = 0; i < waveform.length; i++) {
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();

    text('click to play/pause', 4, 10);
}

/// Play / Pause Option ///

function togglePlay() {
    if (sound.isPlaying()) {
        sound.pause();
    } else {
        sound.loop();
    }
}