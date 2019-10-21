var capture;
var mic = new p5.AudioIn();
var rec = new p5.SpeechRec();
var speech = new p5.Speech();
speech.onStart = speechStarted;
speech.onEnd = speechEnded;
rec.continuous = true;
var last;
var angle = 0;
var start = 0;
var lang;

function preload() {
  blockatiel = loadImage("blockatiel.png");
  cockatiel = loadImage("cockatiel.jpg");
  beak = loadImage("beak.png");
  din = loadFont("din.ttf");
}

function setup() {
  createCanvas(windowWidth, windowWidth*.5625);
  angleMode(DEGREES);
  var w = width;
  var h = height;

  mic.start();
  rec.start();
}

function draw() {
  w = width;
  h = height;

  if (start==0) {
    background(150);
    fill(0);
    noStroke();
    textFont(din);

    image(blockatiel, -.1*w, 0, w, h);

    textSize(.03*w);
    text("Choose your language:", .6*w, .45*h);
    push();
      textAlign(CENTER);
      textSize(.025*w);
      text("ENG", .645*w, .557*h);
      text("ITA", .755*w, .557*h);
      noFill();
      stroke(0);
      strokeWeight(.0035*w);
      eng = rect(.6*w, .5*h, .09*w, .085*h);
      ita = rect(.71*w, .5*h, .09*w, .085*h);
      textSize(.03*w);
    pop();
  }

  if (start==1) {
    background(0);
    speech.setPitch(2);
    speech.setRate(.8);

    image(cockatiel, 0, 0, w, h);

    push();
      frameRate(20);
      translate(.328*w, .225*h)
      rotate(angle*random(0, 20));
      becco = image(beak, -.328*w, -.225*h, w, h);
    pop();

    textAlign(LEFT, CENTER);
    textSize(.038*w);
    if (lang) {text("TALK WITH ME!", .65*w, .43*h)}
    else {text("PARLA CON ME!", .65*w, .43*h)}

    rect(.65*w, .5*h, .27*w, .008*h);

    if (rec.resultString!=last) {
      speech.speak(rec.resultString);
      last = rec.resultString;
    }

    textAlign(LEFT, TOP);
    textSize(.02*w);
    if (rec.resultValue) {
      text(rec.resultString[0].toUpperCase() + rec.resultString.slice(1).toLowerCase() + ".", .65*w, .55*h, .27*w, h);
    } else if (!rec.resultValue) {
        if (lang) {text("Tell me something.", .65*w, .55*h, .27*w, h)}
        else {text("Dimmi qualcosa.", .65*w, .55*h, .27*w, h)}
    }
  }
}

function mouseClicked() {
  if (.6*w < mouseX && mouseX < .69*w && .5*h < mouseY && mouseY < .585*h) {
    speech.setVoice("Google US English");
    start = 1;
    lang = true;
  }
  if (.71*w < mouseX && mouseX < .8*w && .5*h < mouseY && mouseY < .585*h) {
    speech.setVoice("Google italiano");
    start = 1;
  }
}

function windowResized() {resizeCanvas(windowWidth, windowWidth*.5625)}
function speechStarted() {angle = 1}
function speechEnded() {angle = 0}
