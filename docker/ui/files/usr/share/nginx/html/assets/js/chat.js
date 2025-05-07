const faqString = `
**How can I expose the Ollama server?**

By default, Ollama allows cross origin requests from 127.0.0.1 and 0.0.0.0.

To support more origins, you can use the OLLAMA_ORIGINS environment variable:

\`\`\`
OLLAMA_ORIGINS=${window.location.origin} ollama serve
\`\`\`

Also see: https://github.com/jmorganca/ollama/blob/main/docs/faq.md
`;

var session_id="unknown";


const clipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>`
const feedbackUpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg>`

const feedbackDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
  <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
</svg>`

const speakIcon=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-down" viewBox="0 0 16 16">
  <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8"/>
</svg>`


const textBoxBaseHeight = 40;  // This should match the default height set in CSS

// change settings of marked from default to remove deprecation warnings
// see conversation here: https://github.com/markedjs/marked/issues/2793
marked.use({
  mangle: false,
  headerIds: false
});

query_locker=false;


function lock_query() {
  query_locker=true;
}

function unlock_query() {
  query_locker=false;
}

function autoFocusInput() {
  const userInput = document.getElementById('user-input');
  userInput.focus();
}

/*
takes in model as a string
updates the query parameters of page url to include model name
*/
function updateModelInQueryString(model) {
  // make sure browser supports features
  if (window.history.replaceState && 'URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("model", model);
    // replace current url without reload
    const newPathWithQuery = `${window.location.pathname}?${searchParams.toString()}`
    window.history.replaceState(null, '', newPathWithQuery);
  }
}

// Fetch available models and populate the dropdown
async function populateModels() {
  
  document.getElementById('send-button').addEventListener('click', submitRequest);

  try {
    const data = await getModels();

    const selectElement = document.getElementById('model-select');
    
    if(data.models.length > 1) {
      $("#model-select").removeClass('hidden');
    }

    // set up handler for selection
    selectElement.onchange = (() => updateModelInQueryString(selectElement.value));

    data.models.forEach((model) => {
      const option = document.createElement('option');
      option.value = model.name;
      option.innerText = model.name;
      selectElement.appendChild(option);
    });

    // select option present in url parameter if present
    const queryParams = new URLSearchParams(window.location.search);
    const requestedModel = queryParams.get('model');
    // update the selection based on if requestedModel is a value in options
    if ([...selectElement.options].map(o => o.value).includes(requestedModel)) {
      selectElement.value = requestedModel;
    }
    // otherwise set to the first element if exists and update URL accordingly
    else if (selectElement.options.length) {
      selectElement.value = selectElement.options[0].value;
      updateModelInQueryString(selectElement.value);
    }
/*
    $("#loader_page").addClass("hidden");
    $("#runner_page").removeClass("hidden");
    $("#runner_page").addClass("runner");
*/
    loading_done();    
  }
  catch (error) {
    // console.error(error);
    
    document.getElementById('errorText').innerHTML =
    DOMPurify.sanitize(marked.parse(
    `Ollama-ui was unable to communitcate with Ollama due to the following error:\n\n`
    + `\`\`\`${error.message}\`\`\`\n\n---------------------\n`
    + faqString));
    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
  }
}

// adjusts the padding at the bottom of scrollWrapper to be the height of the input box
function adjustPadding() {
  const inputBoxHeight = document.getElementById('input-area').offsetHeight;
  const scrollWrapper = document.getElementById('scroll-wrapper');
  scrollWrapper.style.paddingBottom = `${inputBoxHeight + 15}px`;
}

// sets up padding resize whenever input box has its height changed
const autoResizePadding = new ResizeObserver(() => {
  adjustPadding();
});
autoResizePadding.observe(document.getElementById('input-area'));



// Function to get the selected model
function getSelectedModel() {
  return document.getElementById('model-select').value;
}

// variables to handle auto-scroll
// we only need one ResizeObserver and isAutoScrollOn variable globally
// no need to make a new one for every time submitRequest is called
const scrollWrapper = document.getElementById('scroll-wrapper');
let isAutoScrollOn = true;
// autoscroll when new line is added
const autoScroller = new ResizeObserver(() => {
  if (isAutoScrollOn) {
    scrollWrapper.scrollIntoView({behavior: "smooth", block: "end"});
  }
});

// event listener for scrolling
let lastKnownScrollPosition = 0;
let ticking = false;
document.addEventListener("scroll", (event) => {
  // if user has scrolled up and autoScroll is on we turn it off
  if (!ticking && isAutoScrollOn && window.scrollY < lastKnownScrollPosition) {
    window.requestAnimationFrame(() => {
      isAutoScrollOn = false;
      ticking = false;
    });
    ticking = true;
  }
  // if user has scrolled nearly all the way down and autoScroll is disabled, re-enable
  else if (!ticking && !isAutoScrollOn &&
    window.scrollY > lastKnownScrollPosition && // make sure scroll direction is down
    window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 30 // add 30px of space--no need to scroll all the way down, just most of the way
  ) {
    window.requestAnimationFrame(() => {
      isAutoScrollOn = true;
      ticking = false;
    });
    ticking = true;
  }
  lastKnownScrollPosition = window.scrollY;
});


// Function to handle the user input and call the API functions
async function submitRequest() {
  if (query_locker) {
    return;
  }
  lock_query();
  
  document.getElementById('chat-container').style.display = 'block';

  const input = document.getElementById('user-input').value;

  const selectedModel = getSelectedModel();
  const context = document.getElementById('chat-history').context;
  //const systemPrompt = document.getElementById('system-prompt').value;
  const systemPrompt = "You are Rantanplan, an helpfull support agent";
  const data = { model: selectedModel, prompt: input, context: context, system: systemPrompt, session_id: session_id };

  // Create user message element and append to chat history
  let chatHistory = document.getElementById('chat-history');
  let userMessageDiv = document.createElement('div');
  userMessageDiv.className = 'mb-2 user-message';
  userMessageDiv.innerText = input;
  chatHistory.appendChild(userMessageDiv);

  // Create response container
  let responseDiv = document.createElement('div');
  let responseToolsDiv = document.createElement('div');

  responseDiv.className = 'response-message mb-2 text-start';
  responseDiv.style.minHeight = '3em'; // make sure div does not shrink if we cancel the request when no text has been generated yet
  spinner = document.createElement('div');
  spinner.className = 'spinner-border text-light';
  spinner.setAttribute('role', 'status');
  responseDiv.appendChild(spinner);
  chatHistory.appendChild(responseDiv);
  chatHistory.appendChild(responseToolsDiv);


  // create button to stop text generation
  let interrupt = new AbortController();
  let stopButton = document.createElement('button');
  stopButton.className = 'btn btn-danger';
  stopButton.innerHTML = 'Stop';
  stopButton.onclick = (e) => {
    e.preventDefault();
    interrupt.abort('Stop button pressed');
    unlock_query();
  }
  // add button after sendButton
  const sendButton = document.getElementById('send-button');
  sendButton.insertAdjacentElement('beforebegin', stopButton);

  // change autoScroller to keep track of our new responseDiv
  autoScroller.observe(responseDiv);

  postRequest(data, interrupt.signal)
    .then(async response => {
      await getResponse(response, parsedResponse => {
        let word = parsedResponse.response;
        if (parsedResponse.done) {

          // console.log(parsedResponse);
          unlock_query();
          chatHistory.context = parsedResponse.context;
          // Copy button
          let copyButton = document.createElement('button');
          copyButton.className = 'btn-2 btn-secondary';
          copyButton.innerHTML = clipboardIcon;
          copyButton.onclick = () => {
            navigator.clipboard.writeText(responseDiv.hidden_text).then(() => {
              console.log('Text copied to clipboard');
            }).catch(err => {
              console.error('Failed to copy text:', err);
            });
          };
          responseToolsDiv.appendChild(copyButton);

          let feedbackUp = document.createElement('button');
          let feedbackDown = document.createElement('button');

          feedbackUp.id="up_"+parsedResponse.query_id;
          feedbackDown.id="dn_"+parsedResponse.query_id;

          feedbackUp.className = 'btn-2 btn-secondary btn-feedback';
          feedbackDown.className = 'btn-2 btn-secondary btn-feedback';

          if (UI_DISPLAY_FEEDBACK == false) {
            feedbackUp.className += " hidden";
            feedbackDown.className += " hidden";
          }            

          feedbackUp.innerHTML = feedbackUpIcon;
          responseToolsDiv.appendChild(feedbackUp);
          
          feedbackDown.innerHTML = feedbackDownIcon;
          responseToolsDiv.appendChild(feedbackDown);

          if (UI_DISPLAY_FEEDBACK == true) {
            feedbackUp.onclick = () => {
              feedback_call("up",feedbackUp.id);
            };

            feedbackDown.onclick = () => {
              feedback_call("down",feedbackDown.id);
            };
          }
          let model_tag = document.createElement('button');
          model_tag.className = 'btn-model btn-secondary btn-feedback';
          if  ( $("#model-select").hasClass('hidden') ) {
            model_tag.className += " hidden";
          }
          
          model_tag.innerHTML = ""+parsedResponse.model;
          responseToolsDiv.appendChild(model_tag);

          let duration_tag = document.createElement('button');
          duration_tag.className = 'btn-model btn-secondary btn-feedback';
          
          duration = parseFloat(parsedResponse.total_duration).toFixed(1);          
          duration_tag.innerHTML=convertTime(duration);
          console.warn(convertTime(duration));

          responseToolsDiv.appendChild(duration_tag);

          /*
          let source_tag = document.createElement('button');
          source_tag.className = 'btn-2 btn-secondary btn-feedback';         

          if (UI_DISPLAY_SOURCE == false) {
            source_tag.className += " hidden";
          }
*/            

        }
        // add word to response
        if (word != undefined && word != "") {
          if (responseDiv.hidden_text == undefined){
            responseDiv.hidden_text = "";
          }
          responseDiv.hidden_text += word;
          responseDiv.innerHTML = DOMPurify.sanitize(marked.parse(responseDiv.hidden_text)); // Append word to response container
        }
      });
    })
    .then(() => {
      stopButton.remove(); // Remove stop button from DOM now that all text has been generated
      spinner.remove();
      unlock_query();
    })
    .catch(error => {
/*      if (error !== 'Stop button pressed') {
        console.error(error);
      }
*/        
      stopButton.remove();
      spinner.remove();
      unlock_query();
    });

  // Clear user input
  const element = document.getElementById('user-input');
  element.value = '';
  $(element).css("height", textBoxBaseHeight + "px");
}

// Event listener for Ctrl + Enter or CMD + Enter
document.getElementById('user-input').addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    submitRequest();
  }
});


window.onload = () => {
  
      
      
  updateChatList();
  populateModels();
  adjustPadding();
  autoFocusInput();

  document.getElementById("delete-chat").addEventListener("click", deleteChat);
  document.getElementById("new-chat").addEventListener("click", startNewChat);
  document.getElementById("saveName").addEventListener("click", saveChat);
  document.getElementById("chat-select").addEventListener("change", loadSelectedChat);
  document.getElementById("host-address").addEventListener("change", setHostAddress);
  document.getElementById("system-prompt").addEventListener("change", setSystemPrompt);
}

function deleteChat() {
  const selectedChat = document.getElementById("chat-select").value;
  localStorage.removeItem(selectedChat);
  updateChatList();
}

// Function to save chat with a unique name
function saveChat() {
  const chatName = document.getElementById('userName').value;

  // Close the modal
  const bootstrapModal = bootstrap.Modal.getInstance(document.getElementById('nameModal'));
  bootstrapModal.hide();

  if (chatName === null || chatName.trim() === "") return;
  const history = document.getElementById("chat-history").innerHTML;
  const context = document.getElementById('chat-history').context;
  const systemPrompt = document.getElementById('system-prompt').value;
  const model = getSelectedModel();
  localStorage.setItem(chatName, JSON.stringify({"history":history, "context":context, system: systemPrompt, "model": model,"session_id" : session_id }));
  updateChatList();
}

// Function to load selected chat from dropdown
function loadSelectedChat() {
  const selectedChat = document.getElementById("chat-select").value;
  const obj = JSON.parse(localStorage.getItem(selectedChat));
  document.getElementById("chat-history").innerHTML = obj.history;
  document.getElementById("chat-history").context = obj.context;
  document.getElementById("system-prompt").value = obj.system;
  updateModelInQueryString(obj.model)
  document.getElementById('chat-container').style.display = 'block';

  session_id=obj.session_id;
}

function startNewChat() {
    session_id = Date.now()

    document.getElementById("chat-history").innerHTML = null;
    document.getElementById("chat-history").context = null;
    document.getElementById('chat-container').style.display = 'none';
    updateChatList();
}

// Function to update chat list dropdown
function updateChatList() {
  const chatList = document.getElementById("chat-select");
  chatList.innerHTML = '<option value="" disabled selected>Select a chat</option>';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === "host-address" || key == "system-prompt") continue;
    const option = document.createElement("option");
    option.value = key;
    option.text = key;
    chatList.add(option);
  }
}

function autoGrow(element) {
    const maxHeight = 200;  // This should match the max-height set in CSS

    // Count the number of lines in the textarea based on newline characters
    const numberOfLines = $(element).val().split('\n').length;

    // Temporarily reset the height to auto to get the actual scrollHeight
    $(element).css("height", "auto");
    let newHeight = element.scrollHeight;

    // If content is one line, set the height to baseHeight
    if (numberOfLines === 1) {
        newHeight = textBoxBaseHeight;
    } else if (newHeight > maxHeight) {
        newHeight = maxHeight;
    }

    $(element).css("height", newHeight + "px");
}


function convertTime(nanoseconds) {
  if (nanoseconds < 1000000) {
      return nanoseconds + " ns";
  } else if (nanoseconds < 100000000) {
      var milliseconds = nanoseconds / 1000000;
      return milliseconds.toFixed(2) + " ms";
  } else {
      var seconds = nanoseconds / 1000000000;
      return seconds.toFixed(2) + " s";
  }
}