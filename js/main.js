
$(document).ready(function(){
	var form = null;
	var legend = null;
	var label = null;
	var addQuestion = null;
	var delQuestion = null;
	var swapQuestion = null;
	var addOption = null;
	var delOption = null;

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

		addQuestion.unbind();
		delQuestion.unbind();
		swapQuestion.unbind();
		addOption.unbind();
		delOption.unbind();
		legend.unbind();
		label.unbind();

		addQuestion.click(generateQuestionFunction);
		delQuestion.click(removeParentFunction);
		swapQuestion.click(swapOptionsTypeFunction);
		addOption.click(addOptionFunction);
		delOption.click(removeParentFunction);
		legend.dblclick(changeNameFunction);
		label.dblclick(changeNameFunction);
	}

	function generateQuestionFunction() {
		// create "fieldset" element with id
		var fieldset = document.createElement("fieldset");
		fieldset.setAttribute("id", ("question"+questionsCounter) );

		var legend = document.createElement("legend");
		var legendContent = document.createTextNode("Sample");
		
		$(legend).append(legendContent);
		$(fieldset).append(legend);

		// Create a "div" with 2 options
			var div = document.createElement("div");
			for (var i = 1 ; i <= 2 ; i++) {
				$(div).append( patternOptionFunction(i) );
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

	function patternOptionFunction(i) {
		var div = document.createElement("div");

		var buttonDelete = document.createElement("button");
		buttonDelete.setAttribute("class", "delOption" );
		var buttonDeleteContent = document.createTextNode("X");
		$(buttonDelete).append(buttonDeleteContent);

		var input = document.createElement("input");
		input.setAttribute("type", "radio" );
		input.setAttribute("name", "sample" );
		input.setAttribute("id", ("opt"+questionsCounter+"-"+i) );
		input.setAttribute("name", ("question"+questionsCounter) );

		var label = document.createElement("label");
		label.setAttribute("for", ("opt"+questionsCounter+"-"+i) );
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
		$(this).parent().children("div").append( patternOptionFunction(3) );
	}

	function removeParentFunction() {
		$(this).parent().remove();
	}

	function swapOptionsTypeFunction() {
		var options = $(this).parent().children("div");
		if ( options.first().children("div").first().children("input").first().attr("type") == "radio" ) {
			options.children("div").children("input").attr( "type","checkbox" );
		} else {
			options.children("div").children("input").attr( "type","radio" );
		}
	}

	function changeNameFunction() {
		var content = prompt("", $(this).html());
		if (content != null) {
			$(this).html(content);
		}
	}
});
