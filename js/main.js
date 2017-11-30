let btn = document.getElementById("btnSend");
btn.addEventListener ("click", genNum);

let pages=document.querySelectorAll(".page");

function genNum(ev){
    ev.preventDefault();
    console.log("button clicked");
    let check = false;
    
    
    let uri = "http://localhost/mad9014-lotto/nums.php";
    
    let digits = document.querySelector("#digits").value;
    let max=document.querySelector("#max").value;
    
    let data=new URLSearchParams();
    data.append("digits",digits);
    data.append("max",max);
    // max should be always greater than digits to control duplicate
    if (!max || !digits) {
        alert('Please insert your numbers');
        return false;
        
    } else if (max <= digits) {
        alert('Oops!  Max range should be greater than digits');
        return false;
    } 
  
    
    let req = new Request( uri, {
        method:'POST', 
        body: data
    });
    fetch(req).then((response)=>{
          return response.json();
          }).then((jsonData)=>{
        console.log(jsonData, jsonData.numbers.length);
        
        // check for duplicate
        
        let myList = [];

        for (let item of jsonData.numbers){
            if(!myList.includes(item)){
                myList.push(item);
            } else {
                genNum(ev);
                check = true;
                break;
            }
        }
        
        if (check) {
            return;
        }
          document.getElementById("home").classList.remove('active');
          document.getElementById("list").classList.add('active');

          jsonData.numbers.forEach((item)=>{
              let list = document.createElement("li");
              list.textContent=item;
              console.log(list);
              document.querySelector(".main ul.num_list").appendChild(list);
              //console.log(a);
            
        })
    })

    
};
    document.getElementById("btnBack").addEventListener("click",startAgain)
    function startAgain() {
        document.getElementById("list").classList.remove('active');
          let nList = document.querySelector(".main ul.num_list");
    
              nList.textContent="";
         document.getElementById("home").classList.add('active');
        
    }


