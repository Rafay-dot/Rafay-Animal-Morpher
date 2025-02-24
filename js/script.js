document.addEventListener("DOMContentLoaded", function () {
  const upArrow = document.querySelector(".fa-chevron-up");
  const downArrow = document.querySelector(".fa-chevron-down");
  const leftArrow = document.querySelector(".fa-chevron-left");
  const rightArrow = document.querySelector(".fa-chevron-right");
  const pieceOptions = document.querySelectorAll("#pieceSelector h3");
  const animalChanger = document.getElementById("animalchanger");
  const animalContainer = document.querySelector(".animal-wrap-container");
  const animalHeading = document.querySelector(".animal-heading");
  function updateShards(count) {
    // Clear previous shards
    while (animalContainer.firstChild) {
      animalContainer.removeChild(animalContainer.firstChild);
    }

    const shards = [];

    for (let i = 0; i < count; i++) {
      const shard = document.createElement("div");
      shard.classList.add("shard-wrap");

      // Set random initial positions outside the container (before appending)
      const randomX = (Math.random() - 0.5) * 800; // Random X position
      const randomY = (Math.random() - 0.5) * 800; // Random Y position
      const randomRotation = (Math.random() - 0.5) * 360; // Random rotation

      gsap.set(shard, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        opacity: 0,
        scale: 0.5,
      });

      shards.push(shard);
    }

    // Append all shards to the DOM at once to prevent flickering
    requestAnimationFrame(() => {
      shards.forEach((shard) => animalContainer.appendChild(shard));

      // Faster animation (duration & stagger reduced)
      gsap.to(".shard-wrap", {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3, // 🔥 Faster transition
        stagger: 0.015, // 🔥 Less delay between shards
        ease: "power3.inOut",
      });
    });
  }
  function selectPiece(piece) {
    pieceOptions.forEach((option) => option.classList.remove("highlight"));
    piece.classList.add("highlight");

    if (piece.textContent.trim() === "30 Pieces") {
      animalChanger.classList.remove("bear", "fox");
      animalChanger.classList.add("oryx", "penguin");
      animalHeading.textContent = "Penguin - Made With 30 pieces";
      updateShards(30);
    } else {
      animalChanger.classList.remove("oryx", "penguin");
      animalChanger.classList.add("bear", "fox");
      animalHeading.textContent = "Fox - Made With 10 pieces";
      updateShards(10);
    }
  }
  function animalMorpher() {
    if (animalChanger.classList.contains("fox")) {
      animalChanger.classList.replace("fox", "bear");
      animalHeading.textContent = "Bear - Made With 10 pieces";
    } else if (animalChanger.classList.contains("bear")) {
      animalChanger.classList.replace("bear", "fox");
      animalHeading.textContent = "Fox - Made With 10 pieces";
    } else if (animalChanger.classList.contains("penguin")) {
      animalChanger.classList.replace("penguin", "oryx");
      animalHeading.textContent = "Oryx - Made With 30 pieces";
    } else {
      animalChanger.classList.replace("oryx", "penguin");
      animalHeading.textContent = "Penguin - Made With 30 pieces";
    }
  }
  // Event Listeners for text clicks
  pieceOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectPiece(this);
    });
  });

  // Event Listeners for arrows
  upArrow.addEventListener("click", function () {
    selectPiece(pieceOptions[0]);
  });
  downArrow.addEventListener("click", function () {
    selectPiece(pieceOptions[1]);
  });
  leftArrow.addEventListener("click", function () {
    animalMorpher();
  });
  rightArrow.addEventListener("click", function () {
    animalMorpher();
  });
  animalChanger.addEventListener("click", () => {
    animalMorpher();
  });
});
