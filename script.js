const gallery = [
  // {
  //   alt: "Rhyzobius forestieri: a dark fuzzy ladybird on a leaf",
  //   src: "https://inaturalist-open-data.s3.amazonaws.com/photos/313389084/original.jpeg",
  // },
  // {
  //   alt: "22-Spot Ladybird: a yellow ladybird with black spots, on a leaf",
  //   src: "https://inaturalist-open-data.s3.amazonaws.com/photos/226247594/original.jpeg",
  // },
  // {
  //   alt: "Cream-streaked Ladybird: a ladybird with faint cream-coloured markings, on tree bark",
  //   src: "https://inaturalist-open-data.s3.amazonaws.com/photos/184661548/original.jpeg",
  // },
  // {
  //   alt: "Cream-spot Ladybird: a brick-red ladybird with big white spots",
  //   src: "https://inaturalist-open-data.s3.amazonaws.com/photos/224588441/original.jpeg",
  // },

  {
    src: "https://inaturalist-open-data.s3.amazonaws.com/photos/137774749/original.jpeg",
    srcset: "",
    alt: "Buff-tailed Bumblebee",
    pos: 1,
  },
  {
    src: "https://inaturalist-open-data.s3.amazonaws.com/photos/137796702/original.jpeg",
    alt: "Tree Bumblebee",
    pos: 2,
  },
  {
    src: "https://inaturalist-open-data.s3.amazonaws.com/photos/137102484/original.jpeg",
    alt: "Early Bumblebee",
    pos: 3,
  },
  {
    src: "https://inaturalist-open-data.s3.amazonaws.com/photos/137760454/original.jpeg",
    alt: "Garden Bumblebee",
    pos: 4,
  },
];

const bigImage = document.querySelector(".big-image");
const menu = document.querySelector(".menu");
buildMenu(gallery);

let nextElement;
// change pictures with arrow keys
document.body.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (bigImage.hasAttribute("pos")) {
      nextElement = gallery.find(
        (element) => element.pos == bigImage.getAttribute("pos") - 1
      );
      if (nextElement != undefined) {
        setImageAttributes(bigImage, nextElement);
        document.getElementById(`menu-button-${nextElement.pos}`).focus();
      }
      event.preventDefault();
    }
  } else if (event.key === "ArrowRight") {
    // console.log("right arrow pressed");
    if (bigImage.hasAttribute("pos")) {
      console.log(bigImage.getAttribute("pos"));
      // this bit tripped me up for ages because it was the same code as the left arrow version, but it wasn't working because "+" was concatenating instead of adding
      let nextPos = Number(bigImage.getAttribute("pos")) + 1;
      nextElement = gallery.find((element) => element.pos == nextPos);
      console.log(nextElement);
      if (nextElement != undefined) {
        setImageAttributes(bigImage, nextElement);
        document.getElementById(`menu-button-${nextElement.pos}`).focus();
      }
      event.preventDefault();
    }
  }
});

// creates a new image element with a given set of attributes
function createImageWithAttributes(imageObject) {
  let newImage = document.createElement("img");
  newImage = setImageAttributes(newImage, imageObject);
  console.log(newImage);
  return newImage; // img element
}

function buildMenu(imagesArray) {
  let newButton;
  let newImage;
  let counter = 0;
  // for each image in the gallery, make a new button with a new img element inside
  imagesArray.forEach((imageObject) => {
    newButton = document.createElement("button");
    newButton.setAttribute("tabindex", "0");
    newImage = createImageWithAttributes(imageObject);
    // on click or enter, set the big image to the
    newButton.addEventListener("click", function () {
      setImageAttributes(bigImage, imageObject);
    });
    newButton.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        setImageAttributes(bigImage, imageObject);
        event.preventDefault();
      }
    });
    newButton.id = `menu-button-${imageObject.pos}`;
    newButton.appendChild(newImage);
    menu.appendChild(newButton);
  });
}

// Set any amount of attributes on an img tag.
// equivalent to:
// newImage.setAttribute("alt", image.alt);
// newImage.setAttribute("src", image.src);
// etc...
// "for in" loop because I need to access the names of the keys and forEach isn't available for objects (?)
function setImageAttributes(element, imageAttributes) {
  let outputElement = element;
  for (property in imageAttributes) {
    outputElement.setAttribute(property, imageAttributes[property]);
  }
  return outputElement;
}
