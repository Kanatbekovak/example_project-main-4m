const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");
const childBlock = document.querySelector(".child_block");

const regExpGmail = /[a-z0-9.]+@(gmail|mail|icloud|yahoo)\.com/i;

gmailButton.onclick = () => {
  if (regExpGmail.test(gmailInput.value)) {
    gmailResult.innerHTML = 'cool';
    gmailResult.style.color = 'green';
  } else {
    gmailResult.innerHTML = 'not cool';
    gmailResult.style.color = 'red';
  }
};


let arr = 0

const changeBlock = () => {
  arr++;
  childBlock.style.left = arr + "px";
  if(arr<449){
    requestAnimationFrame(changeBlock)
  }
}
changeBlock()







