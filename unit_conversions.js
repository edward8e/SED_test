//---------------------Data received from XML file----------------------//

xAxis_Data = []             //Broadband Measurements
xAxis_Line_Data = []        //Line Measurements

yAxis_Data = []             //Broadband Measurements
yAxis_Line_Data = []        //Line Measurements

yAxis_ErrorBar_Data = []    //Uncertainty Measurements

//---------------------Computes both errorbar values and unit change values----------------------//
function UnitConversions() {
  for (var i = 0; i < array.length; i++) {
    xAxis_Wavelength[i] = (299792458 / xAxis_Data[i]) * 1000000;
    xAxis_Line_Wavelength[i] = (299792458 / xAxis_Line_Data[i]) * 1000000;

    yAxis_SI_Unit[i] = yAxis_Data[i] * Math.pow(10, -26);
    yAxis_ErrorBar_SI_Unit[i] = yAxis_ErrorBar_Data[i] * Math.pow(10, -26);

    yAxis_JyHz[i] = yAxis_Data[i] * xAxis_Data[i];
    yAxis_ErrorBar_JyHz[i] = yAxis_ErrorBar_Data[i] * xAxis_Data[i];

    yAxis_WM[i] = yAxis_SI_Unit[i] * xAxis_Data[i];
    yAxis_lineWM[i] = yAxis_Line_Data[i] * Math.pow(10, -26);
    yAxis_ErrorBar_WM_Unit[i] = yAxis_ErrorBar_SI_Unit[i] * xAxis_Data[i];
  }
}

//---------------------Resulting Units----------------------//
//X Axis: 2
  //---Set 1---//
  //xAxis_Data
  //xAxis_Line_Data

  //---Set 2---//
  //xAxis_Wavelength
  //xAxis_Line_Wavelength


//Y Axis: 4
  //---Set 1---//
  //yAxis_Data
  //yAxis_Line_Data
  //yAxis_ErrorBar_Data

  //---Set 2---//
  //yAxis_SI_Unit
  //yAxis_lineWM
  //yAxis_ErrorBar_SI_Unit

  //---Set 3---//
  //yAxis_JyHz
  //yAxis_ErrorBar_JyHz

  //---Set 4---//
  //yAxis_WM
  //yAxis_lineWM
  //yAxis_ErrorBar_WM_Unit
