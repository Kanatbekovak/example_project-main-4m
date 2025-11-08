const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");
const childBlock = document.querySelector(".child_block");
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonReset = document.getElementById("reset");
const intervalSecond = document.getElementById("seconds");


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

//dz1 


let arr = 0;

function changeBlockleft() {
  const change = setInterval(() => {
    arr++;
    childBlock.style.left = `${arr}px`;
    if (arr >= 449) {
      clearInterval(change);
      arr = 0;
      changeBlockbottom(); 
    }
  }, 10);
}


function changeBlockbottom() {
  const change = setInterval(() => {
    arr++;
    childBlock.style.top = `${arr}px`;
    if (arr >= 449) {
      clearInterval(change);
      arr = 449;
      changeBlockright();
    }
  }, 10);
}


function changeBlockright() {
  const change = setInterval(() => {
    arr--;
    childBlock.style.left = `${arr}px`;
    if (arr <= 0) {
      clearInterval(change);
      arr = 449;
      changeBlocktop();
    }
  }, 10);
}


function changeBlocktop() {
  const change = setInterval(() => {
    arr--;
    childBlock.style.top = `${arr}px`;
    if (arr <= 0) {
      clearInterval(change);
      arr = 0;
      changeBlockleft();
    }
  }, 10);
}


changeBlockleft();


//dz2

let intervalid = null;

buttonStart.addEventListener("click", () => {
  if(intervalid) return;
  intervalid = setInterval(() => {
    let value = Number (intervalSecond.innerText);
    value++;
    intervalSecond.innerText = value;
  },5)
})

buttonReset.addEventListener("click", () => {
  clearInterval(intervalid);
  intervalid = null;
  intervalSecond.innerText = "0"
  },5)


buttonStop.addEventListener("click", () => {
  clearInterval(intervalid);
  intervalid = null;
})


//////////////dz3


const characters = [
  {
    name: 'Alina',
    age: 16,
    image: "https://cdn-icons-png.flaticon.com/256/11565/11565158.png",
  },
  {
    name: 'Bruno',
    age: 26,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565162.png",
  },
  {
    name: 'Kaniet',
    age: 18,
    // image:"https://cdn-icons-png.flaticon.com/256/11565/11565146.png",
  },
  {
    name: 'Lina',
    age: 50,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565108.png",
  },
  {
    name: 'Milana',
    age: 6,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565114.png",
  },
  {
    name: 'Rustam',
    age: 41,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565136.png",
  },
  {
    name: 'Nuraman',
    age: 13,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565113.png",
  },
  {
    name: 'Tina',
    age: 37,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565138.png",
  },
  {
    name: 'Jun',
    age: 79,
    image:"https://cdn-icons-png.flaticon.com/256/11565/11565143.png",
  }
]



const defaultImg = "https://www.svgrepo.com/show/452030/avatar-default.svg"


const charactersList = document.querySelector(".characters-list");

characters.forEach((character) => {
  const characterCard = document.createElement("div");
  characterCard.setAttribute("class", "character-card");

  characterCard.innerHTML = `
    <div class="character-photo">
      <img src="${character.image ?? defaultImg}" alt="${character.name}">
    </div>
    <p><strong>${character.name}</strong></p>
    <p>Age: ${character.age}</p>
  `;

  charactersList.appendChild(characterCard);
});


const added = () => {
  const photos = document.querySelectorAll(".character-card");
  const picture = 3;
  let index = 0;
  const showPhotos = () => {
    photos.forEach(photo => photo.style.display = "none");

    for (let i = index; i < index + picture && i < photos.length; i++) {
      photos[i].style.display = "block";
    }
    index += picture;

    if (index >= photos.length) {
      index = 0;
    }
  }
  showPhotos();

  setInterval(showPhotos, 5000);
};

added();


// //////////

const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal_close');
const btnOpen = document.querySelector("#btn-get");


openModal = () => {
  modal.style.display= "block";
  document.body.style.overflow = "hidden"
}


closeModal = () => {
  modal.style.display = "none"
  document.body.style.overflow = ""
}

btnOpen.addEventListener('click',() => {
  openModal();
});

closeButton.addEventListener('click',() => {
  closeModal();
});

modal.addEventListener("click", (event) => {
  if(event.target === modal) {
    closeModal();
  }
})

let open = false;
let modalBtn = false;
let scrollEnd = false;
let counter;

const scroll = () => {
    if (!open && !modalBtn && !scrollEnd) {
        if (window.pageYOffset > 1000) {
            setTimeout(() => {
                openModal()
            }, 1000);
        }    
    }
}

window.addEventListener('scroll', scroll);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !scrollEnd) {
        scrollEnd = true;
        clearTimeout(counter);
        if (!modalBtn && !scroll) {
            counter = setTimeout(() => {
                openModal();
            }, 10000);
        }
    } else if (!scrollEnd) {
        clearTimeout(counter); 
    }
});

counter = setTimeout(() => {
    if (!modalBtn && !scrollEnd) {
        openModal();
    }
}, 10000);


