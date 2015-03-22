var showEmpty = "<h1 class='text-muted animated bounceInUp'> You have some to-do's right?</h1>";

function get(id){
	return document.getElementById(id);
}


window.addEventListener("load", function() {
 	
	get('add').addEventListener("click", TODO.addTodo, false);
	get('todo').addEventListener("keyup", TODO.save, false);


	if(!localStorage.todo ){
		get("showTheTodo").innerHTML = showEmpty;
	}else{

			TODO.update();			
	}
});


var TODO = {

	addTodo: function(e){
		if(get('todo').value.trim() !== ""  ){
				TODO.saveToLocalStorage(get('todo').value);
				get('todo').value = "";
		}else{
				get('error').innerHTML = 'Enter something to remember!';
				get('error').display = 'block';
		}		
	},

	save: function(e){
		if(e.keyCode === 13){
				TODO.addTodo();
		}
	},

	saveToLocalStorage: function(data){
		if(localStorage){

			if(localStorage.todo && localStorage.todo.length > 0){
				var inLs = JSON.parse(localStorage.todo);
				console.log(localStorage.TODO);
			}else{
				var inLs = new Array();
			}

			var d = {
				todo : data,
				time : TODO._getTime().time,
				utc  : TODO._getTime().utc,
				color: getRandomColor() 
			};

			inLs.push(d);

			localStorage.setItem('todo', JSON.stringify(inLs));
			
			TODO.update();

		}else{
			console.log("LocalStorage Not Supported");
		}
	},


	update : function(){
		
		get("showTheTodo").innerHTML = "";

		if(localStorage.todo == '[]' ){

			get("showTheTodo").innerHTML = showEmpty;
		}

		TODO.show(function(data, i){
			//var div = "<div class='todos'> </div> ";

			var todo = document.createElement("div");
				todo.className = 'todo animated flipInY';
				todo.innerHTML = "<div> <blockquote class='tododata'>" + data.todo + "</blockquote><div utc='"+ data.utc +"' class='close' onClick='TODO.remove("+data.utc+")'>x</div><div><small><b>#"+ parseInt((i+1), 10)+"</b> @ "+data.time+"</small></div> </div>";
				todo.style.background = data.color;

			get("showTheTodo").appendChild(todo, get("showTheTodo").firstChild);
			get("showTheTodo").style.display = "block";

		});
	},

	show : function(callback){

		if(localStorage.todo && localStorage.todo.length > 0){
			var todo = JSON.parse(localStorage.todo), i;

			for(i=0; i< todo.length; i++){
				callback(todo[i],i);
			}

		}/*else{
			get("showTheTodo").innerHTML = showEmpty;
		}*/
	},


	remove: function(utc){
		
		

		if(localStorage.todo){
			var todo = JSON.parse(localStorage.todo), i;

			for(i=0; i< todo.length; i++){

				var t = todo[i];

				if(t.utc == utc){
					console.log("utc" + i);
					todo.splice(i,1);
				} 
			}

		console.log(todo);
		localStorage.setItem('todo', JSON.stringify(todo));

		}else{
			get("showTheTodo").innerHTML = showEmpty;
		}


		TODO.update();

	},

	_getTime : function(){

		var t = new Date();

		var time = {
			time : t.getDate() + "/" + (t.getMonth()+1) + "/" + t.getFullYear() + " " + TODO._formatAMPM(t),
			utc: Date.now()
		}

		return time;

	},

	_formatAMPM : function(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'pm' : 'am';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;


	}
}


function getRandomColor() 
{
    var r = function () { return Math.floor(Math.random()*256) };
    return "rgba(" + r() + "," + r() + "," + r() + " ,0.4)";
}