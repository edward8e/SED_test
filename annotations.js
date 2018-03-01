

/*---------------------Creates annotation at upperlimit location----------------------
--Uses "upperlimit_broadband" to identify upperlimits via "<" indicator in data
--Creates upperlimit annotation for broadband Measurements
--Creates upperlimit annotation for line Measurements
--Creates upperlimit for combined broadband and line Measurements

*/
function CreateAnnotations() {
  for (let i = 0; i < upperlimit_broadband.length; i++) {
    annotations_upperlimit_broadband.push({
      x: Math.log10(upperlimit_broadband[i].x),
      y: Math.log10(upperlimit_broadband[i].y),
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowhead: 3,
      ax: 0,
      ay: -40,
      yshift: -30,
      standoff: 10,
      arrowcolor: '#1f77b4'
    });
  }
  for (let i = 0; i < upperlimit_line.length; i++) {
    annotations_upperlimit_line.push({
      x: Math.log10(upperlimit_line[i].x),
      y: Math.log10(upperlimit_line[i].y),
      xref: 'x2',
      yref: 'y2',
      showarrow: true,
      arrowhead: 3,
      ax: 0,
      ay: -40,
      yshift: -30,
      standoff: 10
    });
  }
  for (let i = 0; i < annotations_upperlimit_broadband.length; i++) {
    annotations_upperlimit.push(annotations_upperlimit_broadband[i]);
  }
  for (let i = 0; i < annotations_upperlimit_line.length; i++) {
    annotations_upperlimit.push(annotations_upperlimit_line[i]);
  }
}


var layout_update = {
  'annotations': annotations_upperlimit
};

return Plotly.relayout('my-graph', layout_update);
