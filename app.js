(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.items = ShoppingListCheckOffService.getItemsToBuy();
    buy.buyItem = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  };

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "milk", quantity: 1 },
      { name: "chips", quantity: 5},
      { name: "sugary drinks", quantity: 10 },
      { name: "peptin bezmo", quantity: 2 }
    ];
    var boughtItems = [];

    service.getItemsToBuy = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.buyItem = function(itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };
  };

})();
