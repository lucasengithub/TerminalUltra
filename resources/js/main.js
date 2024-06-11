Neutralino.init();


Neutralino.window.setTitle('Terminal');

Neutralino.events.on("windowClose", onWindowClose);

function onWindowClose() {
    Neutralino.app.exit();
}


const term = new Terminal();
if (typeof term !== 'undefined' && typeof Neutralino !== 'undefined') {
    term.open(document.getElementById('terminal'));
  
    term.onData(async (data) => {
      try {
        const result = await Neutralino.os.execCommand(data);
        term.write(`\r\n${result.stdOut || result.stdErr}`);
      } catch (error) {
        term.write(`\r\nError: ${error.message}`);
      }
    });
  } else {
    console.error('Term or Neutralino is not defined');
  }