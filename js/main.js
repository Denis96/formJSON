
$(document).ready(function(){
	var form = null;
	var legend = null;
	var label = null;
	var addQuestion = null;
	var delQuestion = null;
	var swapQuestion = null;
	var addOption = null;
	var delOption = null;
	var generateJSON = null;

	updateEvents();

	var questionsCounter = 0;



	function updateEvents() {
		form = $("#form");
		legend = $("legend");
		label = $("label");
		addQuestion = $("#addQuestion");
		delQuestion = $(".delQuestion");
		swapQuestion = $(".swapQuestion");
		addOption = $(".addOption");
		delOption = $(".delOption");
		generateJSON = $("#generateJSON");

		addQuestion.unbind();
		delQuestion.unbind();
		swapQuestion.unbind();
		addOption.unbind();
		delOption.unbind();
		legend.unbind();
		label.unbind();
		generateJSON.unbind();

		addQuestion.click(generateQuestionFunction);
		delQuestion.click(removeParentFunction);
		swapQuestion.click(swapOptionsTypeFunction);
		addOption.click(addOptionFunction);
		delOption.click(removeParentFunction);
		legend.dblclick(changeNameFunction);
		label.dblclick(changeNameFunction);
		generateJSON.click(testDownload);
	}

	function generateQuestionFunction() {
		// create "fieldset" element with id
		var fieldset = document.createElement("fieldset");
		fieldset.setAttribute("id", ("question"+questionsCounter) );

		var legend = document.createElement("legend");
		var legendContent = document.createTextNode("Sample");

		var hiddenQuestion = document.createElement("input");
		hiddenQuestion.setAttribute("type", "hidden" );
		hiddenQuestion.setAttribute("id", "questionId" );
		hiddenQuestion.setAttribute("name", "questionId" );
		hiddenQuestion.setAttribute("value", questionsCounter );

		var hiddenOptionsNumber = document.createElement("input");
		hiddenOptionsNumber.setAttribute("type", "hidden" );
		hiddenOptionsNumber.setAttribute("id", "optionsNumber" );
		hiddenOptionsNumber.setAttribute("name", "optionsNumber" );
		hiddenOptionsNumber.setAttribute("value", 2 );

		var hiddenOptionsType = document.createElement("input");
		hiddenOptionsType.setAttribute("type", "hidden" );
		hiddenOptionsType.setAttribute("id", "optionsType" );
		hiddenOptionsType.setAttribute("name", "optionsType" );
		hiddenOptionsType.setAttribute("value", "radio" );
		
		$(legend).append(legendContent);
		$(fieldset).append(legend);
		$(fieldset).append(hiddenQuestion);
		$(fieldset).append(hiddenOptionsNumber);
		$(fieldset).append(hiddenOptionsType);

		// Create a "div" with 2 options
			var div = document.createElement("div");
			for (var i = 1 ; i <= 2 ; i++) {
				$(div).append( patternOptionFunction(i, questionsCounter) );
			}
			$(fieldset).append(div);


		var buttonAdd = document.createElement("button");
		buttonAdd.setAttribute("class", "addOption" );
		var buttonAddContent = document.createTextNode("add");
		$(buttonAdd).append(buttonAddContent);

		var buttonDelete = document.createElement("button");
		buttonDelete.setAttribute("class", "delQuestion" );
		var buttonDeleteContent = document.createTextNode("del");
		$(buttonDelete).append(buttonDeleteContent);

		var buttonSwap = document.createElement("button");
		buttonSwap.setAttribute("class", "swapQuestion" );
		var buttonSwapContent = document.createTextNode("swap");
		$(buttonSwap).append(buttonSwapContent);
		
		var br = document.createElement("br");

		$(fieldset).append(br);
		$(fieldset).append(buttonAdd);
		$(fieldset).append(buttonDelete);
		$(fieldset).append(buttonSwap);

		$(form).append(fieldset);

		questionsCounter++;

		updateEvents();

	}

	function patternOptionFunction(i, currentQuestion) {
		var div = document.createElement("div");

		var buttonDelete = document.createElement("button");
		buttonDelete.setAttribute("class", "delOption" );
		var buttonDeleteContent = document.createTextNode("X");
		$(buttonDelete).append(buttonDeleteContent);

		var input = document.createElement("input");
		input.setAttribute("type", "radio" );
		input.setAttribute("id", ("opt"+currentQuestion+"-"+i) );
		input.setAttribute("name", ("question"+currentQuestion) );

		var label = document.createElement("label");
		label.setAttribute("for", ("opt"+currentQuestion+"-"+i) );
		var labelContent = document.createTextNode(("Option "+i));
		$(label).append(labelContent);

		var br = document.createElement("br");

			$(div).append(buttonDelete);
			$(div).append(input);
			$(div).append(label);
			$(div).append(br);

		return div;
	}

	function addOptionFunction() {
		var currentQuestion = $(this).parent().children("#questionId").attr("value");


		var optionsNumber = parseInt( $(this).parent().children("#optionsNumber").attr("value") )+1;
		$(this).parent().children("#optionsNumber").attr("value", optionsNumber);

		$(this).parent().children("div").append( patternOptionFunction(optionsNumber, currentQuestion) );
		updateEvents();
	}

	function removeParentFunction() {
		$(this).parent().remove();
	}

	function swapOptionsTypeFunction() {
		var options = $(this).parent();
		if ( options.children("#optionsType").attr("value") == "radio" ) {
			options.children("div").children("div").children("input").attr( "type","checkbox" );
		} else { /////////////////////////////// mirar
			console.log(options.children("div").children("div").children("input").attr( "type"));
			options.children("div").children("div").children("input").attr( "type","radio" );
		}
	}

	function changeNameFunction() {
		var content = prompt("", $(this).html());
		if (content != null) {
			$(this).html(content);
		}
	}
	function testDownload() {
		download("myfilename"+".json", "nepe");
	}
	function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
});
