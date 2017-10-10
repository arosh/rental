pragma solidity ^0.4.17;

contract Greeter {
    string public message;
    
    event greetEvent(string _message);

    function Greeter(string _message) public {
        message = _message;
    }
    
    function setMessage(string _message) public {
        message = _message;
        greetEvent(_message);
    }
    
    function greet() public {
        greetEvent(message);
    }
}
