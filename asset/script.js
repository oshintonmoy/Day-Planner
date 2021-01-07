$(document).ready(function(){

$(".save").on("click",function(){
    var textInput = $(this).siblings(".textarea").val()
    console.log(textInput)
    var timeSlot = $(this).parent().attr("id")
    console.log(timeSlot)
    localStorage.setItem(timeSlot,textInput)

})
    


 




























})