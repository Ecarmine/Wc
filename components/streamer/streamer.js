//REVIEW (--VARIBALES--)
//#region ---VARIABLES---

//* VARIABLES CONSTANTES (GLOBALES)
var SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
var STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
var session;
var stream;
var PRELOADER_URL =
  "https://github.com/flashphoner/flashphoner_client/raw/wcs_api-2.0/examples/demo/dependencies/media/preloader.mp4";

//#endregion

console.log("----------------------");
console.log(Flashphoner);
console.log("----------------------");

//REVIEW (--FUNCIONES--)
//#region ---FUNCIONES---

//Init Flashphoner API on page load
//* METODO INICIALIZADO DE API AL CARGAR LA PAGINA
function init_api() {
  //* INCIALIZACION DE API
  Flashphoner.init({});

  //Connect to WCS server over websockets
  //* CONEXION AL SERVIDOR MEDIANTE WEBSOCKETS
  try {
    //* CREACION DE SESION
    session = Flashphoner.createSession({
      //specify the address of your WCS
      //* URL DEL SERVER
      urlServer: "wss://demo.flashphoner.com:8443",
    }).on(SESSION_STATUS.ESTABLISHED, function (session) {
      console.log("%cESTABLISHED - ESTABLECIDA", "color:#00FF00");
    });
  } catch (error) {
    return console.log(erorr);
  }

  //* LLAMADO DE BOTONES DE STREAM
  publishBtn.onclick = publishClick;
  // playBtn.onclick = playClick;
  stopBtn.onclick = stopPublish;
}

//Detect browser
//* DETECTOR DE NAVEGADOR
var Browser = {
  isSafari: function () {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },
};

/**
*
If browser is Safari, we launch the preloader before publishing or playing the stream.
Publishing or playback should start strictly upon a user's gesture (i.e. button click). This is limitation of mobile Safari browsers.
https://docs.flashphoner.com/display/WEBSDK2EN/Video+playback+on+mobile+devices
*
**/

//* INICIO DE STREAM DESDE NAVEGADOR SAFARI
function publishClick() {
  if (Browser.isSafari()) {
    Flashphoner.playFirstVideo(
      document.getElementById("publish"),
      true,
      PRELOADER_URL
    ).then(function () {
      publishStream();
    });
  } else {
    publishStream();
  }
}

//* VISUALIZACION DE STREAM DESDE NAVEGADOR SAFARI
function playClick() {
  if (Browser.isSafari()) {
    Flashphoner.playFirstVideo(
      document.getElementById("play"),
      true,
      PRELOADER_URL
    ).then(function () {
      playStream();
    });
  } else {
    playStream();
  }
}

//Publish stream
//* INICIALIZACION DE STREAM
function publishStream() {
  stream = session.createStream({
    name: "stream",
    display: document.getElementById("publish"),
  });
  stream.publish();
}

//Stopping stream
//* DETIENE EL STREAM
function stopPublish() {
  stream.stop();
  console.log("paro  stream");
}

//Playing stream
//* VISUALIZACION DE ESTREAM
function playStream() {
  session
    .createStream({
      name: "stream",
      display: document.getElementById("play"),
    })
    .play();
}

//#endregion
