
$(document).ready(function(){
	var form = null;
	var addQuestion = null;
	var delOption = null;

	updateEvents();

	var questionsCounter = 0;



	function updateEvents() {
		form = $("#form");
		legend = $("legend");
		label = $("label");
		addQuestion = $("#addQuestion");
		delOption = $(".delOption");

		addQuestion.click(generateQuestion);
		delOption.click(removeOption);
		legend.dblclick(changeName);
		label.dblclick(changeName);
	}

	function generateQuestion() {
		// create "fieldset" element with id
		var fieldset = document.createElement("fieldset");
		fieldset.setAttribute("id", ("question"+questionsCounter) );

		var legend = document.createElement("legend");
		var legendContent = document.createTextNode("Sample");
		
		$(legend).append(legendContent);
		$(fieldset).append(legend);


		for (var i = 1 ; i <= 2 ; i++) {
			var div = document.createElement("div");

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("id", ("delete"+questionsCounter+"-"+i) );
			buttonDelete.setAttribute("class", "delOption" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);

			var input = document.createElement("input");
			input.setAttribute("type", "radio" );
			input.setAttribute("name", "sample" );
			input.setAttribute("id", ("opt"+i) );
			input.setAttribute("name", ("opt"+i) );

			var label = document.createElement("label");
			input.setAttribute("for", ("opt"+i) );
			var labelContent = document.createTextNode(("Option "+i));
			$(label).append(labelContent);

			var br = document.createElement("br");

				$(div).append(buttonDelete);
				$(div).append(input);
				$(div).append(label);
				$(div).append(br);
				$(div).append(br);
			$(fieldset).append(div);
		}

		$(form).append(fieldset);

		updateEvents();

	}

	function removeOption() {
		$(this).parent().remove();
	}

	function changeName() {

		var content = prompt("", $(this).html());
		if (content != null) {
			$(this).html(content);
		}
		console.log($(this).html());
	}
});
