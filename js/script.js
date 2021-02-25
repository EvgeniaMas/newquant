'use strict';
const current_level =document.getElementById('current_level');
const current_move = document.getElementById('current_move');
const back_move = document.getElementById('back_move');
const information = document.getElementById('information');
const back_tutorial = document.getElementById('back_tutorial');
const next_tutorial = document.getElementById('next_tutorial');
const max_moves_text = document.getElementById('max_moves_text');
const first_tutorial_show = document.getElementById('first_tutorial_show');
const close_modal = document.getElementById('close_modal');
const notification_modal = document.getElementById('notification_modal');
const notification_message = document.getElementById('notification_message');
const overlay = document.getElementById('overlay');
const pass_modal = document.getElementById('pass_modal');
const back_move_modal = document.getElementById('back_move_modal');
const level_redone = document.getElementById('level_redone');
const modal_buttons = document.getElementById('modal_buttons');
const to_level = document.getElementById('to_level');
const game_field = document.getElementById('game_field');
const close_info = document.getElementById('close_info');
const info_section = document.getElementById('info_section');
let close =document.getElementById('close');
let sequence = [[3,2,1], [1,1,2], [1,3,3]];
let gatter_ind = 4;
let working_sequence = sequence.map(sub => sub.slice());
let gatter_in_action = null;
let reset_mode = false;
const quants_cells = document.getElementsByClassName('quants_cells');
let playerGameState = {};
playerGameState.moves = [];
playerGameState.moves.push(working_sequence);
let solution_sequence = [  [[3,2,2], [2,2,2], [1,3,3]], 
 [[3,1,2], [1,2,1], [2,3,3]], [[2,3,3], [1,2,2], [1,3,3]],
 [[2,1,2], [3,1,2], [2,2,2]],  [[3,2,1], [2,3,1], [1,3,2]], 
 [[1,2,1], [1,1,2], [2,2,2]], [[3,2,1], [1,2,1], [1,3,3]], 
 [[1,1,2], [3,1,2], [3,3,3]]
];
let gatters_images = [
'<div class="game_gatter_info"><span class="gatter_symbol">X</span> <br> <span class="gatter_word"> Gatter</span></div>',    
'<div class="game_gatter_info"><span class="gatter_symbol">H0</span> <br> <span class="gatter_word"> Gatter</span></div>',     
'<div class="game_gatter_info"><span class="gatter_symbol">H1</span><br> <span class="gatter_word"> Gatter</span></div>',
'<div class="game_gatter_info"><span class="gatter_symbol">SWAP</span> <br> <span class="gatter_word"> Gatter</span></div>',      
'<div class="game_gatter_info"><span class="gatter_symbol">SNOT</span> <br> <span class="gatter_word"> Gatter</span></div>'
] 
let attempt = [0, [0, 0], 0,0];
let moves =0;
let level = 0;
let max_moves = [2,3,2,3,2,2,2,3];
let available_moves = max_moves[level];
let box, solution;
// check if level solved;
function solvedLevel(arr1, arr2) {
    for (var i = 0; i < 3; i++) {
    	 for (var j = 0; j < 3; j++) {
        if (arr1[i][j] !== arr2[i][j]){
            return false;
         }

        }  
     }
    return true;
}
// notifications (error, solved)
function notifyPlayer(message){    
    notification_message.innerHTML= message;
    overlay.style.display = 'block'; 
    fadeIn(notification_modal);
}
// hide, show methods of elements
function fadeOut(el) {  
	var opacity = 1;  
	var timer = setInterval(function() {    
		if(opacity <= 0.1) {		
			clearInterval(timer);	
	
		}	
		el.style.opacity = opacity;     
		opacity -= opacity * 0.1;
   
	}, 10);
el.style.display = 'none';
}
function fadeIn(el) { 
if(el == tutorial_show){
  if(tutorial[0].classList.contains('tutorial_block2')) {
     document.getElementById('h_gatter1_interactive').classList.add('active');
  }  
  else if(tutorial[0].classList.contains('tutorial_block3') || tutorial[0].classList.contains('tutorial_block4')  ){
	    quibits_trainfirst_container = document.querySelectorAll('.interactive'); 
		quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
		quibits_trainfirst_container.addEventListener('click', setClickedQuibits);
	});
		quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
		quibits_trainfirst_container.removeEventListener('touchstart', touchStart_interactive);
		quibits_trainfirst_container.removeEventListener('touchmove',touchMove_interactive);
		quibits_trainfirst_container.removeEventListener('touchend', touchEnd_interactive);	
	});

  }
}

	var opacity = 0.01 ;
	el.style.opacity = 0;  
	el.style.display = 'block';  
	var timer = setInterval(function() {    
		if(opacity >= 1) {			
			clearInterval(timer);		
		}		
		el.style.opacity = opacity;     
		opacity += opacity * 0.1;   
	}, 10);	
	
}
// click on game board handlings
let combination = [];
function overMoves(){
  	let message =  '<p class="tutorial_text centered_text"> Du hast die maximale Anzahl von Zügen erreicht. <br><br> Drücke auf "Rückgängig", um einen Zug zurückzuziehen oder starte den Level erneut.</p>';
    modal_buttons.style.display = 'block';
    pass_modal.style.display = 'none';
    setTimeout(function() {
         notifyPlayer(message);
      }, 1000);
    	
}
function cellClick(event) {
  if(moves>=available_moves){
    overMoves();
  }

  else if(!gatter_in_action){
	let images =createImageGatter();
	let empty_message = '<p class="tutorial_text centered_text error_gatter">Du hast das Gatter nicht gewählt!</p><div class ="images_block">' + images + '</div>' ;		
	notifyPlayer(empty_message);
	return false;
  }
   else{
   	if(gatter_in_action== 'snot_gatter' || gatter_in_action == 'swap_gatter'){
		let el = event.target || window.event;   
		if(el.classList.contains('quants')){
		  el = event.target.parentNode;
		}
		if(el.classList.contains('active')){
		  el.classList.remove('active');		 
		  let id = el.getAttribute('id');
		  if(combination.length>1){
		  	
		  	let aсtive_index = combination.indexOf(id);
        
             if(aсtive_index){
		  	  combination.splice(active_index, 1); }
		  }
		  else{	
		  	combination = [];
		  }    
	
		}
		else{
		  el.classList.add('active');		
		let index_in_collection = el.getAttribute('id');	
		combination.unshift(index_in_collection);
		let active_line = el.childNodes[0].id.charAt(0);
		let active_quilbit = el.childNodes[0].id.charAt(2);

		 if(combination.length==2){
		  if(gatter_in_action == 'swap_gatter'){
		  	 swapGatter();

		  }
		  else if(gatter_in_action == 'snot_gatter'){
              snotGatter();
		  }
      
		     setTimeout('resetGatter(gatter_in_action)', 1200);
          }
        }
       }
    }
}
// creat a targert sequence
function createPattern(level){
	let table_solution = document.createElement('table'),
		tbody_solution = document.createElement('tbody');
		table_solution.id = 'game_target';					
	table_solution.appendChild(tbody_solution);
	let quant_solution;
	for(let i = 0; i < 3; ++i){
		let row_solution = document.createElement('tr');
		for(let j = 0; j < 3; ++j){
			let cell_solution = document.createElement('td');				
				let quant_solution = solution_sequence[level][i][j];
				if(quant_solution==1){
                  quant_solution = '<div class="white_quant mini"></div>';
				}
				else if(quant_solution==2){
				  quant_solution = '<div class="black_quant mini"></div>';	
				}
				else{
				quant_solution = '<div class="sup_quant mini"></div>';	
				}
				cell_solution.innerHTML = quant_solution;
				row_solution.appendChild(cell_solution);
		}
		tbody_solution.appendChild(row_solution);					
	}
	if(solution.childNodes.length == 1){

		solution.removeChild(solution.firstChild);	
	}

solution.appendChild(table_solution);
}
// create a game field
function buildGame(array){
	let table = document.createElement('table'),
		tbody = document.createElement('tbody');	
		table.id = 'game_field';				
	table.appendChild(tbody);
	let quant;
	for(let i = 0; i < 3; ++i){
		let row = document.createElement('tr');
		for(let j = 0; j < 3; ++j){
			let cell = document.createElement('td');
			cell.classList.add('quibits_container');
			cell.setAttribute('id' , i + " " + j);				
				cell.onclick = cellClick;
				let quant = array[i][j];
				if(quant==1){
                  quant = '<div class="quants white_quant"></div>';
				}
				else if(quant==2){
				  quant = '<div class="quants black_quant"></div>';	
				}
				else{
				quant = '<div class="quants sup_quant"></div>';	
				}
				cell.innerHTML = quant;
				row.appendChild(cell);
		}
		tbody.appendChild(row);	
	}
	 if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);	
	box.appendChild(table);
	let quibits_containers = document.querySelectorAll('.quibits_container');
     quibits_containers.forEach(quib_container => {
        quib_container.addEventListener('touchstart', touchStart);
        quib_container.addEventListener('touchmove',touchMove);
        quib_container.addEventListener('touchend', touchEnd);
      });
    
}
// back move handlings
function backMoveRun(){
	if(moves>0){
		--moves;
		back_move.classList.add('active');
		let last = playerGameState.moves.length;
		working_sequence = playerGameState.moves[0];
		buildGame(working_sequence);
		current_move.innerText = moves;
		playerGameState.moves.splice(0, 1);
	}
	if(moves ==0){
		back_move.classList.remove('active');
	}	
}
// close game modals
function closeModal(){
fadeOut(notification_modal);
overlay.style.display = 'none';
}
if(close_info){
	close_info.addEventListener('click', function(){
	fadeOut(info_section);
})
}
// gates
function turnOnGatter(){
const x_gatter = document.getElementById('x_gatter');
const h_gatter1 = document.getElementById('h_gatter1');
const h_gatter2 = document.getElementById('h_gatter2');
const swap_gatter = document.getElementById('swap_gatter');
const snot_gatter = document.getElementById('snot_gatter');
	if(level ==2 || level ==3){
	x_gatter.style.display = 'inline-block';
	h_gatter1.style.display = 'inline-block'; 
	h_gatter2.style.display = 'inline-block'; 
	swap_gatter.style.display = 'none'; 
	snot_gatter.style.display = 'none'; 	
	}
	else if(level ==4){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'none'; 
	    h_gatter2.style.display = 'none'; 
		swap_gatter.style.display = 'inline-block'; 
		snot_gatter.style.display = 'none'; 	
	}
    else if(level ==5){
    
        x_gatter.style.display = 'none';
		h_gatter1.style.display = 'inline-block';
				
	    h_gatter2.style.display = 'inline-block'; 
		swap_gatter.style.display = 'inline-block'; 
		snot_gatter.style.display = 'none';
    }
	else if(level ==6){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'none'; 
	    h_gatter2.style.display = 'none'; 
		swap_gatter.style.display = 'none'; 
		snot_gatter.style.display = 'inline-block'; 	
	}
	else if(level ==7){
		x_gatter.style.display = 'inline-block';
		h_gatter1.style.display = 'inline-block'; 
	    h_gatter2.style.display = 'inline-block'; 
		swap_gatter.style.display = 'none'; 
		snot_gatter.style.display = 'inline-block'; 	
	}

    let game_gatters = document.querySelectorAll('.game_gatter');
	if(game_gatters.length>1){
		for(let a=0; a<game_gatters.length; a++){
			game_gatters[a].classList.remove('active');
		}
	}
}



function resetGameState(){
	if(moves<available_moves){
	 ++moves;
     current_move.innerText = moves; 
     buildGame(working_sequence);    
     combination = [];
     if(moves >0){
		back_move.classList.add('active');
	}	
 }
}
function applyGatter(gatter){
if(combination.length==0){
	if(gatter_in_action){
	let images =createImageGatter();

	let empty_message = '<p class="tutorial_text centered_text error_gatter">Du hast das Gatter nicht gewählt!</p><div class ="images_block">' + images + '</div>' ;	
	}
	

	// notifyPlayer(empty_message);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block'; 
    return false;
   }

   else if(combination.length<2){
      let errors_committed;
   	if(gatter_in_action=='swap_gatter' || gatter_in_action == 'snot_gatter'){
   		errors_committed = '<p class="tutorial_text centered_text">Wähle zwei Qubits!</p>';
   	}
   	else{
   	errors_committed = '<p class="tutorial_text centered_text">Wähle eine Zeile oder eine Spalte!</p>';
   	} 		

	notifyPlayer(errors_committed);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block'; 
    return false;
   }

	let current_state = working_sequence.map(sub => sub.slice());
	playerGameState.moves.unshift(current_state);
	let manipulation_line;
	let manipulation_column;
	let active_line1 = combination[0].charAt(0);
	let active_column1 = combination[0].charAt(2);
	let active_line2 = combination[1].charAt(0);
	let active_column2 = combination[1].charAt(2);
	switch (gatter) {
	  case 'x_gatter':
	if(active_line1 != active_line2 && active_column1 != active_column2 ){
       	let wrong_message = '<p class="tutorial_text centered_text"> Wähle eine Spalte oder eine Zeile!</P>';
	notifyPlayer(wrong_message);
	 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block';
	}
   else{
	if(active_line1 == active_line2){
	manipulation_line = true;
	manipulation_column = false;
	}
	else if (active_column1== active_column2) {
	manipulation_column = true;
	manipulation_line = false;
	}
      if(manipulation_column){
	      applyVerticalGatter(); 
	       }
	       else{
		    applyHorizontalGatter(); 
	 }   
   }
	    break;
	  case 'h_gatter1':

   if(active_line1 != active_line2 && active_column1 != active_column2 ){
		let wrong_message = '<p class="tutorial_text centered_text">Wähle eine Spalte oder eine Zeile!</p>';
		notifyPlayer(wrong_message);
		 modal_buttons.style.display = 'none';
	    pass_modal.style.display = 'inline-block';
	}
  else{
		if(active_line1 == active_line2){
		manipulation_line = true;
		manipulation_column = false;
		}
		else if (active_column1== active_column2) {
		manipulation_column = true;
		manipulation_line = false;
		}
		   if(manipulation_column){
	        applyVerticalGatter(); 
	       }
	       else{
		    applyHorizontalGatter(); 
	}  }

      break;
    	case 'h_gatter2':
   if(active_line1 != active_line2 && active_column1 != active_column2 ){
    let wrong_message = '<p class="tutorial_text centered_text">Wähle eine Spalte oder eine Zeile!</p>';
	notifyPlayer(wrong_message);
		 modal_buttons.style.display = 'none';
    pass_modal.style.display = 'inline-block';
	}
  else{
	if(active_line1 == active_line2){
	manipulation_line = true;
	manipulation_column = false;
	}
	else if (active_column1== active_column2) {
	manipulation_column = true;
	manipulation_line = false;
	}
        if(manipulation_column){
	        applyVerticalGatter(); 
	       }
	       else{
		    applyHorizontalGatter(); 
	        }
      }
	
	    break;

       case 'swap_gatter':
		  swapGatter();
		
  
	  break;
	    case 'snot_gatter':
	      snotGatter();
	    
	   break;

    
	}
    checkUpSequence();
}
// swap, snot gates
function swapGatter(){
	let active_line1 = combination[0].charAt(0);
	let active_column1 = combination[0].charAt(2);
	let active_line2 = combination[1].charAt(0);
	let active_column2 = combination[1].charAt(2);
	let first_swap = working_sequence[active_line1][active_column1];
	let second_swap  = working_sequence[active_line2][active_column2];
	working_sequence[active_line1][active_column1] = second_swap;
	working_sequence[active_line2][active_column2] = first_swap;
   checkUpSequence();

}
function snotGatter(){
	let active_line1 = combination[0].charAt(0);
	let active_column1 = combination[0].charAt(2);
	let active_line2 = combination[1].charAt(0);
	let active_column2 = combination[1].charAt(2);
	let control = working_sequence[active_line2][active_column2];
	working_sequence[active_line1][active_column1] = control; 
	checkUpSequence();
}

let gatterItems = document.querySelectorAll('.game_gatter'),
    index_gatter, single_gatter;
  for (index_gatter = 0; index_gatter < gatterItems.length; index_gatter++) {
    single_gatter = gatterItems[index_gatter];
    let active_gatter;
    single_gatter.addEventListener('click', function (event) {
    	if(event.target.classList.contains('gatter_symbol') || event.target.classList.contains('gatter_word')){
           active_gatter = event.target.closest('.game_gatter');
    	}
    	else{
    		active_gatter = event.target;
    	}    	
    	  
          if(active_gatter.classList.contains('active')){
          	active_gatter.classList.remove('active');
          	gatter_in_action = null;          
          }
          else{

          	let game_gatters = document.querySelectorAll('.game_gatter');
	if(game_gatters.length>1){
		for(let a=0; a<game_gatters.length; a++){
			game_gatters[a].classList.remove('active');
		}
	}

       active_gatter.classList.add('active');
       gatter_in_action = active_gatter.getAttribute('id');
        if(combination.length==2){
               	if(gatter_in_action== 'swap_gatter'){
             		swapGatter();
             	}
             	else if(gatter_in_action == 'snot_gatter'){
             		snotGatter();
             	}
            else if(combination.length==1){
           	let two_message = '<p class="tutorial_text centered_text"> Wähle zwei Qubits!</p>'
             	notifyPlayer(two_message);
	            modal_buttons.style.display = 'none';
                pass_modal.style.display = 'inline-block';
                document.getElementById(combination[0]).classList.remove('active');
                combination = [];
             }
           }
        event.preventDefault();
       }
    });
}
// tutorials
let index = 0;
let tutorial = document.querySelectorAll('.tutorial_block1');
let index_length = tutorial.length;
function checkTutorial(){
   if(level <=1){
     tutorial = document.querySelectorAll('.tutorial_block1');	
	}
	else if(level < 3){
      tutorial = document.querySelectorAll('.tutorial_block2');
      interactive_gatter = 'h_gatter1_interactive';            
	}
	else if(level < 5){
      tutorial = document.querySelectorAll('.tutorial_block3');
	}
	else if(level >5){
      tutorial = document.querySelectorAll('.tutorial_block4');		
	}

}
function cleanTutorial(){
 let tutorials = document.querySelectorAll('.tutorial_section');	
 for (var i=0; i<tutorials.length; i++){
	 tutorials[i].classList.remove('active');
 }
  tutorial[0].classList.add('active');
  index = 0; 

  if(tutorial.length==1){
     next_tutorial.style.display = 'none';
     to_level.style.display = 'inline-block';
     let to_current = level +1;		
	 to_level.innerHTML = '<span>Zu Level ' + to_current + '<img class="arrow_button" src="img/arrow_right.png" alt="game"></span>';
  }
  else{
    next_tutorial.style.display = 'inline-block';
     to_level.style.display = 'none';
  }
  
  index_length = tutorial.length;
}
// checkups changes
function checkUpSequence(){
 resetGameState();
    let a =solvedLevel(working_sequence, solution_sequence[level]);
    if(a==true){
      ++level; 
      if(level==8){
      	const finish = document.getElementById('finish'); 
        finish.style.display = 'block';
          return; 

      }

    setTimeout(function() {
        
         working_sequence = sequence.map(sub => sub.slice());  
         turnOnGatter(); 
         current_level.innerText = level+1;
    	 moves =0;
         available_moves = max_moves[level];
         current_move.innerText = moves;
         max_moves_text.innerText = available_moves;
         back_move.classList.remove('active');
         createPattern(level);
         buildGame(sequence);

    }, 2100);

    	if(level ==2 || level ==4 || level==6){  

          checkTutorial();
          cleanTutorial();
          back_tutorial.classList.add('disabled');
          to_level.classList.add('disabled');	
          fadeIn(tutorial_show);          
    	}
    	else{    			    
    	let win = '<p class="tutorial_title_text small ">Glückwunsch</p><p class="tutorial_text centered_text">Glückwunsch! Du hast dieses Level erfolgreich gelöst!</p>';    	
               setTimeout(function() {
         notifyPlayer(win);
         }, 2000);

        modal_buttons.style.display = 'none';
    	pass_modal.style.display = 'inline_block';  
    	}    
    } 
}
function applyHorizontalGatter(){
   let active_line = combination[0].charAt(0);
   let active_column = combination[0].charAt(2);
   switch (gatter_in_action) {
	  case 'x_gatter':	
	for(let i=0; i<3; i++){
		if(working_sequence[active_line][i] ==1){
		  working_sequence[active_line][i] =2; 	
		}
		else if(working_sequence[active_line][i] ==2){
		  working_sequence[active_line][i] = 1; 	
		} 
	}
    break;
	  case 'h_gatter1':   
	for(let i=0; i<3; i++){
		if(working_sequence[active_line][i] ==1){
		  working_sequence[active_line][i] =3; 	
		}
		else if(working_sequence[active_line][i] ==3){
		  working_sequence[active_line][i] = 1; 	
		} 
	  }
      break;
    	case 'h_gatter2':   
	for(let i=0; i<3; i++){	 		 
		if(working_sequence[active_line][i] ==1 ){	
		  working_sequence[active_line][i] = 3;
		}
		else if(working_sequence[active_line][i] ==3){		
		  working_sequence[active_line][i] = 2; 		  
		}
	}
	
	  break;
    
	}
   checkUpSequence();   
}

function applyVerticalGatter(){
   let active_line = combination[0].charAt(0);
   let active_column = combination[0].charAt(2);
    switch (gatter_in_action) {
	  case 'x_gatter':	

		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column] ==1){
			  working_sequence[i][active_column] =2; 	
			}
			else if(working_sequence[i][active_column] ==2){
			working_sequence[i][active_column] =1;
            }  
         }
	    break;
	  case 'h_gatter1':

   		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column] ==1){
			  working_sequence[i][active_column] =3; 	
			}
			else if(working_sequence[i][active_column] ==3){
			working_sequence[i][active_column] =1;
            }  
         }
      break;
    	case 'h_gatter2':  
		   for(let i=0; i<3; i++){ 
		    if(working_sequence[i][active_column] ==1 ){
			  working_sequence[i][active_column] =3; 	
			}
			else if(working_sequence[i][active_column] ==3){
			working_sequence[i][active_column] =2;
            } 
         }       
    
	}
   checkUpSequence();   
}
// events handlings
window.onload = function() {				
	box = document.getElementById('box');
	solution = document.getElementById('solution');
	createPattern(level);
	buildGame(sequence);

}
information.addEventListener('click', function(){
let info_table = document.querySelectorAll('.info_table');

	for(let i=0; i<info_table.length; i++){
	   info_table[i].style.display = 'none';
	}

   if(level <=1){
   
     document.getElementById('x_gatter_show').style.display = 'block';	
	}
	else if(level == 2 || level==3){
       document.getElementById('x_gatter_show').style.display = 'block';
       document.getElementById('h1_gatter_show').style.display = 'block';
       document.getElementById('h2_gatter_show').style.display = 'block';
	}
	else if(level == 4){
		document.getElementById('x_gatter_show').style.display = 'block';
       document.getElementById('swap_gatter_show').style.display = 'block';	
	}
	else if(level ==5){
		document.getElementById('swap_gatter_show').style.display = 'block';
		document.getElementById('h1_gatter_show').style.display = 'block';
        document.getElementById('h2_gatter_show').style.display = 'block';       	
	}

	else if(level ==6){		      	
        document.getElementById('x_gatter_show').style.display = 'block'; 
        document.getElementById('snot_gatter_show').style.display = 'block';	
	}
	else if(level ==7){
		document.getElementById('x_gatter_show').style.display = 'block'; 		
        document.getElementById('h2_gatter_show').style.display = 'block';      	
        document.getElementById('h1_gatter_show').style.display = 'block';
        document.getElementById('snot_gatter_show').style.display = 'block';	
	}	
fadeIn(info_section);
});
close.addEventListener('click', function(){
   fadeOut(tutorial_show);
   gatter_ind = 4;
   cleanTutorial();
});
next_tutorial.addEventListener('click', function(e){
	tutorial[index].classList.remove('active');
	++index;
	if(index == index_length-1 ){		
		index= index_length-1;
		next_tutorial.style.display = 'none';
		to_level.style.display = 'inline-block';
		let to_current = level +1;		
		to_level.innerHTML = '<span>Zu Level ' + to_current + '<img class="arrow_button" src="img/arrow_right.png" alt="game"></span>';

		if(index>0){
		back_tutorial.classList.remove('disabled'); 		
		}
	}
	else if(index>0){
	    back_tutorial.classList.remove('disabled');         
    }

    else if(index==0){
    	back_tutorial.classList.add('disabled'); 
    }
     tutorial[index].classList.add('active');	
});
back_tutorial.addEventListener('click', function(e){
	next_tutorial.style.display = 'inline-block';
	to_level.style.display = 'none';
	tutorial[index].classList.remove('active');
	--index;
	if(index <= 0){
		index= 0;		
	}
	else if(index<index_length-1){
	   next_tutorial.classList.remove('disabled');     
    }
    if(index==0){
      back_tutorial.classList.add('disabled'); 
    }

     tutorial[index].classList.add('active');
});
close_modal.addEventListener('click', function(e){
   closeModal();
});

back_move.addEventListener('click', function(e){
	backMoveRun();
});
back_move_modal.addEventListener('click', function(e){
	closeModal();	
	backMoveRun();
});
pass_modal.addEventListener('click', function(e){
   closeModal();	
});
level_redone.addEventListener('click', function(e){
    closeModal();
	moves =0;
	back_move.classList.remove('active');
	working_sequence = sequence.map(sub => sub.slice());
	available_moves = max_moves[level];
	current_move.innerText = moves;
	max_moves_text.innerText = available_moves;
	createPattern(level);
	buildGame(sequence);
	resetGatter(gatter_in_action);
});
to_level.addEventListener('click', function(e){
  fadeOut(tutorial_show);
  gatter_ind = 4;
  checkTutorial();
  cleanTutorial();  
});
// touch events handlinhgs
let quibit_startx;
let quibit_starty;
let initial_id;
let initial;
let el;

function handleLine(active_line){
for(let i=0; i<3; i++){
  	  let id = active_line + ' ' + i;
  	  document.getElementById(id).classList.add('active');
      combination.unshift(id); 
    }
   setTimeout('applyHorizontalGatter()', 1000); 

}
function handleColumn(active_column){
for(let i=0; i<3; i++){                
       let id = i + ' ' + active_column;
        combination.unshift(id);
        document.getElementById(id).classList.add('active');
      }   
      setTimeout('applyVerticalGatter()', 1000);      
}
function resetGatter(id){

if(gatter_ind==2){

	return;
}

if(gatter_in_action){
	gatter_in_action = null;
	document.getElementById(id).classList.remove('active');
	return false;
}
	if(interactive_gatter){
       document.getElementById(id).classList.remove('active');
	   interactive_gatter = null;
  }
}

// Swipes
let initialX = null;
let initialY = null;
let current_direction; 
let diffX;
let diffY;
 
function touchStart(e) {
  if(moves>=available_moves){
    overMoves();
    return;
  }
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
  el = e.target || window.event;   
	if(el.classList.contains('quants')){
	   initial = e.target.parentNode;
	}
	else{
	   initial = e.target;
	}
	initial_id =initial.getAttribute('id'); 
};
 
function touchMove(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY; 
  diffX = initialX - currentX;
  diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) { 
      current_direction = 'left';
    } else {
      current_direction = 'right';
    }  
  } else {
    if (diffY > 0) { 
      current_direction = 'up';
    } else {
      current_direction = 'down';
    }  
  } 
   
  e.preventDefault();
};


function touchEnd(e) {
if(!gatter_in_action){
let images =createImageGatter();
let empty_message = '<p class="tutorial_text centered_text error_gatter">Du hast das Gatter nicht gewählt!</p><div class ="images_block">' + images + '</div>' ;	
notifyPlayer(empty_message);
return false;
}


if(gatter_in_action == 'swap_gatter' || 
	 	gatter_in_action == 'snot_gatter'){
return false;
}
if(moves>=available_moves){
return false;
}
let quibits_containers = document.querySelectorAll('.quibits_container');
let width_quibits = quibits_containers[0].getBoundingClientRect();
let set_quibit = width_quibits.width*1.5;
let changedX = e.changedTouches[0].pageX;
let changedY = e.changedTouches[0].pageY;

let user_check_up = checkUpUserAction(initial_id, current_direction, 
	initialX,changedX, initialY, changedY, set_quibit, false);

if(!user_check_up){
return false;
}
  initialX = null;
  initialY = null;

let index = initial_id.charAt(2);
	let active_line = initial_id.charAt(0);
	let active_column = initial_id.charAt(2);
	let current_state = working_sequence.map(sub => sub.slice());
	playerGameState.moves.unshift(current_state);

	if(current_direction == 'left' || current_direction == 'right'){
		 handleLine(active_line);
	}
	else{
	    handleColumn(active_column); 	
	}
  setTimeout('resetGatter(gatter_in_action)', 1200);
  e.preventDefault();
};



function wrongChoice(){
let errors_committed = '<p class="tutorial_text centered_text">Wähle eine Zeile oder eine Spalte!</p>';
notifyPlayer(errors_committed);
}

function checkUpUserAction(id, direction, startX, 
	newX, startY, newY, size, prefix ){
	
if(direction== 'right'){
let right_set= 	['0 0', '1 0', '2 0'];
	if(prefix){
      for(let i=0; i< right_set.length; i++){
      	right_set[i] = right_set[i]+prefix;
      }
	}
	if(Math.abs(newY-startY) >80){
		wrongChoice();
     return false;
	}
	if(id==right_set[0] || id==right_set[1] || id==right_set[2] ){    
		if(Math.abs(newX-startX) <size){
			wrongChoice();
         return false;
	    }
	     else{
	    	return true;
	    }
	}
	else{		
		return false;
	}
}

else if(direction== 'left'){
let left_set= 	['0 2', '1 2', '2 2'];
	if(prefix){
      for(let i=0; i< left_set.length; i++){
      	left_set[i] = left_set[i]+prefix;
      }
	}

   if(Math.abs(newY-startY) >80){
   	wrongChoice();
     return false;
	}
if(id== left_set[0] || id== left_set[1] || id== left_set[2]){
		if(Math.abs(newX-startX) < size){
			wrongChoice();
         return false;
	    }
	    else{
	    	return true;
	    }
	}
	else{
		return false;
	}
}


else if(direction== 'up'){
	let up_set= ['2 0', '2 1', '2 2'];
	if(prefix){
      for(let i=0; i< up_set.length; i++){
      	up_set[i] = up_set[i]+prefix;
      }
	}
	if(Math.abs(newX-startX) >80){
		wrongChoice();
     return false;
	}
	
	if(id== up_set[0] || id== up_set[1] || id== up_set[2]){
		if(Math.abs(newY-startY) < size){
			wrongChoice();
         return false;
	    }
	     else{
	    	return true;
	    }
	}
	else{	
		return false;
	}
}

   else if(direction== 'down'){
   		let down_set= ['0 0', '0 1', '0 2'];
	if(prefix){
      for(let i=0; i< down_set.length; i++){
      	down_set[i] = down_set[i]+prefix;
      }
	}

	 if(Math.abs(newX-startX) >80){
	 	wrongChoice();
     return false;
	}
	
	if(id== down_set[0] || id== down_set[1] || id== down_set[2]){
		
		if(Math.abs(newY-startY) < size){
			wrongChoice();
         return false;
	    }
	     else{
	    	return true;
	    }
	}
	else{	
		return false;
	}
  }
}
let quibits_trainfirst_container = document.querySelectorAll('.interactive');
quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
quibits_trainfirst_container.addEventListener('touchstart', touchStart_interactive);
quibits_trainfirst_container.addEventListener('touchmove',touchMove_interactive);
quibits_trainfirst_container.addEventListener('touchend', touchEnd_interactive);
});

// Swipes interact
let inter_combination = [];
let initialX_interactive = null;
let initialY_interactive = null;
let current_direction_interactive; 
let initial_interctive_id;
let current_tutor_index = null;

function getPrefix(){
	let prefix;
	if(level <2){
    prefix = '_first';
    current_tutor_index = 0;
	}

    else if(level ==2 || level ==3){
 	prefix = '_second';
 	current_tutor_index = 1;
	}
	else if(level ==4){
      prefix = '_third';
      current_tutor_index = 2;
	}
    else if(level ==6){
      prefix = '_four';
      current_tutor_index = 3;
    }
    return prefix;
}

function touchStart_interactive(e) {
let initial_interctive;
  initialX_interactive = e.touches[0].clientX;
  initialY_interactive = e.touches[0].clientY;

  el = e.target || window.event;   
	if(el.classList.contains('quants')){
	   initial_interctive = e.target.parentNode;
	}
	else{

	   initial_interctive = e.target;
	}
	initial_interctive_id =initial_interctive.getAttribute('id'); 
};
 
function touchMove_interactive(e) {

  if (initialX_interactive === null) {
    return;
  }
 
  if (initialY_interactive === null) {
    return;
  } 
  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY; 
  let diffX = initialX_interactive - currentX;
  let diffY = initialY_interactive - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) { 
      current_direction_interactive = 'left';
    } else {    
      current_direction_interactive = 'right';
    }  
  } else {
    if (diffY > 0) {
   
      current_direction_interactive = 'up';
    } else {   
      current_direction_interactive = 'down';
    }  
  }  
  e.preventDefault();
};

let interact_combination = [[2,3,3], [1,2,2], [1,3,3]];
let interactive_gatter;
let prefix;

function touchEnd_interactive(e) {
if(!interactive_gatter){
	let images = createImageGatterInteractive();
	let empty_message = '<p class="tutorial_text centered_text error_gatter">Du hast das Gatter nicht gewählt!</p><div class ="images_block">' + images + '</div>' ;	
	notifyPlayer(empty_message);
    return false;	
}

if(interactive_gatter == 'swap_gatter_interactive' || 
	 	interactive_gatter == 'snot_gatter_interactive '){
return false;
}
let quibits_containers = document.querySelectorAll('.interactive');
let width_quibits = quibits_containers[0].getBoundingClientRect();
let int_size = width_quibits.width*1.6;
let changedX = e.changedTouches[0].pageX;
let changedY = e.changedTouches[0].pageY;
let part;
let position;
prefix =  getPrefix();
let user_check_up = checkUpUserAction(initial_interctive_id, current_direction_interactive, 
	initialX_interactive, changedX, initialY_interactive, changedY, int_size, prefix);

if(!user_check_up){
return false;
}
  initialX_interactive = null;
  initialY_interactive = null; 


let final;
let elements = e.target || window.event;   
	if(elements.classList.contains('quants')){
	   final = e.target.parentNode;
	}
	else{
	   final = e.target;
	}
	let final_id =final.getAttribute('id'); 

	if(current_direction_interactive == 'left' ||
	 current_direction_interactive== 'right'){
	 	position = 'horizontal';
	    part = initial_interctive_id.charAt(0);
	 	for(let i=0; i<3; i++){
	   let id = part + ' ' + i+ prefix; 

  	   document.getElementById(id).classList.add('active');       
     }	 
	}
	else{
		position = 'vertical';
		part = initial_interctive_id.charAt(2);
		for(let i=0; i<3; i++){
	    let id_col = i + ' ' + part+ prefix;
  	    document.getElementById(id_col).classList.add('active');
  	  }		    	
	}
	applyInteractMechanics(part, position, interactive_gatter, prefix);

   tutorialNotifications();

  setTimeout('resetGatter(interactive_gatter)', 1200);
  e.preventDefault();
};

function applyInteractMechanics(part, position, interactive_gatter, prefix){
	if(position== 'horizontal'){

		 switch (interactive_gatter) {
			  case 'x_gatter_interactive':	
			for(let i=0; i<3; i++){
				if(interact_combination[part][i] ==1){
				  interact_combination[part][i] =2; 	
				}
				else if(interact_combination[part][i] ==2){
				  interact_combination[part][i] = 1; 	
				} 
			}
           break;
	  case 'h_gatter1_interactive':   
	for(let i=0; i<3; i++){
		if(interact_combination[part][i] ==1){
		  interact_combination[part][i] =3; 	
		}
		else if(interact_combination[part][i] ==3){
		  interact_combination[part][i] = 1; 	
		} 
	  }
      break;
    	case 'h_gatter2_interactive':   
	for(let i=0; i<3; i++){	 		 
		if(interact_combination[part][i] ==1 ){	
		  interact_combination[part][i] = 3;
		}
		else if(interact_combination[part][i] ==3){		
		  interact_combination[part][i] = 2; 		  
		}
       }

	  }
	 }
  
else{
	 switch (interactive_gatter) {
	 case 'x_gatter_interactive':	

		   for(let i=0; i<3; i++){ 
		    if(interact_combination[i][part] ==1){
			  interact_combination[i][part] =2; 	
			}
			else if(interact_combination[i][part] ==2){
			interact_combination[i][part] =1;
            }  
         }

	    break;
	  case 'h_gatter1_interactive':

   		   for(let i=0; i<3; i++){ 
		    if(interact_combination[i][part] ==1){
			  interact_combination[i][part] =3; 	
			}
			else if(interact_combination[i][part] ==3){
			interact_combination[i][part] =1;
            }  
         }
      break;
    	case 'h_gatter2_interactive':  
		   for(let i=0; i<3; i++){ 
		    if(interact_combination[i][part] ==1 ){
			  interact_combination[i][part] =3; 	
			}
			else if(interact_combination[i][part] ==3){
			interact_combination[i][part] =2;
            } 

           }
        }

  }       

setTimeout('showInteractResult(prefix)', 1000);
setTimeout('resetGatter(interactive_gatter)', 1200);
}


function showInteractResult(prefix){
let id = 'container' + prefix;
let container = document.getElementById(id);
let table = document.createElement('table'),
		tbody = document.createElement('tbody');
		let tables_id = 'train'+ prefix;	
		table.id = tables_id;	
		table.classList.add('interactive_table');			
	table.appendChild(tbody);
	let quant;
	for(let i = 0; i < 3; ++i){
		let row = document.createElement('tr');
		for(let j = 0; j < 3; ++j){
			let cell = document.createElement('td');
			let class_quibit = 'quibits'+ prefix; 
			cell.classList.add(class_quibit, 'interactive');		

			cell.setAttribute('id' , i + " " + j+ prefix);			
			
				let quant = interact_combination[i][j];
				if(quant==1){
                  quant = '<div class="quants white_quant"></div>';
				}
				else if(quant==2){
				  quant = '<div class="quants black_quant"></div>';	
				}
				else{
				quant = '<div class="quants sup_quant"></div>';	
				}
				cell.innerHTML = quant;
				row.appendChild(cell);
		}
		tbody.appendChild(row);	
	}

	container.innerHTML = '';
	container.appendChild(table);

quibits_trainfirst_container = document.querySelectorAll('.interactive');
quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
quibits_trainfirst_container.addEventListener('touchstart', touchStart_interactive);
quibits_trainfirst_container.addEventListener('touchmove',touchMove_interactive);
quibits_trainfirst_container.addEventListener('touchend', touchEnd_interactive);
});
}
function interactiveGatter(id){
	let gatter = document.getElementById(id);
	if(gatter.classList.contains('active')){
		gatter.classList.remove('active');
		interactive_gatter = null;
	}
	else{
	  gatter.classList.add('active');
	  interactive_gatter =  gatter.getAttribute('id');
	 }

	quibits_trainfirst_container = document.querySelectorAll('.interactive');
	 if(interactive_gatter == 'swap_gatter_interactive' || 
	 	interactive_gatter == 'snot_gatter_interactive '){	 	
	quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
	quibits_trainfirst_container.addEventListener('click', setClickedQuibits);

	});

	quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
	quibits_trainfirst_container.removeEventListener('touchstart', touchStart_interactive);
	quibits_trainfirst_container.removeEventListener('touchmove',touchMove_interactive);
	quibits_trainfirst_container.removeEventListener('touchend', touchEnd_interactive);
		
	});
	 }
	 else{
	quibits_trainfirst_container.forEach(quibits_trainfirst_container => {
	quibits_trainfirst_container.addEventListener('touchstart', touchStart_interactive);
	quibits_trainfirst_container.addEventListener('touchmove',touchMove_interactive);
	quibits_trainfirst_container.addEventListener('touchend', touchEnd_interactive);
	});
 }
}

function setClickedQuibits(){
if(!interactive_gatter){
	let images =createImageGatterInteractive();
	let empty_message = '<p class="tutorial_text centered_text error_gatter">Du hast das Gatter nicht gewählt!</p><div class ="images_block">' + images + '</div>' ;		
	notifyPlayer(empty_message);
	return false;	
}
  let el = event.target || window.event;   
	if(el.classList.contains('quants')){
	  el = event.target.parentNode;
	}
		if(el.classList.contains('active')){
		  el.classList.remove('active');		 
		  let id = el.getAttribute('id');
		  if(inter_combination.length>1){		  	
		  	let aсtive_index = inter_combination.indexOf(id);        
             if(aсtive_index){
		  	  inter_combination.splice(active_index, 1); }
		  }
		  else{	
		  	inter_combination = [];
		  }    
	
		}
		else{
		  el.classList.add('active');		
		let index_in_collection = el.getAttribute('id');	
		inter_combination.unshift(index_in_collection);
		let active_line = el.childNodes[0].id.charAt(0);
		let active_quilbit = el.childNodes[0].id.charAt(2);

       if(inter_combination.length==2){	

       prefix =  getPrefix();

       if(interactive_gatter == 'swap_gatter_interactive'){

       		let active_line1_swap = inter_combination[0].charAt(0);
	let active_column1_swap = inter_combination[0].charAt(2);
	let active_line2_swap = inter_combination[1].charAt(0);
	let active_column2_swap = inter_combination[1].charAt(2);
	let first_swap = interact_combination[active_line1_swap][active_column1_swap];
	let second_swap  = interact_combination[active_line2_swap][active_column2_swap];
	interact_combination[active_line1_swap][active_column1_swap] = second_swap;
	interact_combination[active_line2_swap][active_column2_swap] = first_swap;
     inter_combination = [];   


       }
      else if(interactive_gatter== 'snot_gatter_interactive ')	{
	let active_line1_snot = inter_combination[0].charAt(0);
	let active_column1_snot = inter_combination[0].charAt(2);
	let active_line2_snot = inter_combination[1].charAt(0);
	let active_column2_snot = inter_combination[1].charAt(2);
	let control = interact_combination[active_line2_snot][active_column2_snot];
	interact_combination[active_line1_snot][active_column1_snot] = control; 
	inter_combination = [];
       }
       setTimeout('showInteractResult(prefix)', 1000);
       setTimeout('resetGatter(interactive_gatter)', 1200);

		}
       }
tutorialNotifications();
}

function tutorialNotifications(){
let encourage_message; 
if(current_tutor_index == 1){
  if(attempt[current_tutor_index][0] == 0){
    attempt[current_tutor_index][0] = 1;
     encourage_message = '<p class="tutorial_title_text small ">Glückwunsch</p><p class="tutorial_text centered_text">Sehr gut, jetzt probiere den Gatter H1 anzuwenden!</p>';	
       setTimeout(function() {
         notifyPlayer(encourage_message);
      }, 1500);


     attempt[current_tutor_index][0] =1;
     document.getElementById('h_gatter1_interactive').classList.remove('active', 'game_gatter_interactive');
     document.getElementById('h_gatter1_interactive').classList.add('game_gatter_clicked',  'disabled');
     
     document.getElementById('h_gatter2_interactive').classList.remove('game_gatter_clicked',  'disabled');
     document.getElementById('h_gatter2_interactive').classList.add('game_gatter_interactive', 'active');
     
     interactive_gatter = 'h_gatter2_interactive';
     gatter_ind =2;
    	      
	}
   else if(attempt[current_tutor_index][1] == 0){
  	
     let mess = '<p class="tutorial_title_text small ">Glückwunsch</p><p class="tutorial_text centered_text">Sehr gut! Wenn du die Funktionsweise verstanden hast, dann klicke auf den Button „Zu Level 3“, ansonsten kannst du noch rumprobieren, und wenn du so weit bist, kannst du das Level 3 starten.</p>';	
      setTimeout(function() {
         notifyPlayer(mess); 
      }, 1500);     
      attempt[current_tutor_index][1] =1;
      to_level.classList.remove('disabled');
      document.getElementById('h_gatter2_interactive').classList.remove('active');    
     document.getElementById('h_gatter1_interactive').classList.remove('game_gatter_clicked',  'disabled');
     document.getElementById('h_gatter1_interactive').classList.add('game_gatter_interactive');
     reset_mode = true;
   	 return false;
   }
   else{
   	gatter_ind = 4;
   }

 }

if(attempt[current_tutor_index] == 0){
	if(current_tutor_index == 2){
     encourage_message = '<p class="tutorial_title_text small ">Glückwunsch</p><p class="tutorial_text centered_text">Sehr gut! Wenn du die Funktionsweise verstanden hast, dann klicke auf den Button „Zu Level 5“, ansonsten kannst du noch rumprobieren, und wenn du so weit bist, kannst du das Level 5 starten.</p>';	
	}
	else if(current_tutor_index ==3){
		encourage_message = '<p class="tutorial_title_text small ">Glückwunsch</p><p class="tutorial_text centered_text">Unser Zielqubitist nun schwarz geworden, hat also den Zustand geändert. Ist unser Kontrollqubit 0, so ändert sich nichts am Zielqubit. Wiederholen CNOT Wenn du die Funktionsweise verstanden hast, dann klicke auf den Button „Zu Level 7“, ansonsten kannst du noch rumprobieren, und wenn du so weit bist, kannst du das Level 7 starten.</p>';	
	}
	else{
	  encourage_message = '<p class="tutorial_title_text small ">Glückwunsch</p><p class="tutorial_text centered_text">Sehr gut! Wenn du die Funktionsweise verstanden hast, dann klicke auf den Button „Zu Level 1“, ansonsten kannst du noch rumprobieren, und wenn du so weit bist, kannst du das Level 1 starten.</p>';	
	}
   attempt[current_tutor_index] =1;

  setTimeout(function() {
        notifyPlayer(encourage_message); 
  }, 1500);

   to_level.classList.remove('disabled');
  }
}


function createImageGatter(){
let set;

	if(level ==0 || level ==1){
      set = gatters_images[0];
	}
	else if(level ==2){
      set = gatters_images[0]+ gatters_images[1]+ gatters_images[1];
	}
	else if(level ==3){
      set = gatters_images[0]+ gatters_images[1]+ gatters_images[2];
	}
	else if(level ==4){
      set = gatters_images[0]+ gatters_images[3];
	}
	else if(level ==5){
      set = gatters_images[1] + gatters_images[2]+ gatters_images[3];
	}
	else if(level ==6){
      set = gatters_images[0]+ gatters_images[4];
	}
	else if(level ==7){
      set = gatters_images[0]+ gatters_images[2] + gatters_images[4];
	}
	return set; 
}


function createImageGatterInteractive(){
let set;

	if(level ==0 || level ==1){
      set = gatters_images[0];
	}
	else if(level >1 && level <=3){
      set = gatters_images[1]+ gatters_images[2];
	}
	
	else if(level >3 && level<=4){
      set = gatters_images[3];
	}
	else if(level >4){
       gatters_images[4];
	}

	return set; 
}


document.addEventListener('click', function(e) {
if (e.target.closest('.game_gatter_interactive')) {
	let game_gatters = document.querySelectorAll('.game_gatter_interactive');
	if(game_gatters.length>1){
		for(let a=0; a<game_gatters.length; a++){
			game_gatters[a].classList.remove('active');
		}
	}
     let id = e.target.closest('.game_gatter_interactive').getAttribute('id');
      interactiveGatter(id);
 
 }
});

