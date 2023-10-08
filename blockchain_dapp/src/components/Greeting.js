import { useState, useEffect } from "react";
import greetings from "../abi/greetings.json";
import Web3 from "web3";
export const Greetings = () => {
  const ethereum = window.ethereum;
  let web3 = window.web3;
  const [account, setaccount] = useState("");
  const [netId, setNetId] = useState();
  const [contract, setContract] = useState(null);
  let currentGreeting="";
  useEffect(() => {
    async function loadBlockchainData() {
      const accounts = await web3.eth.getAccounts();
      setaccount(accounts[0]);
    }

    async function loadWeb3() {
      if (ethereum) {
        web3 = new Web3(ethereum);
        await ethereum.enable();
        const x = await web3.eth.net.getId();
        setNetId(x);
        const networkData = greetings.networks[x];
        const _contract = new web3.eth.Contract(
          greetings.abi,
          networkData.address
        );
        setContract(_contract);
      } else if (web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert("Please use metamask");
      }
    }
    loadWeb3();
    loadBlockchainData();
  }, []);

    const [greeting,setGreeting] = useState("");

    const onChangeGreeting = (event) =>{
        setGreeting(event.target.value);
    }

    const handleSetGreeting = async(event) =>{
        event.preventDefault();
        if (web3 && contract && greeting) {
          try {
            //const gasEstimation = await contract.methods.setGreeting(greeting).estimateGas({ from: account });
            //console.log(gasEstimation)
            await contract.methods.setGreeting(greeting).send({ from: account});
            
          } catch (error) {
            console.error('Error setting greeting:', error);
          }
        }
        else if(!greeting){
          alert("Enter greeting");
          window.location.reload();
        }
        else{
          alert("Error occoured !")
        }
        
    }

    const handleFetchGreeting = async(event) =>{
      event.preventDefault();
        if (web3 && contract) {
          try {
            currentGreeting = await contract.methods.fetchGreeting().call();
            if(currentGreeting!="")
            {
              document.getElementById("displayGreeting").innerHTML=`Current Greeting: ${currentGreeting}`;
            }
            else{
              document.getElementById("displayGreeting").innerHTML="Set Greeting to view it !";
            }

            
          } catch (error) {
            console.error('Error setting greeting:', error);
          }
        }
        else{
          alert("Error occoured !")
        }
    }

  return (
    <>
      <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",width: "100vw",height: "100vh"}}>
        <p>Hello, Enter a Greeting</p>
        <div className="setGreetingContainer" style={{display:"flex",flexDirection:"column"}}>
            <input name="greeting" onChange={onChangeGreeting} placeholder="Enter Greeting"></input>
            <button onClick={handleSetGreeting}>Set Greeting</button>
        </div>
        <div className="fetchGreetingContainer">
          <button onClick={handleFetchGreeting}>Fetch Greeting</button>
        </div>
        <div id="displayGreeting"></div>
      </div>
    </>
  );
};
