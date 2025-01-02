////////////////////////////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
write an async function 'loadNPause' that recreates Coding-Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more. Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Netwrok tab!
*/

const createImage = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    // img.setAttribute("src", imgPath); // OR set the src attribute directly:
    img.src = imgPath;
    // console.log(img.getAttribute("src")); // OR Log the image source directly:
    console.log(img.src); // Log the image source

    img.addEventListener("load", () => {
      // img.classList.add("images"); This is false, because images is parent and we can not add img as child to the parent!

      document.querySelector(".images").appendChild(img); // Append to the DOM
      // After appending, this is what is forming is HTML:
      /* 
      <div class="images">
          <img src="" alt=""> // img is Child of the div element with images class which is appended to that!
      </div>
      */

      // img.classList.add("images").appendChild(img); // Append to the DOM -- This is false too because of the same above reason!

      // load event means loading the image was successful and we have to mark it as a successfull Promise using resolve(img)
      resolve(img); // Resolve the promise with the image element
    });

    img.addEventListener("error", (err) => {
      reject(new Error("Image failed to load: " + err.message)); // Reject the promise on error
    });
    // (img) => resolve(img);
    // (err) => reject(err);
  });
};

const wait = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

//////////// CHAT GPT ANSWER ///////////////////////
// let currentImg; // we need a global variable here!

// createImage("./img/img-1.jpg")
//   .then((img) => {
//     currentImg = img; // to hide it in the next step!
//     console.log("Image 1 loaded!");
//     return wait(2);
//   })
//   // wait() doesn't resolve anything, it means it doesn't return anything, therefore, we don't have any parameter for callback function in then() below!
//   .then(() => {
//     // We don't have any access to the img parameter here, that's why we use a global variable for that => currentImg
//     currentImg.style.display = "none"; // hide the first image
//     return createImage("./img/img-2.jpg"); // return a new promise which is img and we receive this img below at the next then()!
//   })
//   .then((img) => {
//     currentImg = img; // to hide it in the next step!
//     console.log("Image 2 loaded!");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none"; // hide the second image
//     return createImage("./img/img-3.jpg");
//   })
//   .then((img) => {
//     currentImg = img; // to hide it in the next step!
//     console.log("Image 3 loaded!");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none"; // hide the third image
//   })
//   .catch((err) => {
//     console.error("Error loading image:", err.message);
//   });
//////////// CHAT GPT ANSWER ///////////////////////

let currentImg; // we need a global variable here!

const loadNPause = async () => {
  try {
    const img1 = await createImage("./img/img-1.jpg");
    currentImg = img1; // to hide it in the next step!
    console.log("Image 1 loaded!");
    wait(2);

    currentImg.style.display = "none"; // hide the first image
    const img2 = await createImage("./img/img-2.jpg"); // return a new promise which is img and
    currentImg = img2; // to hide it in the next step!
    console.log("Image 2 loaded!");
    wait(2);

    currentImg.style.display = "none"; // hide the second image
    const img3 = await createImage("./img/img-3.jpg");

    currentImg = img3; // to hide it in the next step!
    console.log("Image 3 loaded!");
    wait(2);

    currentImg.style.display = "none"; // hide the third image
  } catch (err) {
    console.log(err.message);
  }
};

loadNPause();
