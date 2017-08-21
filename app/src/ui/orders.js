window.onload=loadPage;
function checkCart(){
    var obj={},arg={};
    obj["type"]="select";
    arg["table"]="Cart_item";
    arg["columns"]=["*"];
    arg["where"]={"adv_id" : { "$eq" : hasura.user.id }};
    obj["args"]=arg;
    console.log(obj);
    hasura.data.query(obj, function onSuccess(result){
        if(result[0]){
            console.log("found"+result);
            return true;
        }
        else{
            console.log("no items in cart");
            return false;
        }
    },
    function onError(err){
        console.error(err);
        return false;
    }, hasura.user.roles[0]);
}
function checkOrder(){
    var obj={},arg={};
    obj["type"]="select";
    arg["table"]="Order";
    arg["columns"]=["*"];
    arg["where"]={"adv_id" : { "$eq" : hasura.user.id }};
    obj["args"]=arg;
    console.log(obj);
    hasura.data.query(obj, function onSuccess(result){
        if(result[0]){
            console.log(result);
            return true;
        }
        else{
            console.log("No result in Order table");
            return false;
        }
    },
    function onError(err){
        console.error(err);
        return false;
    }, hasura.user.roles[0]);
}
function loadPage(){
    checkCart();
    if(true){
        var pagecon=document.getElementById('pagecon');
        var container = document.createElement("div");
        container.className="container";
        var image = document.createElement("img");
        image.src="./images/back.jpg";
        image.style="width:90px;";
        var data = document.createTextNode("Cart Item 1");
        container.appendChild(image);
        container.appendChild(data);
        pagecon.appendChild(container);
    };
    checkOrder();
    document.getElementsByClassName('content')[0].style.display='block';
    document.getElementsByClassName('loading')[0].style.display='none';
}