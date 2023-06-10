pragma solidity ^0.5.0;

contract PurchaseStuff {
  address payable public admin;
  uint public price;

  event PurchaseEvent(address indexed buyer, address indexed admin, uint price);

  constructor (address payable _admin, uint _price) public {
    admin = _admin;
    price = _price;
  }

  function purchase() public payable{

    //transfer ether to admin's address
    admin.transfer(msg.value);

    //emit event to indicate purchase
    emit PurchaseEvent(msg.sender, admin, price);
  }
}