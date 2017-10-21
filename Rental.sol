pragma solidity ^0.4.17;

contract Rental {
    struct Item {
        address owner;
        string name;
    }
    
    enum RequestState {
        Pending, Canceled, Accepted
    }
    
    struct Request {
        address client;
        uint itemId;
        uint fee;
        string start;
        string end;
        RequestState state;
    }
    
    Item[] public items;
    Request[] public requests;
    
    function getItemsLength() public constant returns (uint) {
        return items.length;
    }
    
    function getRequestsLength() public constant returns (uint) {
        return requests.length;
    }
    
    function addItem(string _name) public returns (uint) {
        Item memory newItem = Item({
          owner: msg.sender,
          name: _name
        });
        return items.push(newItem) - 1;
    }
    
    function addRequest(uint _itemId, string _start, string _end) public payable returns (uint) {
        Request memory newRequest = Request({
           client: msg.sender,
           itemId: _itemId,
           fee: msg.value,
           start: _start,
           end: _end,
           state: RequestState.Pending
        });
        return requests.push(newRequest) - 1;
    }
    
    function cancelRequest(uint _requestId) public {
        Request storage req = requests[_requestId];
        require(req.client == msg.sender);
        require(req.state == RequestState.Pending);
        msg.sender.transfer(req.fee);
        req.state = RequestState.Canceled;
    }
    
    function acceptRequest(uint _requestId) public {
        Request storage req = requests[_requestId];
        require(req.state == RequestState.Pending);
        Item storage item = items[req.itemId];
        require(item.owner == msg.sender);
        req.state = RequestState.Accepted;
        msg.sender.transfer(req.fee);
    }
}
