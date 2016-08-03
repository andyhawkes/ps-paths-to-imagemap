/*****************************************************************
*
* PathsToImageMap 1.0 - by Andy Hawkes - http://www.andyhawkes.co.uk/
*
* v 1.0 - 2010.10.14
*
* Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
*
*****************************************************************/


/*
* -------------------------------------------------------------
* Array search helper function
* -------------------------------------------------------------
*/

function checkArrayForValue(haystack, needle) {
	haystack.sort();
	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i] == needle) {
			return true;
		}
	}
	return false;
}


/*
* -------------------------------------------------------------
* PathsToImageMap Core Function
* -------------------------------------------------------------
*/

function doPathExport(el, fileOutput, filePath) 
{

	// Set units to PIXELS
    app.preferences.rulerUnits = Units.PIXELS
    app.preferences.typeUnits = TypeUnits.PIXELS

	// Get the paths within the current document
	var paths = el.pathItems;

	// Start the image map output
	fileOutput.writeln('<map name="imageMap">');

	// Loop through all paths
	for (var pathIndex = 0; pathIndex < paths.length; pathIndex++)
	{
		// Get the point coordinates for the current path
		var currentPath = paths[pathIndex];
		// Make an array to hold points
		var points = [];
		// Make arrays to hold point x and y coordintes so we can check if the current path is rectangular
		var xvals = [];
		var yvals = [];
		// Loop through the sub-path items
		for (var u = 0; u < currentPath.subPathItems.length; u++){
			for (var t = 0; t < currentPath.subPathItems[u].pathPoints.length; t++){
				var point = currentPath.subPathItems[u].pathPoints[t];
				// Get the anchor coordinates for the point
				var myAnchor = point.anchor;
				// Round the values out nicely
				var myx = Math.round(myAnchor[0]);
				var myy = Math.round(myAnchor[1]);
				// Add the coordinates to our arrays
				points.push([myx,myy]);
				if( checkArrayForValue(xvals,myx) == false ) { xvals.push(myx); }
				if( checkArrayForValue(yvals,myy) == false ) { yvals.push(myy); }
			}
		}
		// Output the path coordinate data
		fileOutput.writeln('');
		if( points.length == 4 && xvals.length == 2 && yvals.length == 2 ) {
			var rectPoints = [points[0],points[2]];
			fileOutput.writeln('<area shape="rect" coords="' + rectPoints + '" href="***'+ currentPath.name + '***.html" alt="' + currentPath.name +'" title="' + currentPath.name +'"/>');
		} else {
			fileOutput.writeln('<area shape="poly" coords="' + points + '" href="***'+ currentPath.name + '***.html" alt="' + currentPath.name +'" title="' + currentPath.name +'"/>');
		}
	}

	// Finish the image map output
	fileOutput.writeln('');
	fileOutput.writeln('</map>');
}


/*
* -------------------------------------------------------------
*  PathsToImageMap initialisation function
* -------------------------------------------------------------
*/


function initPathsToImageMap() {

	// Establish the correct linefeed type
	if ($.os.search(/windows/i) != -1) {
		fileLineFeed = "windows";
	} else {
		fileLineFeed = "macintosh";
	}

	// Do we have a document open?
	if (app.documents.length === 0) {
		alert("Please open a file", "PathsToImageMap Error", true);
		return;
	}
	
	// If we have more than one document open...
	if (app.documents.length > 1) {
	
		var runMultiple = confirm("PathsToImageMap has detected multiple open files.\nDo you wish to run PathsToImageMap on all open files?", true, "PathsToImageMap");
				
		if (runMultiple === true) {
			docs = app.documents;
		} else {
			docs = [app.activeDocument];
		}
	
	// Or only one document open...
	} else {
		runMultiple = false;
		docs = [app.activeDocument];
	}
	
	// Loop through all documents
	for (var i = 0; i < docs.length; i++)
	{
	
		// Auto set filePath and fileName
		filePath = Folder.myDocuments + '/PathsToImageMap-' + docs[i].name + '.txt';

		// create outfile
		var fileOutput = new File(filePath);

		// set linefeed
		fileOutput.linefeed = fileLineFeed;

		// open for write
		fileOutput.open("w", "TEXT", "????");

		// Set active document
		app.activeDocument = docs[i];
		
		// call to the core with the current document
		doPathExport(app.activeDocument, fileOutput, '/');

		// close the file
		fileOutput.close();
	
	}
	
	// Finish up by displaying a notice (multiple) or opening the output file (single)
	if (runMultiple === true) {
		alert("PathsToImageMap has parsed " + documents.length + " files;\nFiles were saved in your documents folder", "PathsToImageMap");
	} else {
		fileOutput.execute();
	}

}


/*
* -------------------------------------------------------------
*  PathsToImageMap instantiation
* -------------------------------------------------------------
*/

initPathsToImageMap();
