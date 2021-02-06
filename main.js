function gethistory(){
    return document.getElementById("history-val").innerText;
}

function printhistory(num){
    document.getElementById("history-val").innerText = num;
}

function getoutput(){
    return document.getElementById("output-val").innerText;
}

function commasep(op){
    if(op=="-"){//after backspacing -99 2 times only - is op hence set output to null
        return "";
    }
    var n = Number(op);
    var val = n.toLocaleString("en"); // to convert like 999,999,999
    return val;
}

function printoutput(op){
    if(op==""){ // for if empty
        document.getElementById("output-val").innerText = "";
    }
    else{
    document.getElementById("output-val").innerText = commasep(op);} // convert to comma seperated as 999,999
}

function nocomma(num){ // get number from the comma seperated string
    return Number(num.replace(/,/g,""));
}

var operators = document.getElementsByClassName("operators"); // all operators
for(var i=0; i<operators.length;i++){
    operators[i].addEventListener("click",function(){ //an operator is clicked
        if(this.id == "clear"){ // to clear all
            printhistory(""); 
            printoutput("");
        }
        else if(this.id=="backspace"){ 
            var output = getoutput();
            output = String(nocomma(output));// string output with no commas
            output = output.substr(0,output.length - 1);// eliminated last char
            printoutput(output);
            /*var history = gethistory();
            history = history.substr(0,history.length - 1);
            printhistory(history);*/
        }
        else{  // for other operators
            var output = getoutput();
            var history = gethistory();
            if(output=="" && history!=""){ //for changing of operators
                if(isNaN(history[history.length -1])){
                   history = history.substr(0,history.length -1);
                }
            }
            if(output!="" || history!=""){ // if history and output are null then operator must not be entered or if output is null but not history it means change of operator
                output = output==""? output : String(nocomma(output)); // depending on the condition outout ="" or convert to no comma string
                history = history + output; 
                
                
                if(this.id =="="){ // for evaluation command
                    var result = eval(history);
                    printoutput(result);
                    printhistory("");
                }
                else{ // for operators other than clear, backspace and =
                    history = history + this.id; // add operator to history
                    printhistory(history);// update history
                    printoutput("") // set output to "" so that new no. can be written
                }
            }
        }
    });
}
var numbers = document.getElementsByClassName("numbers");
for(var i=0; i<numbers.length;i++){
    numbers[i].addEventListener("click",function(){
       var output = nocomma(getoutput());
       if (output!=NaN){
           output = output + this.id;
           printoutput(output);
       }
       
    });
}