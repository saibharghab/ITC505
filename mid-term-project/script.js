// Define the story structure as an array of objects
const storyStages = {
    start: {
        text: "You find yourself at a crossroads in a mysterious forest. What will you do?",
        choices: [
            { text: "Go left", consequence: "leftPath" },
            { text: "Go right", consequence: "rightPath" }
        ],
        image: "https://www.shutterstock.com/image-photo/serene-sunlit-forest-lush-green-260nw-2498121253.jpg"
    },
    leftPath: {
        text: "You walk down the left path and encounter a strange creature. What will you do?",
        choices: [
            { text: "Talk to the creature", consequence: "talkCreature" },
            { text: "Run away", consequence: "runAway" }
        ],
        image: "https://cdn.pixabay.com/photo/2024/04/27/08/26/ai-generated-8723360_640.jpg"
    },
    rightPath: {
        text: "The right path takes you to a peaceful village. Do you want to explore?",
        choices: [
            { text: "Talk to the villagers", consequence: "talkVillagers" },
            { text: "Walk away", consequence: "walkAway" }
        ],
        image: "https://i.pinimg.com/550x/9a/80/aa/9a80aac5b38c602121738c7a42f46173.jpg"
    },
    // Add more stages for each path
    talkCreature: {
        text: "The creature seems friendly. It invites you to its home.",
        choices: [{ text: "Accept", consequence: "acceptCreature" }],
        image: "images/creature_home.jpg"
    },
    acceptCreature: {
        text: "The adventure ends here.",
        choices: [{ text: "restart", consequence: "start" }],
        image: "images/treasure.jpg"
    },
    runAway: {
        text: "Do you choose exit from the game?",
        choices: [{ text: "Yes", consequence: "start" },
        { text: "No", consequence: "leftPath" }
        ],
        image: "images/treasure.jpg"
    },
    talkVillagers: {
        text: "The Villagers are very friendly. It invites you to its home.",
        choices: [{ text: "Accept", consequence: "acceptvillagers" }],
        image: "images/creature_home.jpg"
    },
    acceptvillagers: {
        text: "The adventure ends here.",
        choices: [{ text: "restart", consequence: "start" }],
        image: "images/treasure.jpg"
    },
    walkAway: {
        text: "Do you choose exit from the game?",
        choices: [{ text: "Yes", consequence: "start" },
        { text: "No", consequence: "rightPath" }
        ],
        image: "images/treasure.jpg"
    },
    // Endings go here...
};

// Initialize the game state
let currentStage = "start";

// Function to start the game
function startGame() {
    currentStage = "start";
    updatePage();
}

// Function to update the page based on the current stage
function updatePage() {
    const stage = storyStages[currentStage];

    // Update story text
    document.getElementById("story-text").textContent = stage.text;

    // Update image
    document.getElementById("story-image").src = stage.image;

    // Clear any previous choices
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    // Create new choices
    stage.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            currentStage = choice.consequence;
            updatePage();
        };
        choicesContainer.appendChild(button);
    });

    // If there are no choices, display the end screen
    if (stage.choices.length === 0) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    document.getElementById("story-text").textContent = "The adventure ends here.";
    document.getElementById("choices-container").innerHTML = "";
    document.getElementById("story-image").src = "images/end.jpg";
}

// Start the game when the page loads
window.onload = startGame;
