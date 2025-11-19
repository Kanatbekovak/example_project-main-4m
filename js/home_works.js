const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");
const childBlock = document.querySelector(".child_block");
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonReset = document.getElementById("reset");
const intervalSecond = document.getElementById("seconds");

// Gmail validation
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

// dz1 - Block movement
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

// dz2 - Timer
let intervalid = null;

buttonStart.addEventListener("click", () => {
  if(intervalid) return;
  intervalid = setInterval(() => {
    let value = Number(intervalSecond.innerText);
    value++;
    intervalSecond.innerText = value;
  }, 5);
});

buttonReset.addEventListener("click", () => {
  clearInterval(intervalid);
  intervalid = null;
  intervalSecond.innerText = "0";
});

buttonStop.addEventListener("click", () => {
  clearInterval(intervalid);
  intervalid = null;
});

// dz3 - Characters with fetch and async/await
const defaultImg = "https://www.svgrepo.com/show/452030/avatar-default.svg";
const charactersList = document.querySelector(".characters-list");

// Функция для загрузки персонажей с использованием fetch и async/await
async function loadCharacters() {
  try {
    const response = await fetch('../data/characters.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const characters = await response.json();
    renderCharacters(characters);
    added();
    
  } catch (error) {
    console.error('Error loading characters:', error);
    charactersList.innerHTML = '<p>Error loading characters data</p>';
  }
}

// Функция для отрисовки персонажей
function renderCharacters(characters) {
  charactersList.innerHTML = '';
  
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
}

// Функция для карусели
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

// Загружаем персонажей при загрузке страницы
loadCharacters();

// Modal functionality
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal_close');
const btnOpen = document.querySelector("#btn-get");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

btnOpen.addEventListener('click', () => {
  openModal();
});

closeButton.addEventListener('click', () => {
  closeModal();
});

modal.addEventListener("click", (event) => {
  if(event.target === modal) {
    closeModal();
  }
});

let open = false;
let modalBtn = false;
let scrollEnd = false;
let counter;

const scroll = () => {
  if (!open && !modalBtn && !scrollEnd) {
    if (window.pageYOffset > 1000) {
      setTimeout(() => {
        openModal();
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

// Converter with fetch and async/await
const somInput = document.getElementById("som_input");
const usdInput = document.getElementById("usd_input");

// Функция для загрузки курсов валют
async function loadExchangeRates() {
  try {
    const response = await fetch('../data/convertor.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rates = await response.json();
    return rates;
    
  } catch (error) {
    console.error('Error loading exchange rates:', error);
    return null;
  }
}

// Обработчики для конвертера
somInput.oninput = async () => {
  try {
    const rates = await loadExchangeRates();
    if (rates && rates.usd) {
      usdInput.value = (somInput.value / rates.usd).toFixed(2);
    }
  } catch (error) {
    console.error('Error converting currency:', error);
  }
};

usdInput.oninput = async () => {
  try {
    const rates = await loadExchangeRates();
    if (rates && rates.usd) {
      somInput.value = (usdInput.value * rates.usd).toFixed(2);
    }
  } catch (error) {
    console.error('Error converting currency:', error);
  }
};
