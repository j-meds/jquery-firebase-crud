var firebase = "https://jquery.firebaseio.com/";
var hereos = [];

$("#update").hide();

var create = function(){
	var hero = {
		hero:$("#name").val(),
		appears:$("#appears").val(),
		img:$("#img").val()
	};
	if(hero.hero == "" || hero.appears == ""){
		alert("name and/or appears in is blank. please try again");
	 return;
	}
	$.ajax({
		data: JSON.stringify(hero),
		url: firebase + ".json",
		method: "POST",
		dataType: "json",
		success: function(res){
			console.log(res);
			read();
		},
		error: function(res,status){
			console.log(res,status);
		}
	});
}

var read = function(){
	$("#hereos").html("");
	$.ajax({
	url: firebase + ".json",
	method: "GET",
	dataType: "json",
	success: function(data){
		hereos.length = 0;
		for(var prop in data){
			data[prop]._id = prop;
			hereos.push(data[prop]);
			 console.log(data[prop]);
			var  x = "<div class='col-md-4 col-sm-6 col-xs-12'>" +
	"<div class='thumbnail heroBox nopadding'><div class='thumbImage'>" +
     "<img alt='Image Not Available' class='imgbox' src='" + data[prop].img + "'  /></div>" +
     "<div class='caption'><h3>"+ data[prop].hero + "</h3> <p class='boxText'> '" + data[prop].appears  + 
     "'</p><button class='btn btn-danger glyphicon glyphicon-trash btn-lg btnedit active' onclick='deletes("+JSON.stringify(prop)+")'></button>" + //delete button
     "<a href='#top'><button class='btn btn-warning btnedit glyphicon glyphicon-edit btn-lg active' onclick='update(" +hereos.indexOf(data[prop])+" )'></button></a>" + // edit button
     "</div> </div></div> </div>";


        	$("#hereos").append(x);
      }
	},
	error:function(data){
		console.log(data)
	}
});
}

var update = function(idx) {
  
  $('#update').show();
  
  $('#editName').val(hereos[idx].hero);
  $('#editAppears').val(hereos[idx].appears);
  $('#editImg').val(hereos[idx].img);
  
  $('#subEdit').on('click', function() {
  
  var updatedHero = {
      hero : $('#editName').val(),
      appears : $('#editAppears').val(),
      img : $('#editImg').val()
    };
    $.ajax({
      url: firebase + hereos[idx]._id + "/.json",
      method: "PUT",
      dataType: 'json',
      data: JSON.stringify(updatedHero),
      success: function(data) {
      	console.log("hi");
        $("#update").hide();
        $("#subEdit").off();
        read();
      },
      error: function(data) {
        console.log(data);
      }
    })
  })
}



var deletes = function(id){
	$.ajax({
		url:firebase + id +".json",
		method: "DELETE",
		dataType: "json",
		success:function(){
			read();
		},
		error: function(data){
			console.log(data);
		}
	})
}

read();