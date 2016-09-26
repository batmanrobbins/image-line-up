// JavaScript Document
// Detect IE and version number through injected conditional comments
function isIE(version, comparison) {
    var cc      = 'IE',
        b       = document.createElement('B'),
        docElem = document.documentElement,
        isIE;
        
    if(version){
        cc += ' ' + version;
        if(comparison){ cc = comparison + ' ' + cc; }
    }
    
    b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
    docElem.appendChild(b);
    isIE = !!document.getElementById('iecctest');
    docElem.removeChild(b);
    return isIE;
}
//Listen for IE8 and redirect to compatible page if detected
if (isIE(8, "lte")) {
        //window.location.href = "ie.html";
    }
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
var isiPad = ua.indexOf("ipad") > -1; //&& ua.indexOf("mobile");
var VP = document.getElementsByTagName("meta");
var userAgent;

if(isAndroid || isiPad) {
	for (userAgent=0; userAgent<VP.length; userAgent++) {
      if (VP[userAgent].name == "viewport") {
        VP[userAgent].content = "width=320, initial-scale=1";
      }
    }
}
/*
		This script is set up to animate a single bar in the background of each of the wheels.
		As this bar animates across, the wheels travel a %ge of their needed distance according
		to the %ge that wheels controller bar has traveled across its background.  The Wheels 
		left position is continually increased, but reset to 0 once it goes over the game areas
		width.  The landing variables dictate on which 1/3rd of the board the left side of the 
		image lands on. So a 1, will place the left tile against the left side of the game, and 
		a 2 will make it so the left tile land in the middle of the game, and a 3 will be on the 
		right.
		*/
		var bgImage = "lib/images/image3.jpg"; //FULL roller image url.
		var win = 0; // 0=lose : 1=win
		var difficulty = 1; //0=NA : 1=Lose, but can get one match : 2=Nothing matches
		var bSpins = 9; //Number of initial spins before stopping.
		var mSpins = 2; //Number of spins to take after the previous wheel stops.
		var spinTime = 500; //spinTime x spins for that wheel is how long the wheel will spin before stopping.
		var direction = ["left", "right", "left"]; //Direction the slide in that position spins.
		var totalWidth, landing1, landing2, landing3, end1, end2, end3, doSlides;
		
		$(document).ready(function(e){
			//Initial setup of positions within the game
			$("#slide1, #slide1c").css("top",(0/3)*100+"%").css("height",(1/3)*100+"%");
			$("#slide2, #slide2c").css("top",(1/3)*100+"%").css("height",(1/3)*100+"%");
			$("#slide3, #slide3c").css("top",(2/3)*100+"%").css("height",(1/3)*100+"%");
			$("#slide1").css(direction[0],"0%");
			$("#slide2").css(direction[1],"0%");
			$("#slide3").css(direction[2],"0%");
			$("#slide1c").css(direction[0],"-100%");
			$("#slide2c").css(direction[1],"-100%");
			$("#slide3c").css(direction[2],"-100%");
			$("#slide1 DIV, #slide2 DIV, #slide3 DIV, #slide1c DIV, #slide2c DIV, #slide3c DIV")
				.css("background-image","url("+bgImage+")").css("background-size","300%");
			$("#slide1 .col1, #slide1c .col1").css("background-position","00% 00%");
			$("#slide1 .col2, #slide1c .col2").css("background-position","50% 00%");
			$("#slide1 .col3, #slide1c .col3").css("background-position","100% 00%");
			$("#slide2 .col1, #slide2c .col1").css("background-position","00% 50%");
			$("#slide2 .col2, #slide2c .col2").css("background-position","50% 50%");
			$("#slide2 .col3, #slide2c .col3").css("background-position","100% 50%");
			$("#slide3 .col1, #slide3c .col1").css("background-position","00% 100%");
			$("#slide3 .col2, #slide3c .col2").css("background-position","50% 100%");
			$("#slide3 .col3, #slide3c .col3").css("background-position","100% 100%");
			$("#sslotSpacer IMG").attr("src", bgImage);
			
			//fix game positions when window is resized.
			$(window).resize(function(){
				setArea();
				moveSlides();
			});
			
			//NOT to be used in production, only here to allow more than one run per page load
			function resetSSlider(){
				$("#slide1Master, #slide2Master, #slide3Master").css("width","0%");
				$("#startbtnWin, #startbtnLose, #startbtnLose2").hide();
				moveSlides();
			}
			$("#startbtnWin").click(function(){
				resetSSlider();
				win=1; difficulty=0;
				window.setTimeout(function(){doSlide();},300);
			});
			$("#startbtnLose").click(function(){
				resetSSlider();
				win=0; difficulty=1;
				setTimeout(function(){doSlide();},300);
			});
			$("#startbtnLose2").click(function(){
				resetSSlider();
				win=0; difficulty=2;
				setTimeout(function(){doSlide();},300);
			});
		});
		
		function doSlide(){
			"use strict";
			//end bounce ratios
			var B1 = 5;
			var B2 = 13.5;
			var B3 = 35;
			//Set landings to the same random number.
			landing1 = landing2 = landing3 = Math.floor(Math.random()*3,1)+1;
			//If not a winner, randomize landings based on difficulty 1 or 2.
			if(!win && difficulty==0){difficulty=1;}
			while(
				(difficulty==1 && (landing1==landing2 && landing1==landing3)) || 
				(difficulty==2 && (landing1==landing2 || landing1==landing3 || landing2==landing3)) && 
				!win
			){
				landing1 = Math.floor(Math.random()*3,1)+1;
				landing2 = Math.floor(Math.random()*3,1)+1;
				landing3 = Math.floor(Math.random()*3,1)+1;
			}
			if(direction[0]=="right"){landing1=(landing1-2)*(-1);}
			if(direction[1]=="right"){landing2=(landing2-2)*(-1);}
			if(direction[2]=="right"){landing3=(landing3-2)*(-1);}
			setArea();
			//Animate controlers
			$("#slide1Master")
				.animate({"width":"100%"},spinTime*(bSpins+(mSpins*0)),"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*0))))/B1))+"%"},250,"easeOutQuad")
				.animate({"width":"100%"},250,"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*0))))/B2))+"%"},100,"easeOutQuad")
				.animate({"width":"100%"},100,"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*0))))/B3))+"%"},40,"easeOutQuad")
				.animate({"width":"100%"},40,"easeInQuad");
			$("#slide2Master")
				.animate({"width":"100%"},spinTime*(bSpins+(mSpins*1)),"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*1))))/B1))+"%"},250,"easeOutQuad")
				.animate({"width":"100%"},250,"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*1))))/B2))+"%"},100,"easeOutQuad")
				.animate({"width":"100%"},100,"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*1))))/B3))+"%"},40,"easeOutQuad")
				.animate({"width":"100%"},40,"easeInQuad");
			$("#slide3Master")
				.animate({"width":"100%"},spinTime*(bSpins+(mSpins*2)),"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*2))))/B1))+"%"},250,"easeOutQuad")
				.animate({"width":"100%"},250,"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*2))))/B2))+"%"},100,"easeOutQuad")
				.animate({"width":"100%"},100,"easeInQuad")
				.animate({"width":(100-((100/(bSpins+((mSpins*2))))/B3))+"%"},40,"easeOutQuad")
				.animate({"width":"100%"},40,"easeInQuad",function(){
					getWinner();
				});
			//Itterate wheel updates based on controler position
			/*doSlides = setInterval(function(){
				moveSlides();
			},30);
			*/
			doSlides = window.setInterval(moveSlides,30);
		}
		
		function setArea(){
			//Get width of container to size the game correctly.
			totalWidth = $("#sslotContainer").width();
			//Calculate ending position for each wheel
			end1 = (bSpins+(mSpins*0))*totalWidth+(totalWidth*((landing1-1)/3));
			end2 = (bSpins+(mSpins*1))*totalWidth+(totalWidth*((landing2-1)/3));
			end3 = (bSpins+(mSpins*2))*totalWidth+(totalWidth*((landing3-1)/3));
			//console.log("Ends: " + end1 + ", " + end2 + ", " + end3);
		}
		
		function moveSlides(){
			$("#slide1").css(direction[0],(end1*($("#slide1Master").width()/totalWidth))%totalWidth+"px");
			$("#slide2").css(direction[1],(end2*($("#slide2Master").width()/totalWidth))%totalWidth+"px");
			$("#slide3").css(direction[2],(end3*($("#slide3Master").width()/totalWidth))%totalWidth+"px");
			$("#slide1c").css(direction[0],((end1*($("#slide1Master").width()/totalWidth))%totalWidth)-totalWidth+"px");
			$("#slide2c").css(direction[1],((end2*($("#slide2Master").width()/totalWidth))%totalWidth)-totalWidth+"px");
			$("#slide3c").css(direction[2],((end3*($("#slide3Master").width()/totalWidth))%totalWidth)-totalWidth+"px");
		}
		
		function getWinner(){
			clearInterval(doSlides); //Stop moving the wheels.
			moveSlides(); //Move wheels to final position.
			//$("#startbtnWin, #startbtnLose, #startbtnLose2").show(); //NOT to be used on production
			$('#endGame').removeClass('hidden');
			if(win){
				$('#winMsg').modal();
				} else {
				$('#loseMsg').modal();
				}
		}