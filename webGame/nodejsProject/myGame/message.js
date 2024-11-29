//variable in ES 5
var x=1;
var isClicked=true;

//variable in ES 6
let i=0;
const name="Ethan";
const age="78";



//ES 5
function fname(){
    alert("this is a fuction");
}

//ES 6
const message=() =>{
    const stringname ="this is a test: ";
    return stringname + name;
}

export{name, age};
export default message;