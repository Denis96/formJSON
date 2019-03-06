/*	 
	Llegir el Manual.txt per qualsevol dubte.
		Aquest manual conté: 
			- Llistat amb l'explicació de cada funció.
			- Pasos a seguir per afegir nous tipus de preguntes.
*/	
$(document).ready(function(){
	var showForm = null;
	var form = null;
	var formName = null;
	var legend = null;
	var hiddenNames = null;
	var label = null;
	var addQuestion = null;
	var delQuestion = null;
	var addOption = null;
		var addSubOption = null;
		var delSubOption = null;
	var delOption = null;
	var generateJSON = null;
	var test = null;

	updateEvents();

	var questionsCounter = 1;



	function updateEvents() {
		updateEventsSearchElements();

		updateEventsDeleteEvents();

		updateEventsCreateEvents();
	}
			function updateEventsSearchElements() {
				showForm = $("#generateForm");
				form = $("#form");
				formName = $("#formName > span");
				legend = $("legend > span");
				label = $("label");
				hiddenNames = $(".hiddenName");
				addQuestion = $("#addQuestion");
				delQuestion = $(".delQuestion");
				addOption = $(".addOption");
					addSubOption = $(".addSubOption");
					delSubOption = $(".delSubOption");
				delOption = $(".delOption");
				generateJSON = $("#generateJSON");
				optionQuestionButton = $("#optionQuestionButton");
			}

			function updateEventsDeleteEvents() {
				$("*").unbind();
			}

			function updateEventsCreateEvents() {
				showForm.click(showFormFunction);
				formName.dblclick(changeNameShowInputFunction);
				legend.dblclick(changeNameShowInputFunction);
				label.dblclick(changeNameShowInputFunction);
				hiddenNames.keypress(changeFocusFunction);
				hiddenNames.focusout(changeNameShowTextFunction);
				optionQuestionButton.click(function() {
							generateQuestionFunction($("#optionQuestion").val());
					});
				delQuestion.click(removeParentFunction);
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



//////////////////////////////////  GENERATE QUESTION  //////////////////////////////////
	function generateQuestionFunction(type, loadedContentLegend, loadedContentOptions) {
		//	Create "fieldset" element with id
			var fieldset = document.createElement("fieldset");
			fieldset.setAttribute("id", ("question"+questionsCounter) );

			var legend = document.createElement("legend");
			var legendSpan = document.createElement("span");
			legendSpan.setAttribute("class", "showName legendSpan" );


			var legendContent = document.createTextNode(	/////////////////////
				loadedContentLegend==null ? "Question "+questionsCounter : loadedContentLegend
				);

			 

			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );

			// Create "div" options
				var div = document.createElement("div");
				div.setAttribute("class", "options" );

				if (loadedContentOptions==null) {
					//	Create 2 options
					for (var i = 1 ; i <= 2 ; i++) {
						switch (type) {
							case "radio": 
								$(div).append( patternOptionRadioFunction(i, questionsCounter) );
								var questionType = "radio";
								break;
							case "checkbox":
								$(div).append( patternOptionCheckboxFunction(i, questionsCounter) );
								var questionType = "checkbox";
								break;
							default:
								alert("Error: Type option undefined - " + type);
						}
					}
				} else {
					for (var i = 0 ; i < loadedContentOptions.length ; i++) {
						switch (type) {
							case "OPTIONS":
								var levels = loadedContentOptions[i].split("::");
								if (levels.length==1) {
									$(div).append( patternOptionRadioFunction(i+1, questionsCounter, loadedContentOptions[i]) );
								} else {
									var optionLoaded = patternOptionRadioFunction(i+1, questionsCounter, levels[0]);

									var subLevel = levels[1].split(",");

									var divSubOptions = document.createElement("div");
										divSubOptions.setAttribute("class", "subOption" );

									$(divSubOptions).append( generateHiddenInput("optionId", 1) );
									$(divSubOptions).append( generateHiddenInput("optionsNumber", 1) );

									for (var j = 0; j < subLevel.length; j++) {
										$(divSubOptions).append( patternSubOptionRadioFunction(questionsCounter, j+1, j, subLevel[j]) );
									}

										$(optionLoaded).append(divSubOptions);
									$(div).append(optionLoaded);
								}
								var questionType = "radio";
								break;
							case "MULTIPLE_OPTIONS":
								$(div).append( patternOptionCheckboxFunction(i+1, questionsCounter, loadedContentOptions[i]) );
								var questionType = "checkbox";
								break;
							default:
								alert("Error: Type option undefined - " + type);
						}
					}
				}
		
			$(legendSpan).append(legendContent);
			$(legend).append(legendSpan);
			$(legend).append(hiddenName);
		$(fieldset).append(legend);
		$(fieldset).append( generateHiddenInput("questionId", questionsCounter) );
		$(fieldset).append( generateHiddenInput("optionsNumber", 2) );
		$(fieldset).append( generateHiddenInput("optionsType", questionType) );
		$(fieldset).append(div);

		//	Create a Add, Delete
			var buttonAdd = document.createElement("button");
			buttonAdd.setAttribute("class", "addOption" );
			var buttonAddContent = document.createTextNode("add");
			$(buttonAdd).append(buttonAddContent);

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delQuestion buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("delete question");
			$(buttonDelete).append(buttonDeleteContent);
		
		var br = document.createElement("br");

		$(fieldset).append(br);
		$(fieldset).append(buttonAdd);
		$(fieldset).append(buttonDelete);

		$(form).append(fieldset);

		questionsCounter++;

		updateEvents();

	}


//////////////////////////////////  PATTERNS OPTIONS TYPES  //////////////////////////////////
	function patternOptionRadioFunction(number, currentQuestion, loadedContentOptionName, loadedContentsubLevel) {
		var div = document.createElement("div");

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

		//	Input (radio)
			var input = document.createElement("input");
			input.setAttribute("type", "radio" );
			input.setAttribute("disabled", "disabled" );
			input.setAttribute("id", ("opt"+currentQuestion+"-"+number) );
			input.setAttribute("name", ("question"+currentQuestion) );

		//	Label to input
			var label = document.createElement("label");
			label.setAttribute("class", "showName" );
			label.setAttribute("for", ("opt"+currentQuestion+"-"+number) );
			var labelContent = document.createTextNode(
				loadedContentOptionName==null ? "New option" : loadedContentOptionName
				);
			$(label).append(labelContent);

		// Hidden to change name
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


	function patternOptionCheckboxFunction(number, currentQuestion, loadedContentOptionName) {
		var div = document.createElement("div");

		//	Delete button
			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delOption buttonOption buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);

		//	Input (checkbox)
			var input = document.createElement("input");
			input.setAttribute("type", "checkbox" );
			input.setAttribute("disabled", "disabled" );
			input.setAttribute("id", ("opt"+currentQuestion+"-"+number) );
			input.setAttribute("name", ("question"+currentQuestion) );

		//	Label to input
			var label = document.createElement("label");
			label.setAttribute("class", "showName" );
			label.setAttribute("for", ("opt"+currentQuestion+"-"+number) );
			var labelContent = document.createTextNode(
				loadedContentOptionName==null ? "New option" : loadedContentOptionName
				);
			$(label).append(labelContent);

		// Hidden to change name
			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );

		$(div).append(buttonDelete);
		$(div).append(input);
		$(div).append(label);
		$(div).append(hiddenName);

		return div;
	}


	function patternSubOptionRadioFunction(currentQuestion, optionNumber, subOptionId, loadedContentSubOptionName) {
		var div = document.createElement("div");

		//	Delete button
			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delOption buttonOption buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);

		//	Input (radio)
			var input = document.createElement("input");
			input.setAttribute("type", "radio" );
			input.setAttribute("disabled", "disabled" );
			input.setAttribute("id", ("opt"+currentQuestion+"-"+optionNumber+"-"+subOptionId) );
			input.setAttribute("name", ("question"+currentQuestion) );

		//	Label to input
			var label = document.createElement("label");
			label.setAttribute("class", "showName" );
			label.setAttribute("for", ("opt"+currentQuestion+"-"+optionNumber+"-"+subOptionId) );
			var labelContent = document.createTextNode(
				loadedContentSubOptionName==null ? "New sub option" : loadedContentSubOptionName
				);
			$(label).append(labelContent);

		// Hidden to change name
			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );

		$(div).append(buttonDelete);
		$(div).append(input);
		$(div).append(label);
		$(div).append(hiddenName);

		return div;
	}



//////////////////////////////////  OPTION PREFERENCES  //////////////////////////////////
	function addOptionFunction() {
		//	Info for greate a option
			var currentQuestion = $(this).parent().children(".questionId").val();
			var currentTypeQuestion = $(this).parent().children(".optionsType").val();
			var optionType = $(this).parent().children(".optionsType").val();

			var optionsNumber = parseInt( $(this).parent().children(".optionsNumber").val() )+1;
			$(this).parent().children(".optionsNumber").attr("value", optionsNumber);

			switch (currentTypeQuestion) {
				case "radio": 
					$(this).parent().children("div").append( patternOptionRadioFunction(optionsNumber, currentQuestion) );
					var questionType = "radio";
					break;
				case "checkbox":
					$(this).parent().children("div").append( patternOptionCheckboxFunction(optionsNumber, currentQuestion) );
					var questionType = "checkbox";
					break;
				default:
					alert("Error: Type option undefined - " + type);
			}
		updateEvents();
	}

	function addSubOptionFunction() {
		if( !$(this).parent().has(".subOption").length ) {
			var div = document.createElement("div");
			div.setAttribute("class", "subOption" );
			$(this).parent().append( div );

			$(this).parent().children(".subOption").append( generateHiddenInput("optionId", 1) );
			$(this).parent().children(".subOption").append( generateHiddenInput("optionsNumber", 1) );
		}

		var currentQuestion = $(this).parent().parent().parent().children(".questionId").val();
		var optionNumber = $(this).parent().children(".subOption").children(".optionId").val();
		var subOptionId = $(this).parent().children(".subOption").children(".optionsNumber").val();

		$(this).parent().children(".subOption").append( patternSubOptionRadioFunction(currentQuestion, optionNumber, subOptionId) );
		updateEvents();
	}

	function removeSubOptionFunction() {
		$(this).parent().parent().children("div").length <= 1 ?
				$(this).parent().parent().remove() :
				removeParentFunction();
	}

	function removeParentFunction() {
		$(this).parent().remove();
	}

	function generateHiddenInput(name, value) {
		var hiddenInput = document.createElement("input");
		hiddenInput.setAttribute("type", "hidden" );
		hiddenInput.setAttribute("class", name );
		hiddenInput.setAttribute("name", name );
		hiddenInput.setAttribute("value", value );

		return hiddenInput;
	}



//////////////////////////////////  OPTION PREFERENCES  //////////////////////////////////
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


	////////////	JSON Funtion 
		function generateJSONFunction() {
			var content = "{";
				content += "\"name\": \""+ $("#formName").children(".showName").text() +"\",";
				content += "\"rows\": [ {";
					content += "\"idTablet\": \"TABLET8\",";
					content += "\"version\": \"1.1\",";
					content += "\"questions\": [ {";
						content += "\"question\": \" \",";
						content += "\"type\": \"HOME\",";
						content += "\"options\": [\"surveys_done\"]}";

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
						content += "\"question\": \"Tot Correcte?\",";
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


	//////	Functions for upload 
		$('#uploadJson').on('click', function() {
			if (!window.FileReader) {
				alert('Your browser is not supported');
				return false;
			}
			var input = $("#formJsonFile").get(0);
			var reader = new FileReader();
			if (input.files.length) {
				var textFile = input.files[0];
				reader.readAsText(textFile);
				$(reader).on('load', processFile);
			} else {
				alert('Please upload a file before continuing')
			} 
		});

		function processFile(e) {
			var file = e.target.result,
				results;
			var jsonLoaded = JSON.parse(file);

			$("#formName > .showName").text(jsonLoaded.name);
			$(".container > .generateFormDiv").remove();
			$("#formContainer").removeAttr("hidden");

			for (var i = 1; i < jsonLoaded.rows[0].questions.length-1; i++) {
				generateQuestionFunction(
						jsonLoaded.rows[0].questions[i].type,
						jsonLoaded.rows[0].questions[i].question,
						jsonLoaded.rows[0].questions[i].options
					);
			}
		}
});