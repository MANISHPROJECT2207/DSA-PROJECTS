// const rules = document.querySelector('#rules');
// let clickOnRulesButton = false;
// rules.addEventListener('click',()=>{
//     if(clickOnRulesButton === false){
//         clickOnRulesButton = true;
//         divElementFor_rule = document.createElement('div');
//     text = document.createTextNode(`
//     1.If you eat blue food than your direction is reversed and your size of snake will be same and snake speed will be decrease.<br/>
//     2.If you eat red food than your direction will remain same and snake speed will be increased.<br/>
//     3.Press Space baar to pause and resume the game.<br/>
//     4.Press volumn button to pause and resume the sound.<br/>
//     5.Blue food will start to come after score more than 10.<br/>
//     6.Happy Gaming!! Go and beat the High Score.<br/>
//     `)
//     divElementFor_rule.appendChild(text);
//     divElementFor_rule.style.backgroundColor = 'pink';
//     divElementFor_rule.style.color = 'white';
//     divElementFor_rule.style.fontSize = '10px';
//     divElementFor_rule.style.position = 'absolute';
//     // divElementFor_rule.style.top = '100px';
//     // divElementFor_rule.style.left = '200px';
//     divElementFor_rule.style.width = '200px'
//     // divElementFor_rule.style.align-items = center
//     toast("hello",5000)
    
//     rules.appendChild(divElementFor_rule);
//     }
//     else{
//         clickOnRulesButton = false;
//     }
    
// })

// if(clickOnRulesButton === true){
//     console.log("button clicked");
    
// }
// else{

// }

// const rules = document.querySelector('#rules')
// const alert = document.querySelector('.alert')
// const closeBtn = document.querySelector('.close-btn')

// rules.addEventListener('click',()=>{
//     alert.addClass("show");
//     alert.removeClass("hide");
//     alert.addClass("showAlert");
//     setTimeout(function () {
//         alert.removeClass("show");
//         alert.addClass("hide");
//     }, 1000000);
// });
// closeBtn.addEventListener('click',function () {
//     alert.removeClass("show");
//     alert.addClass("hide");
// });