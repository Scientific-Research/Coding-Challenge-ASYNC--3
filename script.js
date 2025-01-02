////////////////////////////////////////////////////////////
// Coding Challenge #3
const imgContainer = document.querySelector(".images");

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

let currentImg; // we need a global variable here!

// Using async, await and IIFE instead of .then() method in the following PART which consumes the Promise:
////////////////////////////////////////////////////////////////
(async () => {
  try {
    // NOTE: we don't need to define different img1,img2,img3 and also currentImg variables because we are only in one block which is try{} catch block(). When we use .then() we are in several blocks, that's why we have to use different varibales and a global variable to make a connection between all these variables!

    // currentImg = img1; // to hide it in the next step!
    // currentImg = img2; // to hide it in the next step!
    // currentImg = img3; // to hide it in the next step!

    // Load image 1
    let img = await createImage("./img/img-1.jpg");
    console.log("Image 1 loaded!");
    await wait(2);
    img.style.display = "none"; // hide the first image

    // Load image 2
    img = await createImage("./img/img-2.jpg"); // return a new promise which is img and
    console.log("Image 2 loaded!");
    await wait(2);
    img.style.display = "none"; // hide the second image

    // Load image 3
    img = await createImage("./img/img-3.jpg");
    console.log("Image 3 loaded!");
    await wait(2);
    img.style.display = "none"; // hide the third image
  } catch (err) {
    // console.error(err.message);
    throw new Error(`Image failed to load!`);
  }
})();
////////////////////////////////////////////////////////////////

/* 
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';

2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function!

GOOD LUCK 😀
*/

const loadAll = async (imgArr) => {
  try {
    // Promise.all get an array as input and return a new promise array as output -- we call the output array as imgs

    // When one Promise in Promise.all rejects, rejects all promises, therefore, the promise.all is short-circuit of the Promises!
    const imgs = await Promise.all(imgArr.map((imgci) => createImage(imgci)));
    console.log(imgs);

    // and we use forEach() loop to loop over the images and add classList('parallel) to them to have a very beautiful apperance on the page!
    imgs.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};

imgs = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];
loadAll(imgs);
