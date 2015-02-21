function CheckCanvas(can){
    if (can){
        document.getElementById("mainData").value = dd;
    }
}

function PDF() {  
    var doc = new jsPDF("p","mm","letter");
    
    var specialElementHandlers = {
      "#mainData": function(element, renderer){
       return true;
    }
    };
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    
    var data = $('#mainData').get(0);
    data = data.value;
    doc.fromHTML(
        data,
        15,
        15,
        {
            'width': 170,
            'elementHandlers': {}
    });
    doc.save(fileNameToSaveAs+".pdf");
    var can = document.getElementById("mainData").value;
    CheckCanvas(can);
}  

function saveTextAsFile()
{
	var textToWrite = document.getElementById("mainData").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    dd = textToWrite;
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
        alert(textFromFileLoaded);
		document.getElementById("mainData").value = textFromFileLoaded;
        return false
	};
	fileReader.readAsText(fileToLoad);
}
