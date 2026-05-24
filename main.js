 key_pressed = {};
( async () =>{
    var resp_api_stor = await browser.storage.local.get(["banned_dom"]);
    resp_api_stor = resp_api_stor.banned_dom;

if(resp_api_stor== null){
    await browser.storage.local.set({
        banned_dom:""
    });
    list = [];
}else{
        list = await browser.storage.local.get("banned_dom");
    list = list.banned_dom.split("|"); 
}

for(const nume of list){
    const act_url = document.URL;
    if((nume != "") && act_url.includes(nume) == true){
        window.location.href = "https://youtu.be/j0_fVzTJO-8?si=-yQPajBjvj_Dm4CM";
    }

}

//structura elementului de baza 
const save_box = document.createElement("div");
save_box.style.width = "400px";
save_box.style.zIndex = "999";
save_box.style.height = "600px";
save_box.style.position = "fixed";
save_box.style.right = "0px";
save_box.style.top = "0px";
save_box.style.backgroundColor = "blue";
save_box.style.display = "flex";
save_box.style.flexDirection = "column";

//structura elementului de input
const inp_element = document.createElement("div");
inp_element.style.height = "50px";
inp_element.style.width = " 100%";
inp_element.style.display = "flex"
save_box.appendChild(inp_element);
//input nume add
const inp_element_box = document.createElement("input");
inp_element_box.style.color = "black";
inp_element_box.style.fontSize = "30px";
inp_element_box.style.height = "100%";
inp_element_box.style.width = " 80%";
inp_element.appendChild(inp_element_box);
//buton add
const inp_element_btn = document.createElement("button");
inp_element_btn.style.height = "100%";
inp_element_btn.style.width = " 20%";
inp_element_btn.addEventListener("click" , async () =>{
    list.push(inp_element_box.value);
    await browser.storage.local.set({banned_dom:list.join("|")})
    afis_filters();
});
inp_element.appendChild(inp_element_btn);

//lista cuvint / URL banate
const lista_url = document.createElement("div");
lista_url.style.height = "550px";
lista_url.style.width = " 100%";
save_box.appendChild(lista_url);

//declarare elemente
function afis_filters(){
    lista_url.replaceChildren();
    let el_list= {};

    for (const el of list){
        //caseta link
        if(el != ""){
        el_list[el] = document.createElement("div");
        Object.assign(el_list[el].style, {
            width:"100%",
            height:"75px",
            border:"solid black 1px",
            display:"flex"

        });

        //nume link
        let a = document.createElement("div");
        Object.assign(a.style, {
            width:"70%",
            height:"100%"
        });
        a.innerText = el;
        el_list[el].appendChild(a);

        //btn link
        b = document.createElement("button");
        Object.assign(b.style, {
            width:"30%",
            height:"100%"
        });
        b.innerText = "DEL";
        b.addEventListener("click", async ()=>{
            list = list.filter( x => x !==el);
            await browser.storage.local.set({banned_dom:list.join("|")});
            lista_url.removeChild(el_list[el]);
            console.log(el);
            //afis_filters();
        })
        el_list[el].appendChild(b);


        lista_url.appendChild(el_list[el]);
        }
    }
}
afis_filters()

let save_box_s = false;
document.addEventListener("keydown", async (e)=>{
    key_pressed[e.key]= true;
    if(key_pressed['m'] && key_pressed['s']){
        list = await browser.storage.local.get(["banned_dom"]);
        list = list.banned_dom.split("|");
        if(!save_box_s){
            document.body.appendChild(save_box);
            save_box_s = true;
        }else{
            save_box_s = false;
            document.body.removeChild(save_box);
        }
    }
});

document.addEventListener("keyup", (e)=>{
    key_pressed[e.key] = false;
});
})();
