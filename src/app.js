import newDiagram from '../resources/diagram13.dmn';

import comp1 from '../resources/diagram.dmn'

import comp2 from '../resources/diagram1.dmn'

import DmnModeler from 'dmn-js/lib/Modeler';

import fileDrop from 'file-drops';

import { migrateDiagram } from '@bpmn-io/dmn-migrate';

const dmnModeler = new DmnModeler({
  container: '#canvas'
});


var contElement = document.querySelector("#container");
var canElement = document.querySelector("#canvas");
var panElement = document.querySelector("#panel");


// (1) import DMN diagram
async function importXML(xml) {
  contElement.style.display="none";
  // (1.1) migrate to DMN 1.3 if necessary
  xml = await migrateDiagram(xml);
  // (1.2) import DMN 1.3 diagram
  dmnModeler.importXML(xml, err => {
    if (err) {
      console.error(err);
    }
      var activeEditor = dmnModeler.getActiveViewer();

    // access active editor components
    var canvas = activeEditor.get('canvas');

    // zoom to fit full viewport
    canvas.zoom('fit-viewport');

  });
}

//importXML(diagram);

// drag and drop DMN diagrams
document.querySelector('#canvas').addEventListener('dragover', fileDrop(files => {
  const { contents } = files[0];
  importXML(contents);
}));

//create new diagram 

document.querySelector('#js-create-diagram').addEventListener('click', function (e) {
  e.stopPropagation();
  e.preventDefault();
  createNewDiagram();
});

function createNewDiagram() {
  console.log('inside create diagram');
  importXML(newDiagram);
}


//export dmn
function exportDiagram() {
  dmnModeler.saveXML({ format: true }, function (err, xml) {

    if (err) {
      return console.error('could not save DMN 1.1 diagram', err);
    }

    console.log('DIAGRAM', xml);
  });
}

document.querySelector('#save-dmn').addEventListener('click', function (e) {
  e.stopPropagation();
  e.preventDefault();
  exportDiagram();
});


//LOAD COMPARE PAGE
document.querySelector('#compare-xml').addEventListener('click', function (e) {
  
  e.stopPropagation();
  e.preventDefault();
  console.log('in click funvtion');
  loadXmlDiagrams();
});



// load two xml for Comparison
 function loadXmlDiagrams() {
  console.log('loadfunction');
  canElement.style.display="none";
  panElement.style.display="none";
  contElement.style.display="block";
  var xml1 = (comp1);
  var xml2 = (comp2);
  const dmnModeler1 = new DmnModeler({
    container: '#canvas-left'
  });
  const dmnModeler2 = new DmnModeler({
    container: '#canvas-right'
  });
  
  dmnModeler1.importXML(xml1, err => {
    if (err) {
      console.error(err);
    }
    var activeEditor = dmnModeler.getActiveViewer();

    // access active editor components
    var canvas = activeEditor.get('canvas-left');

    canvas.zoom('fit-viewport');

  });

  dmnModeler2.importXML(xml2, err => {
    if (err) {
      console.error(err);
    }
  });

}


// Tab functionality 
/*
var tabs = document.getElementById('tabs');
var CLASS_NAMES = {
  drd: 'dmn-icon-lasso-tool',
  decisionTable: 'dmn-icon-decision-table',
  literalExpression: 'dmn-icon-literal-expression'
};
dmnModeler.on('views.changed', function (event) {
  var { views, activeView } = event;
  // clear tabs;
  while(tabs.hasChildNodes())
  {
    tabs.remove();
  }

  views.forEach(function (v, idx) {
    const className = CLASS_NAMES[v.type];
    var tab = document.createElement("div");
    tab.setAttribute("class", "tab" + v === activeView ? 'active' : '');
    tab.setAttribute("data-id", "tab" + idx);
    var span = document.createElement("span");
    span.setAttribute("class", className);
    span.append(v.element.name || v.element.id);
    tab.append(span);
    tabs.append(tab);
  });
});

*/


