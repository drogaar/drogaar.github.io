function openTab(event, tabName) {
    let tabSections = document.getElementsByClassName("tabSection");
    for (i = 0; i < tabSections.length; i++) {
      tabSections[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    let calendarControls = document.getElementsByClassName("calendar-google-ctrl");
    for (i = 0; i < calendarControls.length; i++) {
      calendarControls[i].style.display = tabName === "calendar" ? "block" : "none";
    }

    if(tabName==="calendar"){
      document.getElementById("title").innerHTML = "Calendar";
    } 
    if(tabName==="about"){
      document.getElementById("title").innerHTML = "Danny Rogaar";
    } 

    // tab button display
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    let tabElement = event == undefined ? document.getElementById("aboutButton") : event.currentTarget;
    tabElement.className += " is-active";
}

function setClass(id, className, bool){
  let item = document.getElementById(id);

  if(bool){
    item.className += " " + className;
  } else {
    item.className = item.className.replace(" " + className, "");
  }
}
  
$(document).ready(function() {
    openTab(undefined, 'about');
});