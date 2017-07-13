//pulls in the CSV file
Plotly.d3.csv('arp_220.csv', function(err, dataCSV){

  var x = [], y = [], t = [], s = [], type = [], number = [], errorBar = [],
  xline = [], yline = [], xWavelength = [], xlineWavelength = [], ySI = [],
  yJyHz = [], yWM = [], ylineWM = [],
   errorBarSI = [], errorBarJyHz = [], errorBarWM = [], xComplete = [];

  var OPassband = [], PMeasurement = [], Uncertainty = [], Units = [], Frequency = [], NEDMeasurement = [],
      NEDUncertainty = [], NEDUnits = [], Refcode = [], Significance = [], PFrequency = [], FMode = [], CTargeted = [],
      SMode = [], Qualifiers = [], Comments = [];
  dataCSV.forEach(function(p) {
          x.push(p['Frequency']);
          y.push(p['NED Photometry Measurement']);
          t.push(p['Comments']);
          s.push(p['Photometry Measurement']);
          type.push(p['Frequency Mode']);
          number.push(p['No.']);
          errorBar.push(p['NED Uncertainty']);
          xline.push(p['Frequency']);
          yline.push(p['NED Photometry Measurement']);
          xComplete.push(p['Frequency']);

          //Table Data
          OPassband.push(p['Observed Passband']);
          PMeasurement.push(p['Photometry Measurement']);
          Uncertainty.push(p['Uncertainty']);
          Units.push(p['Units']);
          Frequency.push(p['Frequency']);
          NEDMeasurement.push(p['NED Photometry Measurement']);
          NEDUncertainty.push(p['NED Uncertainty']);
          NEDUnits.push(p['NED Units']);
          Refcode.push(p['Refcode']);
          Significance.push(p['Significance']);
          PFrequency.push(p['Published frequency']);
          FMode.push(p['Frequency Mode']);
          CTargeted.push(p['Coordinates Targeted']);
          SMode.push(p['Spatial Mode']);
          Qualifiers.push(p['Qualifiers']);
          Comments.push(p['Comments']);
      });


//---------------------Splits x and y broad-band and line points----------------------//
var arrayLength = type.length;
var i;
var out;

for(i = 0; i < arrayLength; i++)
{
  if (
    type[i] == ' Line measurement; flux integrated over line; lines measured in emission'
    ||
    type[i] == ' Line measurement; flux integrated over line'
  ){

    delete x[i];
    delete y[i];
  }
  else{
    out = true;
    delete xline[i];
    delete yline[i];
  }
}




var errorBarNull = [];
//filters out the strings and removes "+/- syntax"
 for(var i = 0; i < arrayLength; i++)
 {
    errorBar[i] = errorBar[i].replace("+/-",""); //removes "+/-"
    errorBarNull[i] = 0;
 }

//Because x[] has blanks in array, xComplete was used because it has the full array
 //---------------------computes x Wavelength values----------------------//

 for(i = 0; i < arrayLength; i++)
 {
   xWavelength[i] = (299792458/x[i]) * 1000000;
   xlineWavelength[i] = (299792458/xline[i]) * 1000000;

   ySI[i] = y[i] * Math.pow(10, -26);
   errorBarSI[i] = errorBar[i] * Math.pow(10, -26);

   yJyHz[i] = y[i] * x[i];
   errorBarJyHz[i] = errorBar[i] * xComplete[i];

   yWM[i] = ySI[i] * x[i];
   ylineWM[i] = yline[i] * Math.pow(10, -26);
   errorBarWM[i] = errorBarSI[i] * xComplete[i];
 }

//fix for error bars

 for(i = 0; i < arrayLength; i++)
 {
   if (
     type[i] == ' Line measurement; flux integrated over line; lines measured in emission'
     ||
     type[i] == ' Line measurement; flux integrated over line'
   ){
     errorBarWM[i] = errorBar[i] * Math.pow(10, -26);
     errorBarJyHz[i] = errorBar[i];
     errorBarSI[i] = errorBarWM[i];

   }
   else{
   }
 }





var data = [
      {mode: 'markers',
      type: "scatter",
      name: "SED Points",
      text: number,
      // marker:{color: 'rgb(0,0,139)'},
      //
      // marker: {symbol: 'circle-open'},
      x: x,
      y: y,
      error_y: {
        type: 'data',
        array: errorBar,
        visible: true,
        thickness: 1,
        // color: 'rgb(0,0,139)'
      }}
  ];

//Graph axis related things
var layout = {
  xaxis: {
    title: 'log(<em>v</em> [Hz])',
    type:'log',
    autorange: true,
    linecolor: 'black',
    linewidth: 2,
    mirror: true,
    ticks: 'inside',
    ticklen: 10,
    tickwidth: 2,
    exponentformat: "power"
    },
  yaxis: {
    title: 'log(λ [μm])',
    type:'log',
    autorange: true,
    linecolor: 'black',
    linewidth: 2,
    mirror: true,
    ticks: 'inside',
    ticklen: 10,
    tickwidth: 2,
    exponentformat: "power"
    },
  // yaxis2: {
  //   title: 'Jy-Hz',
  //   type:'log',
  //   ticks: 'inside',
  //   ticklen: 10,
  //   tickwidth: 2,
  //   overlaying: 'y',
  //   side: 'right',
  //   exponentformat: "power",
  //   // visible: false
  //   },
  margin: {t: 20},
  hovermode: false,
};

var toImage2 = {
  name: 'Download plot as a SVG',
  icon: Plotly.Icons.camera,
  click: function(gd) {
    Plotly.downloadImage(gd, {format: 'svg'})
  }
};


//Edits made to the toolbar
var toolbar = {
	scrollZoom: true, // lets us scroll to zoom in and out - works
	showLink: false, // removes the link to edit on plotly - works
	modeBarButtonsToRemove: ['select2d', 'lasso2d', 'sendDataToCloud'],
  displaylogo: false,
  modeBarButtonsToAdd: [toImage2]
};



var xchange = xline;
var ychange = yline;
var errorBarTrue = errorBar;


// //---------------------Error BARs Buttons----------------------//
// // 1. Create the button
// var button = document.getElementById("ErrorBarON").onclick = function() {
//   //checks which yaxis is on
//   var answer2 = document.getElementById("ddl2");
//   if(answer2[answer2.selectedIndex].value == 1){
//     errorBarTrue = errorBar;
//   }
//   else if(answer2[answer2.selectedIndex].value == 2){
//     errorBarTrue = errorBarSI;
//   }
//   else if(answer2[answer2.selectedIndex].value == 3){
//     errorBarTrue = errorBarJyHz;
//   }
//   else {
//     errorBarTrue = errorBarWM;
//   }
//
//   var data_update = {
//     error_y: {
//       type: 'data',
//       array: errorBarTrue,
//       visible: true,
//       thickness: 1,
//       // color: 'rgb(0,0,139)'
//     }
// };
//     Plotly.update('my-graph', data_update);
//
//
// };
//

// // 1. Create the button
// var button1 = document.getElementById("ErrorBarOFF").onclick = function() {
//
//     var data_update = {
//       error_y: {
//         type: 'data',
//         array: errorBarNull,
//         visible: true,
//         thickness: 0.001,
//         // color: 'rgb(0,0,139)'
//       }
//   };
//     Plotly.update('my-graph', data_update);
// };

//---------------------Error Bar Switch----------------------//
//Error Bars
var checkbox = document.querySelector("input[name=onoffswitch]").onchange = function() {
if(this.checked) {
  //checks which yaxis is on
  var answer2 = document.getElementById("ddl2");
  if(answer2[answer2.selectedIndex].value == 1){
    errorBarTrue = errorBar;
  }
  else if(answer2[answer2.selectedIndex].value == 2){
    errorBarTrue = errorBarSI;
  }
  else if(answer2[answer2.selectedIndex].value == 3){
    errorBarTrue = errorBarJyHz;
  }
  else {
    errorBarTrue = errorBarWM;
  }



  //When Switch is on
  var data_update = {
    error_y: {
      array: errorBarTrue,
      thickness: 1,
    }};

    Plotly.restyle('my-graph', data_update);
  } else {
    //when Switch is off
    var data_update = {
      error_y: {
        array: errorBarNull,
        thickness: 0.001,
      }};

    Plotly.restyle('my-graph', data_update);
  }
}


//---------------------Hover on and off----------------------//
var checkbox1 = document.querySelector("input[name=onoffswitch1]").onchange = function() {
if(this.checked) {
  //When switch is on
    var layout_update = {
      hovermode: 'closest'
    };

    Plotly.relayout('my-graph', layout_update);
  } else {
    //when switch is off
      var layout_update = {
        hovermode: false
      };

    Plotly.relayout('my-graph', layout_update);
  }
}



//---------------------Spectral lines on and off----------------------//
var checkbox2 = document.querySelector("input[name=onoffswitch2]").onchange = function() {
  //Checks which xaxis is on
  var answer = document.getElementById("ddl");
  var yaxis2Title;
    if(answer[answer.selectedIndex].value == 1){
      xchange = xline;
    }
    else{
      xchange = xlineWavelength;
    }
    //checks which yaxis is on
    var answer2 = document.getElementById("ddl2");
    if(answer2[answer2.selectedIndex].value == 1){
      ychange = yline;
      errorBarTrue = errorBar;
      yaxis2Title = 'log(<em>v</em>F<sub><em>v</em></sub> [Jy-Hz])';
    }
    else if(answer2[answer2.selectedIndex].value == 2){
      ychange = ylineWM;
      errorBarTrue = errorBarSI;
      yaxis2Title = 'log(<em>v</em>F<sub><em>v</em></sub> [W m<sup>-2</sup>])';
    }
    else if(answer2[answer2.selectedIndex].value == 3){
      ychange = yline;
      errorBarTrue = errorBar;
      yaxis2Title = 'log(<em>v</em>F<sub><em>v</em></sub> [Jy-Hz])';
    }
    else {
      ychange = ylineWM;
      errorBarTrue = errorBarWM;
      yaxis2Title = 'log(<em>v</em>F<sub><em>v</em></sub> [W m<sup>-2</sup>])';
    }

if(this.checked) {
  //When switch is on
  var trace_lines =
        {name: "Spectral Lines",
          mode: 'markers',
          type: "scatter",
          text: number,
          x: xchange,
          y: ychange,
          yaxis: 'y2',
          error_y: {
            type: 'data',
            array: errorBarTrue,
            visible: true,
            thickness: 1,
          }};

    var layout_update = {
      'yaxis2.title': yaxis2Title,
      'yaxis2.overlaying': 'y',
      'yaxis2.side': 'right',
      'yaxis2.type': 'log',
      'yaxis2.exponentformat': 'power',
      'yaxis2.ticks': 'inside',
      // 'yaxis2.ticklen': '10',
      // 'yaxis2.tickwidth': '2',
      'yaxis2.visible': 'true',
    };

    Plotly.relayout('my-graph', layout_update);
    Plotly.addTraces('my-graph', trace_lines);

  } else {
    //when switch is off
    //Removes the SED Trace from graph
    //had to iterate twice, because title still showed

    var layout_update = {
      yaxis2: {
        title: "",
    }
    };
    Plotly.relayout('my-graph', layout_update);
      var layout_update = {
        yaxis2: {
          visible: false,
      }
    };
      Plotly.relayout('my-graph', layout_update);
      Plotly.deleteTraces('my-graph', 1);
  }
}

//---------------------Change the X-Axis Dropdown----------------------//
var xaxis_update = jsFunction = function(value)
{
  if(value == 1){
    var data_update = {
      x:[x,xline]
    };
      var layout_update = {
        'xaxis.title': 'log(<em>v</em> [Hz])'
      };

      Plotly.restyle('my-graph', data_update);
      Plotly.relayout('my-graph', layout_update);
  }
  else{
    var data_update = {
      x:[xWavelength,xlineWavelength]
    };
      var layout_update = {
        'xaxis.title': 'log(λ [μm])'
      };

      Plotly.restyle('my-graph', data_update);
      Plotly.relayout('my-graph', layout_update);
  }

}
//---------------------END of X-Axis----------------------//

//---------------------Change the Y-Axis Dropdown----------------------//
var yaxis_update = jsFunction1 = function(value)
{
  if(value == 1){
    var data_update = {
      y:[y,yline],
      error_y: {
        array: errorBar,
        thickness: 1,
      }};
    var layout_update = {
      'yaxis.title': 'log(F<sub><em>v</em></sub> [Jy])'
    };
    Plotly.restyle('my-graph', data_update);
    Plotly.relayout('my-graph', layout_update);

  }
  else if(value == 2){
    var data_update = {
      y:[ySI,ylineWM],
      error_y: {
        array: errorBarSI,
        thickness: 1,
      }};
    var layout_update = {
      'yaxis.title': 'log(F<sub><em>v</em></sub> [W m<sup>-2</sup> Hz<sup>-1</sup>])'
    };
    Plotly.restyle('my-graph', data_update);
    Plotly.relayout('my-graph', layout_update);

  }
  else if(value == 3){
    var data_update = {
      y:[yJyHz,yline],
      error_y: {
        array: errorBarJyHz,
        thickness: 1,
      }};
    var layout_update = {
      'yaxis.title': 'log(<em>v</em>F<sub><em>v</em></sub> [Jy-Hz])'
    };
    Plotly.restyle('my-graph', data_update);
    Plotly.relayout('my-graph', layout_update);
  }
  else{
    var data_update = {
      y:[yWM,ylineWM],
      error_y: {
        array: errorBarWM,
        thickness: 1,
      }};
    var layout_update = {
      'yaxis.title': 'log(<em>v</em>F<sub><em>v</em></sub> [W m<sup>-2</sup>])'
    };
    Plotly.restyle('my-graph', data_update);
    Plotly.relayout('my-graph', layout_update);
  }

}
//---------------------END of Y-Axis----------------------//


//----------------Make Plotly Responsive-----------------//
//----------------Edits the CSS in the div---------------//
var WIDTH_IN_PERCENT_OF_PARENT = 100,
    HEIGHT_IN_PERCENT_OF_PARENT = 100;

Plotly.d3.select('#my-graph')
    .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        height: HEIGHT_IN_PERCENT_OF_PARENT + '%',
    });
var gd = Plotly.d3.select('#my-graph').node();

window.onresize = function() {
    Plotly.Plots.resize(gd);
};
//-----------------END Responsive code-------------------//

var scalescreenSize = $(window).height();
var topHeight = scalescreenSize - scalescreenSize*0.4;

var tableHeight = scalescreenSize*0.4;

// var topItem = $(".data-box").css("height");
// topItem = topItem.replace("px","");
var topItem1 = $("#settings-right").css("height");
topItem1 = topItem1.replace("px","");
var finalTopHeight = 0;

var topItem2 = $("#data-right").css("height");
topItem2 = topItem2.replace("px","");

if(topHeight < topItem2){
  finalTopHeight = topItem2;
}else{
  finalTopHeight = topHeight;
}



$(".grid-item--width--main").css("height", finalTopHeight);
// $(".grid-item").css({"height":finalTopHeight});
$(".bottom-table").css({"height":tableHeight});
// $(".grid-item--width--settings").css("height", topItem1);
$(".grid-item--width--data").css("height", topItem2);
$grid.packery('layout');



//---------------------Big Picture mode----------------------//
document.querySelector("input[name=onoffswitch4]").onchange = function() {
if(this.checked) {
  // When switch is on
    var scalescreenSize = $(window).height();
    var bigHight = scalescreenSize - scalescreenSize*0.2;

  $(".grid-item--width--main").css({
    "width": "73%",
    "height":bigHight
  });
  Plotly.Plots.resize(gd);

  // trigger layout after item size changes
  // $grid.packery('shiftLayout');
  $grid.packery('layout');
    // alert("on");
  } else {

    $(".grid-item--width--main").css({
      "width": "73%", "height": finalTopHeight
    });
    Plotly.Plots.resize(gd);
    // trigger layout after item size changes
    $grid.packery('layout');
    // alert("off");
  }
}




//---------------------On and off Data----------------------//
document.querySelector("input[name=onoffswitch5]").onchange = function() {
if(this.checked) {
  //When switch is on
  $( "#data-window" ).toggle();
  $(".grid-item--width--main").css({"width": "73%"});
  Plotly.Plots.resize(gd);
  $grid.packery('layout');
  } else {
    //when switch is off
    $( "#data-window" ).toggle();
    $(".grid-item--width--main").css({"width": "98%"});
    Plotly.Plots.resize(gd);
    $grid.packery('layout');
  }
}
// function(){
  $( "#data-window" ).toggle();
  $(".grid-item--width--main").css({"width": "98%"});
  Plotly.Plots.resize(gd);
  $grid.packery('layout');
// }


//Calls the plot into HTML
Plotly.newPlot(gd, data, layout, toolbar, checkbox, checkbox1, xaxis_update, yaxis_update, checkbox2);




//---------------------Pulls information into table----------------------//
//Event handler in plotly when it comes to hovering
var myPlot = document.getElementById('my-graph');
var hoverInfoNum = document.getElementById('hoverinfonum');
var hoverInfoOPassband = document.getElementById('hoverinfoopassband');
var hoverInfoMeasurement = document.getElementById('hoverinfomeasurement');
var hoverInfoUncertainty = document.getElementById('hoverinfouncertainty');
var hoverInfoUnits = document.getElementById('hoverinfounits');
var hoverInfoFrequency = document.getElementById('hoverinfofrequency');
var hoverInfoMeasurement2 = document.getElementById('hoverinfomeasurement2');
var hoverInfoUncertainty2 = document.getElementById('hoverinfouncertainty2');
var hoverInfoUnits2 = document.getElementById('hoverinfounits2');
var hoverInfoMode = document.getElementById('hoverinfomode');
var hoverInfoAperture = document.getElementById('hoverinfoaperture');
var hoverInfoRCode = document.getElementById('hoverinforcode');
var hoverInfoUnits2 = document.getElementById('hoverinfounits2');

myPlot.on('plotly_click', function(data){
//displays point number and acts as a counter for arrays
   var pts = '';
      for(var i=0; i < data.points.length; i++){
          pts = data.points[i].text;
      }
      var pCounter = pts - 1;


  //Display the Point number
   var numbertext = data.points.map(function(d){return (pts);});
   hoverInfoNum.innerHTML = numbertext.join('');
//Observed Passband
   var Opassbandtext = data.points.map(function(d){return(OPassband[pCounter]);});
   hoverInfoOPassband.innerHTML = Opassbandtext.join('');
//Measurement
   var Measurementtext = data.points.map(function(d){return(PMeasurement[pCounter]);});
   hoverInfoMeasurement.innerHTML = Measurementtext.join('');
//Uncertainty
   var Uncertaintytext = data.points.map(function(d){return(Uncertainty[pCounter]);});
   hoverInfoUncertainty.innerHTML = Uncertaintytext.join('');
//Units
   var Unitstext = data.points.map(function(d){return(Units[pCounter]);});
   hoverInfoUnits.innerHTML = Unitstext.join('');
//Frequency
   var Frequencytext = data.points.map(function(d){return(Frequency[pCounter]);});
   hoverInfoFrequency.innerHTML = Frequencytext.join('');
//Measurement2
   var Measurement2text = data.points.map(function(d){return(NEDMeasurement[pCounter]);});
   hoverInfoMeasurement2.innerHTML = Measurement2text.join('');
//Uncertainty2
   var Uncertainty2text = data.points.map(function(d){return(NEDUncertainty[pCounter]);});
   hoverInfoUncertainty2.innerHTML = Uncertainty2text.join('');
//Units2
   var Units2text = data.points.map(function(d){return(NEDUnits[pCounter]);});
   hoverInfoUnits2.innerHTML = Units2text.join('');
//Mode
   var Modetext = data.points.map(function(d){return(FMode[pCounter]);});
   hoverInfoMode.innerHTML = Modetext.join('');
//Aperture
   var Aperturetext = data.points.map(function(d){return(Qualifiers[pCounter]);});
   hoverInfoAperture.innerHTML = Aperturetext.join('');
//Reference Code
   var Referencetext = data.points.map(function(d){return(Refcode[pCounter]);});
   hoverInfoRCode.innerHTML = Referencetext.join('');
});

//---------------------END OF TABLE----------------------//





});
