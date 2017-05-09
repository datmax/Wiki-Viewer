jQuery(document).ready(function($) {

	var fadeTime = 100;

	function changeLayout(){
		$(".title").removeClass("col-md-offset-3 col-md-5").addClass("col-md-4")
		$("h1").css("padding-top", "0px");
		$("h1").css("text-align" ,"right")
		$(".input").removeClass("col-md-offset-3 col-md-5").addClass("col-md-4").css("padding", "5px");
		$(".random").removeClass("col-md-offset-3").css("padding-top", "10px")
	}


	function createDiv(title, fade, description){
		$("<div class='results well col-md-10 col-md-offset-1' />")
		.html("<h3><a href=https://en.wikipedia.org/wiki/"+title+">"+title+"</a></h3></br>" 
		+"<h4>"+ description + "</h4>").appendTo("#content");
		$(".well").fadeIn(fade);

	}




	function makeCall(text){
		      	  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+ text +"&utf8=&format=json",
    dataType: "jsonp",
    success:function(data) {
       for(i = 0; i < data.query.search.length; i++){
         $("#content").addClass("result")
         var snippet = data.query.search[i].snippet + "...";
           var title = data.query.search[i].title;
           createDiv(title, fadeTime, snippet);
           fadeTime += 100;
   }	
      }

	});
}

	function clearResults(){
		$(".result").empty();
	}


	function search(){
		fadeTime = 100;
		clearResults();
      	var input = $("#input").val();
      	console.log(input);
 		changeLayout();
      	makeCall(input);
      	$("#footer").hide();
	}

      $("#button").click(search)
  });