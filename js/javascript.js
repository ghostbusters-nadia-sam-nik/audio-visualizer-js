let mic, fft;

function setup() {
    createCanvas(710, 400);
    noFill();

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
}

function draw() {
    background(200);

    let spectrum = fft.analyze();

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();
}






// function preload(){
//     sound = loadSound('./audio/sound1.mp3');
// }
//
// function setup(){
//     var cnv = createCanvas(100,100);
//     cnv.mouseClicked(togglePlay);
//     fft = new p5.FFT();
//     sound.amp(0.2);
// }
//
// function draw(){
//     background(0);
//
//     var spectrum = fft.analyze();
//     noStroke();
//     fill(0,255,0); // spectrum is green
//     for (var i = 0; i< spectrum.length; i++){
//         var x = map(i, 0, spectrum.length, 0, width);
//         var h = -height + map(spectrum[i], 0, 255, height, 0);
//         rect(x, height, width / spectrum.length, h )
//     }
//
//     var waveform = fft.waveform();
//     noFill();
//     beginShape();
//     stroke(255,0,0); // waveform is red
//     strokeWeight(1);
//     for (var i = 0; i< waveform.length; i++){
//         var x = map(i, 0, waveform.length, 0, width);
//         var y = map( waveform[i], -1, 1, 0, height);
//         vertex(x,y);
//     }
//     endShape();
//
//     text('click to play/pause', 4, 10);
// }
//
// // fade sound if mouse is over canvas
// function togglePlay() {
//     if (sound.isPlaying()) {
//         sound.pause();
//     } else {
//         sound.loop();
//     }
// }