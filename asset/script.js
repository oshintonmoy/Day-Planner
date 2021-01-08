$(document).ready(function(){

$(".save").on("click",function(){
    var textInput = $(this).siblings(".textarea").val();
    console.log(textInput);
    var timeSlot = $(this).parent().attr("id");
    console.log(timeSlot);

    //local storage set up//
    localStorage.setItem(timeSlot,textInput);


})
    
//display current time and date//
$("#currentDay").text(moment().format("Do MMMM YYYY, h:mm a"));

//local storage data//

$("#8 .todaysEvent").val(localStorage.getItem("8"));
$("#9 .todaysEvent").val(localStorage.getItem("9"));
$("#10 .todaysEvent").val(localStorage.getItem("10"));
$("#11 .todaysEvent").val(localStorage.getItem("11"));
$("#12 .todaysEvent").val(localStorage.getItem("12"));
$("#1 .todaysEvent").val(localStorage.getItem("1"));
$("#2 .todaysEvent").val(localStorage.getItem("2"));
$("#3 .todaysEvent").val(localStorage.getItem("3"));
$("#4 .todaysEvent").val(localStorage.getItem("4"));

overdueHours();

function overdueHours() {
    // current hours
    var currentHour = moment().hours();
    console.log(typeof currentHour)


   
      $(".todaysEvent").each(function() {

        var eventHour = parseInt($(this).attr("id"));
        console.log(eventHour, currentHour);
        console.log($(this).attr("id"));
        console.log(typeof eventHour)



        //check times against current hour
        if (eventHour < currentHour) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");

        }
        else if (eventHour === currentHour) {
            $(this).removeClass("past");
            $(this).addClass("present");
            $(this).removeClass("future");
        }
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    })
}




// clear page
$("#clear").click(function () {
localStorage.clear();
location.reload();
});


});





















