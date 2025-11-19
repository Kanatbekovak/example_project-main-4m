const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')


const regExp = /\+996\s\d{3}\s\d{2}\-\d{2}\-\d{2}/;

phoneButton.onclick = () => {
  if(regExp.test(phoneInput.value)){
    phoneResult.innerHTML = 'cool';
    phoneResult.style.color = 'green';
  }else{
    phoneResult.innerHTML = "not cool";
    phoneResult.style.color = 'red';
  }
}

// 5!
// 5 * 4 * 3 * 2 * 1 = 120

let testNum = 5;

//

// const countTwo = () => {
//   testNum++;
//   console.log(testNum)
//   if(testNum<1200){
//     requestAnimationFrame(countTwo); //fps 
//   }
// }
// countTwo();



// let one = 123123;


// console.log(news.match(regExp));


const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabItemsContainer = document.querySelector('.tab_content_items');

const hideAllBlocks = () => {
  tabBlocks.forEach((block) => {
    block.style.display = 'none'
  })
  tabItems.forEach((tab) => {
    tab.classList.remove('tab_content_item_active');
  })
}

const showBlock = (index) => {
  tabBlocks[index].style.display = 'block';
  tabItems[index].classList.add('tab_content_item_active')
}

hideAllBlocks();
showBlock(0);

tabItemsContainer.onclick = (event) => {
  if(event.target.classList.contains('tab_content_item')){
    tabItems.forEach((tab, tabIndex) => {
      if(event.target === tab){
        hideAllBlocks();
        showBlock(tabIndex);
      }
    })
  }
}



const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (element, secondElement, thirdElement) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/converter.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onload = () => {
      const response = JSON.parse(request.response);

      if (element.id === 'som') {
        secondElement.value = (element.value / response.usd).toFixed(2); 
        thirdElement.value = (element.value / response.eur).toFixed(2);  
      } else if (element.id === 'usd') {
        secondElement.value = (element.value * response.usd).toFixed(2);
        thirdElement.value = ((element.value * response.usd) / response.eur).toFixed(2); 
      } else if (element.id === 'eur') {
        secondElement.value = (element.value * response.eur).toFixed(2); 
        thirdElement.value = ((element.value * response.eur) / response.usd).toFixed(2); 
      }
    };
  };
};


converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);





//promise - pending | fulfilled |rejected

// const promise = new Promise((resolve,rejected) => {
//   // throw new Error('error');
//   setTimeout(() => {
//     const user = {
//       name: "nignt",
//       desc: "moon is beautiful"
//     }
//     logger(user);
//     resolve();
//     // rejected();
//   },1300)
// }).then(() => {
//   // console.log(fulfilled); //выполнилось
//   return new Promise(() => {
//     setTimeout(() => {
//       const fruit = {
//         name: "mango",
//         desc: "delicious"
//       }
//       logger(fruit);
//       resolve()
//     },1300)
//   })
// }, () => {
//   console.log(rejected);//не выполнилось
// }).then(()=> {
//   console.log(success);
  
// }, () => {
//   console.log(error);
  
// })


// const btnPrev = document.querySelector("#btn-prev");
// const btnNext = document.querySelector("#btn-next");
// const card = document.querySelector(".card");

// let todoID = 1;

// btnNext.onclick = () => {
//   todoID++;
//   fetch(`https://jsonplaceholder.typicode.com/todos/${todoID}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
      
//       card.innerHTML = `
//         <p>${data.id}</p>
//         <p>${data.title}</p>
//         <p>${data.completed}</p>
//       `;
//     });
// };

const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const card = document.querySelector(".card");

let todoID = 1;

const Todo = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      card.innerHTML = `
        <p>${data.id}</p>
        <p>${data.title}</p>
        <p>${data.completed}</p>
      `;
    });
}


btnNext.onclick = () => {
  todoID++;
  if (todoID > 200) todoID = 1;
  Todo(todoID);
};

btnPrev.onclick = () => {
  todoID--;
  if (todoID < 1) todoID = 200;
  Todo(todoID);
};

Todo(todoID);


fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });