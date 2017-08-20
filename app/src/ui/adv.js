var successMsgIn = document.getElementById('success-msg-in');
var errorMsgIn = document.getElementById('error-msg-in');
var snackbar =document.getElementById('snackbar');
var cartButtons = document.getElementsByClassName('cart');
function addToCart(item){
    var package = item.parentElement;
    var ip = package.getElementsByTagName("input");
    var id = package.getElementsByClassName("pid")[0].innerHTML;
    if(hasura.user.token==null){
        document.getElementById('id01').style.display='block';
        successMsgIn.innerHTML="Please sign in to add items to cart";
        successMsgIn.style.display='block';
        return;
    }
    if(ip[0].value!="" && ip[0].value>=1 && ip[0].value<=100){
        /*if(hasura.user.token==null){
            snackbar.innerHTML="Please sign in to add items to cart";
            snackbarShow();
            document.getElementById('id01').style.display('block');
        }*/
        var obj={},arg={};
        obj["type"]="insert";
        arg["table"]="Cart_item";
        arg["objects"]=[{"adv_id":hasura.user.id,
                         "package_id":id,
                         "quantity":parseInt(ip[0].value)
                        }];
        obj["args"]=arg;
        obj["returning"]="id";
        //console.log(JSON.stringify(obj));
        console.log(obj);
        //var query = JSON.stringify(obj);
        hasura.data.query(obj, function onSuccess(result){
            console.log(result);
            snackbar.innerHTML="Added to cart";
            snackbarShow();
        },
        function onError(err){
            console.error(err);
            snackbar.innerHTML="Error:" + err.message;
            snackbarShow();
        }, hasura.user.roles[0]);
    }else{
        snackbar.innerHTML="Please enter correct quantity (1 to 100)";
        snackbarShow();
    }
}
function advertise(){
    if(hasura.user.token==null){
        document.getElementById("id01").style.display='block';
        successMsgIn.innerHTML="Please sign in to advertise";
        successMsgIn.style.display='block';
        return;
    }
    var obj={},arg={};
    obj["type"]="select";
    arg["table"]="Cart_item";
    arg["columns"]=["package_id"];
    arg["where"]={"adv_id" : { "$eq" : hasura.user.id }};
    arg["limit"]=1;
    obj["args"]=arg;
    console.log(obj);
    hasura.data.query(obj, function onSuccess(result){
        if(result[0]){
            window.location='/ui/advertiseform.html';
            console.log(result[0]);}
        else{
            snackbar.innerHTML="Add items to cart to place advertisements";
            snackbarShow();
        }
    },
    function onError(err){
        console.error(err);
    }, hasura.user.roles[0]);

}