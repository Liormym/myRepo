function newcolor1() {
    document.getElementById("b1").style.backgroundColor = "red";
    document.getElementById("b1").style.color = "white";
}
function removeColor1() {
    document.getElementById("b1").style.backgroundColor= "#72FFFF";
    document.getElementById("b1").style.color = "black";
}
function newcolor2() {
    document.getElementById("b2").style.backgroundColor = "red";
    document.getElementById("b2").style.color = "white";
}
function removeColor2() {
    document.getElementById("b2").style.backgroundColor= "#72FFFF";
    document.getElementById("b2").style.color = "green";
}

const addText=document.getElementById("info");
const addDate=document.getElementById("date");
const addTimeUser=document.getElementById("userTime");

function noteCreateObj(e){
   e.preventDefault();
    if((addText.value=="")||(addDate.value=="")||(addTimeUser.value=="")){
        return alert("Please enter all the details")
    }
   else{
    let notes=window.localStorage.getItem("notes");
    if(!notes){
        notes=[];
    }
    else{
        notes=JSON.parse(notes)
    } 
    let formatDate=fixDate(addDate.value);
    let newNote={
        text:addText.value,
        date:formatDate,
        time:addTimeUser.value,
    }
notes.push(newNote);
window.localStorage.setItem("notes",JSON.stringify(notes));
addText.value="";
addDate.value="";
addTimeUser.value="";
showNote();
}
   }
    
  function showNote(){
    let notes=window.localStorage.getItem("notes");
    if(!notes){
        notes=[];
    }
    else{
        notes=JSON.parse(notes);
    }  
    if(notes.length!=0){
        document.getElementById("notes").innerHTML = ``;
        for(let index=0;index<notes.length;index++){
    
            let div=document.createElement("div");
            div.setAttribute("id","note");
            div.setAttribute("class",`note${index}`);
        
            let text=document.createElement("div");
            text.setAttribute("id","noteText");
            text.append(notes[index].text);
        
            let date=document.createElement("div");
            date.setAttribute("id","noteDate");
            date.append(notes[index].date);
        
            let time=document.createElement("div");
            time.setAttribute("id","noteTime");
            time.append(notes[index].time);
        
            let button=document.createElement("button");
            button.setAttribute("id",`btn${index}`);
            button.setAttribute("onclick",`removeNote(${index})`);
            button.setAttribute("class",`btn btn-sm removeButtons border border-0 position-relative`);
            // button.addEventListener(onclick).preventDefault();
            let remove=document.createElement("span");
            remove.setAttribute("class", "glyphicon glyphicon-remove");
            button.append(remove);
            div.append(button,text,date,time);

            document.getElementById("notes").appendChild(div);
           }
           document.querySelector(`.note${notes.length-1}`).classList.add("fade");
    } else {
        document.querySelector("#notes").innerHTML = "";
    }
  }
   showNote()
   function withoutFade() {
    let notes=window.localStorage.getItem("notes");
    if(!notes){
        notes=[];
    }
    else{
        notes=JSON.parse(notes)
    }  
    if(notes.length!=0){
   for(let index=0;index<notes.length;index++){
    document.querySelector(`.note${index}`).classList.remove("fade");
   }
}
}
withoutFade()
function removeNote(num){
    let notes = window.localStorage.getItem("notes");
    if(!notes){
        notes=[];
    }
    else{
        notes=JSON.parse(notes);
    } 
    notes.splice(num,1);
    window.localStorage.setItem("notes",JSON.stringify(notes));
    showNote();
    withoutFade();
}
function fixDate(date){
    var newDate = date;
    newDate = date.split("-").reverse().join("/");
    return newDate;
}