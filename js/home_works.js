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


// let arr = 0

// const changeBlock = () => {
//   arr++;
//   childBlock.style.left = `${arr}px`;
//   if(arr<449 ){
//     requestAnimationFrame(changeBlock)
//   }
// }
// changeBlock()


const parentBlock = document.querySelector('.parent_block');

let x = 0;
let y = 0;
let side = 0;

const moveBlock = () => {
  const maxX = parentBlock.clientWidth - childBlock.offsetWidth;
  const maxY = parentBlock.clientHeight - childBlock.offsetHeight;

  if(side === 0) x++;
  else if(side === 1) y++;
  else if(side === 2) x--;
  else if(side === 3) y--;

  childBlock.style.left = x + 'px';
  childBlock.style.top = y + 'px';

  if(side === 0 && x >= maxX) side = 1;
  else if(side === 1 && y >= maxY) side = 2;
  else if(side === 2 && x <= 0) side = 3;
  else if(side === 3 && y <= 0) side = 0;

  requestAnimationFrame(moveBlock);
};

moveBlock();





const added = () => {
  const photos = document.querySelectorAll(".character-card .character-photo");
  const picture = 3;
  let index = 0;

  const showPhotos = () => {
    photos.forEach(photo => photo.style.display = "none");

    for (let i = 0; i < picture; i++) {
      const photoIndex = (index + i) % photos.length;
      photos[photoIndex].style.display = "block";
    }

    index = (index + picture) % photos.length;
  };

  showPhotos();

  setInterval(showPhotos, 5000);
};

added();


//////////

const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal_close');

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

closeButton.addEventListener('click', closeModal);

const modalTimerId = setTimeout(openModal, 5000);


function scrollHandler() {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    openModal();
    clearTimeout(modalTimerId);
    window.removeEventListener('scroll', scrollHandler);
  }
}

window.addEventListener('scroll', scrollHandler);


//////////

setTimeout(openModal, 10000);

