
$(document).ready(function(){
	var showForm = null;
	var form = null;
	var formName = null;
	var legend = null;
	var hiddenNames = null;
	var label = null;
	var addQuestion = null;
	var addQuestionCB = null;
	var delQuestion = null;
	var swapQuestion = null;
	var addOption = null;
		var addSubOption = null;
		var delSubOption = null;
	var delOption = null;
	var generateJSON = null;

	updateEvents();

	var questionsCounter = 1;



	function updateEvents() {
		// Search all elements
			showForm = $("#generateForm");
			form = $("#form");
			formName = $("#formName > span");
			legend = $("legend > span");
			label = $("label");
			hiddenNames = $(".hiddenName");
			addQuestion = $("#addQuestion");
			addQuestionCB = $("#addQuestionCB");
			delQuestion = $(".delQuestion");
			swapQuestion = $(".swapQuestion");
			addOption = $(".addOption");
				addSubOption = $(".addSubOption");
				delSubOption = $(".delSubOption");
			delOption = $(".delOption");
			generateJSON = $("#generateJSON");

		//	Delete all assigned events 
			formName.unbind();
			legend.unbind();
			label.unbind();
			hiddenNames.unbind();
			addQuestion.unbind();
			addQuestionCB.unbind();
			delQuestion.unbind();
			swapQuestion.unbind();
			addOption.unbind();
				addSubOption.unbind();
				delSubOption.unbind();
			delOption.unbind();
			generateJSON.unbind();

		//	Returns assign events
			showForm.click(showFormFunction);
			formName.dblclick(changeNameShowInputFunction);
			legend.dblclick(changeNameShowInputFunction);
			label.dblclick(changeNameShowInputFunction);
			hiddenNames.keypress(changeFocusFunction);
			hiddenNames.focusout(changeNameShowTextFunction);
			addQuestion.click(generateQuestionFunction);
			addQuestionCB.click(generateQuestionFunction);
			delQuestion.click(removeParentFunction);
			swapQuestion.click(swapOptionsTypeFunction);
			addOption.click(addOptionFunction);
				addSubOption.click(addSubOptionFunction);
				delSubOption.click(removeSubOptionFunction);
			delOption.click(removeParentFunction);
			generateJSON.click(prepareDownload);
	}

	function showFormFunction() {
		var formName = $(this).parent().children("#formNameText").val();
		if (formName != "") {
			$("#formName > .showName").text(formName);
			$(this).parent().remove();
			$("#formContainer").removeAttr("hidden");
		}
	}

	function generateQuestionFunction() {
		//	Create "fieldset" element with id
			var fieldset = document.createElement("fieldset");
			fieldset.setAttribute("id", ("question"+questionsCounter) );

			var legend = document.createElement("legend");
			var legendSpan = document.createElement("span");
			legendSpan.setAttribute("class", "showName legendSpan" );

			var legendContent = document.createTextNode("Question "+questionsCounter);

			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );


		//	Create 3 hidden inputs for control the question
			var hiddenQuestion = document.createElement("input");
			hiddenQuestion.setAttribute("type", "hidden" );
			hiddenQuestion.setAttribute("class", "questionId" );
			hiddenQuestion.setAttribute("name", "questionId" );
			hiddenQuestion.setAttribute("value", questionsCounter );

			var hiddenOptionsNumber = document.createElement("input");
			hiddenOptionsNumber.setAttribute("type", "hidden" );
			hiddenOptionsNumber.setAttribute("class", "optionsNumber" );
			hiddenOptionsNumber.setAttribute("name", "optionsNumber" );
			hiddenOptionsNumber.setAttribute("value", 2 );

			var hiddenOptionsType = document.createElement("input");
			hiddenOptionsType.setAttribute("type", "hidden" );
			hiddenOptionsType.setAttribute("class", "optionsType" );
			hiddenOptionsType.setAttribute("name", "optionsType" );
			hiddenOptionsType.setAttribute("value", "radio" );
		
			$(legendSpan).append(legendContent);
			$(legend).append(legendSpan);
			$(legend).append(hiddenName);
		$(fieldset).append(legend);
		$(fieldset).append(hiddenQuestion);
		$(fieldset).append(hiddenOptionsNumber);
		$(fieldset).append(hiddenOptionsType);

		//	Create a "div" with 2 options
			var div = document.createElement("div");
			div.setAttribute("class", "options" );
			for (var i = 1 ; i <= 2 ; i++) {
				switch ($(this).attr("id")) {
					case "addQuestion": {
						$(div).append( patternOptionRadioFunction(i, questionsCounter, "radio") );
					} break;
					case "addQuestionCB": {
						$(div).append( patternOptionRadioFunction(i, questionsCounter, "checkbox") );
					}
				}
			}
			$(fieldset).append(div);

		//	Create a Add, Delete
			var buttonAdd = document.createElement("button");
			buttonAdd.setAttribute("class", "addOption" );
			var buttonAddContent = document.createTextNode("add");
			$(buttonAdd).append(buttonAddContent);

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("delete question");
			$(buttonDelete).append(buttonDeleteContent);

			/*var buttonSwap = document.createElement("button");
			buttonSwap.setAttribute("class", "swapQuestion" );
			var buttonSwapContent = document.createTextNode("swap");
			$(buttonSwap).append(buttonSwapContent);*/
		
		var br = document.createElement("br");

		$(fieldset).append(br);
		$(fieldset).append(buttonAdd);
		$(fieldset).append(buttonDelete);
		//$(fieldset).append(buttonSwap);

		$(form).append(fieldset);

		questionsCounter++;

		updateEvents();

	}

	// Returns a div with 2 options
	function patternOptionRadioFunction(number, currentQuestion, optionType, level) {
		var div = document.createElement("div");

		//	Delete button
			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delOption buttonOption buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);

			if ( level!=2 ) { ////////////////////////// cambiar cuando se cambie la generacion de preguntas
				//	Delete button
					var buttonDelete = document.createElement("button");
					buttonDelete.setAttribute("class", "delOption buttonOption buttonColorDel" );
					var buttonDeleteContent = document.createTextNode("X");
					$(buttonDelete).append(buttonDeleteContent);

				//	Add button
					var buttonAdd = document.createElement("button");
					buttonAdd.setAttribute("class", "addSubOption buttonOption buttonColorAdd" );
					var buttonAddContent = document.createTextNode("+");
					$(buttonAdd).append(buttonAddContent);
			} else {
				//	Delete button
					var buttonDelete = document.createElement("button");
					buttonDelete.setAttribute("class", "delSubOption buttonOption buttonColorDel" );
					var buttonDeleteContent = document.createTextNode("X");
					$(buttonDelete).append(buttonDeleteContent);
			}

		//	Input (radio or checkbox (+15))
			var input = document.createElement("input");
			input.setAttribute("type", optionType );
			input.setAttribute("disabled", "disabled" );
			input.setAttribute("id", ("opt"+currentQuestion+"-"+number) );
			input.setAttribute("name", ("question"+currentQuestion) );

		//	Label for input
			var label = document.createElement("label");
			label.setAttribute("class", "showName" );
			label.setAttribute("for", ("opt"+currentQuestion+"-"+number) );
			var labelContent = document.createTextNode(("New option"));
			$(label).append(labelContent);

			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );

		$(div).append(buttonDelete);
		$(div).append(buttonAdd);
		$(div).append(input);
		$(div).append(label);
		$(div).append(hiddenName);

		return div;
	}

	function addOptionFunction() {
		//	Info for greate a option
			var currentQuestion = $(this).parent().children(".questionId").attr("value");
			var optionType = $(this).parent().children(".optionsType").attr("value");

			var optionsNumber = parseInt( $(this).parent().children(".optionsNumber").attr("value") )+1;
			$(this).parent().children(".optionsNumber").attr("value", optionsNumber);


		$(this).parent().children("div").append( patternOptionRadioFunction(optionsNumber, currentQuestion, optionType) );
		updateEvents();
	}

	function addSubOptionFunction() {
		if( !$(this).parent().has(".subOption").length ) {
			var div = document.createElement("div");
			div.setAttribute("class", "subOption" );
			$(this).parent().append( div );

			var hiddenOptionId = document.createElement("input");
			hiddenOptionId.setAttribute("type", "hidden" );
			hiddenOptionId.setAttribute("class", "optionId" );
			hiddenOptionId.setAttribute("name", "optionId" );
			hiddenOptionId.setAttribute("value", 1 );

			var hiddenOptionsNumber = document.createElement("input");
			hiddenOptionsNumber.setAttribute("type", "hidden" );
			hiddenOptionsNumber.setAttribute("class", "optionsNumber" );
			hiddenOptionsNumber.setAttribute("name", "optionsNumber" );
			hiddenOptionsNumber.setAttribute("value", 1 );

			$(this).parent().children(".subOption").append( hiddenOptionId );
			$(this).parent().children(".subOption").append( hiddenOptionsNumber );
		}

		var optionsNumber = $(this).parent().children(".subOption").children(".optionId").val();
		var optionId = $(this).parent().children(".subOption").children(".optionsNumber").val();

		$(this).parent().children(".subOption").append( patternOptionRadioFunction(optionsNumber, optionId, "radio", 2) );
		updateEvents();
	}

	function removeSubOptionFunction() {
		console.log($(this).parent().children("div"));
		$(this).parent().parent().children("div").length <= 1 ?
				$(this).parent().parent().remove() :
				$(this).parent().remove();

	}

	function removeParentFunction() {
		$(this).parent().remove();
	}

	function swapOptionsTypeFunction() {
		var options = $(this).parent();
		if ( options.children(".optionsType").attr("value") == "radio" ) {
			options.children("div").children("div").children("input").attr( "type","checkbox" );
			options.children(".optionsType").attr("value", "checkbox");
		} else {
			options.children("div").children("div").children("input").attr( "type","radio" );
			options.children(".optionsType").attr("value","radio");
		}
	}

	function changeNameShowInputFunction() {
		var hiddenName = $(this).parent().children(".hiddenName");
		hiddenName.val( $(this).text() );
		hiddenName.removeAttr("hidden");
		hiddenName.focus();
		$(this).attr("hidden","true");
	}

	function changeNameShowTextFunction() {
		var hiddenName = $(this).parent().children(".showName");
		$(this).val() != "" ? hiddenName.text( $(this).val() ) : "";
		hiddenName.removeAttr("hidden");
		$(this).attr("hidden","true");
	}

	function changeFocusFunction(e) {
		if (e.key == "Enter") {
			e.preventDefault();
			$(this).blur();
		}
	}


	//////	JSON Funtion 
		function generateJSONFunction() {
			var content = "{";
				content += "\"name\": \""+ $(form).children("#formName").children(".showName").text() +"\",";
				content += "\"rows\": [ {";
					content += "\"idTablet\": \"TABLET8\",";
					content += "\"version\": \"1.1\",";
					content += "\"questions\": [ {";
						content += "\"question\": \" \",";
						content += "\"type\": \"HOME\"}";

						//	opcions from the form
						$(form).children("fieldset").each(function( index ) {
							content += ", {";
							content += "\"question\": \""+ $(this).children("legend").children(".showName").text() +"\",";
							content += "\"type\": \""
								switch ( $(this).children(".optionsType").val() ) {
									case "radio":		content += "OPTIONS";			break;
									case "checkbox":	content += "MULTIPLE_OPTIONS";	break;
									default:	console.log("ERROR: unexpected form type");
												console.log($(this).children(".optionsType")); ;
								}
								content += "\",";
							content += "\"options\": [";
							$(this).children(".options").children("div").each(function( index ) {
								content += "\""+ $(this).children("label").text();

								if( $( this ).has( ".subOption" ).length ) {
									content += "::";
									$(this).children(".subOption").children("div").each(function( indexSubOption ) {
										content += $(this).children("label").text();
										if (indexSubOption+1 != $(this).parent().children("div").length) {
											content += ",";
										}
									});
								}

								content += "\"";
								if (index+1 != $(this).parent().children("div").length) {
									content += ", ";
								}
							});
							content += "] }";
						});

						//	final log
						content += ", {";
						content += "\"questions\": \"Tot Correcte?\",";
						content += "\"type\": \"FINAL_LOG\"";
						content += "} ]";
					content += "} ]";
				content += "}";
			return content;
		}


	//////	Functions for download 
		function prepareDownload() {
			var jsonName = $("#jsonName").val();
			var contentJson = generateJSONFunction();
			console.log(contentJson);
			jsonName!="" ? download(jsonName+".json", contentJson) : download("your_json.json", contentJson);
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

	///////////////////////////////// Checkbox code //////////////////////////////////////////////


});