var word_list = ["duck", "cow", "grapes"];

async function processWord(word) {
  var input = document.querySelector(".egoAttackPopup input[type='text']");
  console.log(input)
  var btns = document.querySelectorAll(".egoAttackPopup button");
  var btn = btns[2]
  
  input.value = word;
  btn.click();

  // Wait for the new chat item to appear
  await waitForNewChatItem(word);
}

async function processWords() {
  for (const word of word_list) {
    await processWord(word);
  }
}

async function waitForNewChatItem(word) {
  const chatContainer = document.querySelector(".egoChatContainer");
  const targetInnerText = "ReelyCoding";
  const lastChildWithText = getLastChildWithInnerText(chatContainer, targetInnerText);

  let timeout = 500; // Set a timeout value
  let maxTimeout = 10000; // Set a maximum timeout value (in milliseconds)

  while (!lastChildWithText.textContent.includes(word) && timeout <= maxTimeout) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
    console.log("Waiting for new chat item...");
    timeout += 500; // Increase the timeout value
  }

  if (!lastChildWithText.textContent.includes(word)) {
    console.log(`Word "${word}" is not allowed (timed out).`);
  } else {
    console.log(`Word "${word}" is allowed.`);
  }
}

function getLastChildWithInnerText(parentElement, targetInnerText) {
  const children = parentElement.children;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (child.innerText.includes(targetInnerText)) {
      return child;
    }
  }
  return null;
}

processWords();