var successMsgIn = document.getElementById('success-msg-in');
var errorMsgIn = document.getElementById('error-msg-in');
var snackbar =document.getElementById('snackbar');
var cartButtons = document.getElementsByClassName('cart');
var err =document.getElementById("err");
function isPackageInCart(pckid,qty,callback){
    var obj={},arg={};
    obj["type"]="select";
    arg["table"]="Cart_item";
    arg["columns"]=["package_id"];
    arg["where"]={"$and":[{"adv_id" : { "$eq" : hasura.user.id }},
                       {"package_id" : { "$eq" : pckid }}]};
    arg["limit"]=1;
    obj["args"]=arg;
    console.log(obj);
    hasura.data.query(obj, function onSuccess(result){
        if(result[0]){
            console.log(result[0]);
            snackbar.innerHTML="Package already in cart!";
            snackbarShow();
        }
        else{
            console.error("Not found in cart. You can add it now.");
            callback(pckid,qty);
        }
    },
    function onError(err){
        console.error(err);
    }, hasura.user.roles[0]);
}
function checkAdv(){
    var obj={},arg={};
    obj["type"]="select";
    arg["table"]="Advertiser";
    arg["columns"]=["id"];
    arg["where"]={"id" : { "$eq" : hasura.user.id }};
    arg["limit"]=1;
    obj["args"]=arg;
    console.log(obj);
    hasura.data.query(obj, function onSuccess(result){
        if(result[0]){
            console.log(result[0]);
        }
        else{
            window.location='/ui/advertiseform.html';
        }
    },
    function onError(err){
        console.error(err);
    }, hasura.user.roles[0]);
}

function addToCart(item){
    var package = item.parentElement;
    var ip = package.getElementsByTagName("input");
    var id = package.getElementsByClassName("pid")[0].innerHTML;
    var qty=ip[0].value;
    if(hasura.user.token==null){
        document.getElementById('id01').style.display='block';
        successMsgIn.innerHTML="Please sign in to add items to cart";
        successMsgIn.style.display='block';
        return;
    }
    checkAdv();
    isPackageInCart(parseInt(id),qty,insertCart);
}
function insertCart(pckid,qty){
    if(qty!="" && qty>=1 && qty<=100){
        var obj={},arg={};
        obj["type"]="insert";
        arg["table"]="Cart_item";
        arg["objects"]=[{"adv_id":hasura.user.id,
                         "package_id":pckid,
                         "quantity":qty
                        }];
        obj["args"]=arg;
        obj["returning"]="id";
        console.log(obj);
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
            window.location='/ui/user.html';
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