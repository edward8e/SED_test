# SED_test
NED SED and Galaxy Envrionments

Responsitory Test Website: https://edward8e.github.io/sed_proto

ARP 220
SED reference: http://ned.ipac.caltech.edu/cgi-bin/datasearch?objname=arp+220&meas_type=bot&ebars_spec=ebars&label_spec=no&x_spec=freq&y_spec=Fnu_jy&xr=-1&of=table&search_type=Photometry

ARP 220
Galaxy Environment reference: http://ned.ipac.caltech.edu/cgi-bin/denv?obj=arp+220&cz=&Ho=73&OM=0.27&OL=0.73&dist=&plot=1



#Running the Server Locally:

1. Open Terminal and Change Directory

cd ~/documents/github/sed_proto


2. Python Simple Server Code

python -m SimpleHTTPServer 8000


3. Open Local Server

http://0.0.0.0:8000


### SED Tool in JavaScript

List of functions

1. `InitialPlot()` - upon correct object name input, pulls XML file and runs `xmlParser`
2. `InitialPlotURL()` - passes objname ID via url, pulls XML file and runs `xmlParser`
3. `xmlParser(xml)` - parses xml file and builds data arrays
4. `LoadPlot()` - begins plot building/plotly JSON file building
  - `ErrorBarParse()` - ErrorBar Function
  - `UpperLimit()` - Checks UpperLimit
  - `UnitConversions()` - Unit Conversions for SED Points
  - `LineSplit()` - splits the lines from the SED points
  - `LoadData()` - pushes the array of data into function
  - `CreateTrace()` - Creates object and appends to graph
  - `CreateAnnotations()` - Creates Annotations
5. `AddSED()` - pulls additional SED data via left inputbox
  - `AddPlot()` - begins plot building/plotly JSON file building
6. `xmlParserAdd(xml)` - parses additional SED data via `AddSED()` function
7. `GalaxySelector()` - generates left input box added galaxy
8. `InitialCoordinates()` - Initializes X and Y coordinates
