var snackbar =document.getElementById('snackbar');
var cartButtons = document.getElementsByClassName('cart');
function addCart(item){
    var package = item.parentElement;
    var ip = package.getElementsByTagName("input");
    var id = package.getElementsByClassName("pid")[0].innerHTML;
    if(ip[0].value!="" && ip[0].value>=1 && ip[0].value<=100){
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
        },
        function onError(err){
            console.error(err);
        }, hasura.user.roles[0]);
    }else{
        snackbar.innerHTML="Please enter correct quantity";
        snackbarShow();
    }
}