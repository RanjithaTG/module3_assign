(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController )
  .constant('RestApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective)
  .service('MenuSearchService', MenuSearchService);
  
     function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsFound.html',
            scope: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }
 function FoundItemsDirectiveController() {
        var menu = this;
    }
  
  MenuSearchService.$inject = ['$http', 'RestApiBasePath']

    function MenuSearchService($http, RestApiBasePath) {
        var service = this;
        service.getMatchedItems = function(searchItem) {
            var response = $http({
                method: "GET",
                url: (RestApiBasePath + "/menu_items.json")
            });

            return response.then(function(result) {
                var menuData = result.data;
                var foundItems = [];
                menuData.menu_items.forEach(function(item) {
                    if (item.description.indexOf(searchItem) != -1) {
                        foundItems.push({
                            name: item.name,
                            short_name: item.short_name,
                            description: item.description
                        });
                    }
                });
                return foundItems;
            });
        };
    }
  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
        var menuSearch = this;
        menuSearch.foundItems = "";
        menuSearch.search = function() {
            menuSearch.nothingFound = "";
            if (menuSearch.searchItem) { // check if empty
                var promise = MenuSearchService.getMatchedItems(menuSearch.searchItem.toLowerCase());
                promise.then(function(foundItems) {
                    if (foundItems.length == 0) {
                        menuSearch.nothingFound = "Nothing found";
                    }
                    menuSearch.foundItems = foundItems;
                })

            } else {
                menuSearch.nothingFound = "Nothing found";
                menuSearch.foundItems = "";
            }
        };
        menuSearch.removeItem = function(itemIndex) {
            menuSearch.foundItems.splice(itemIndex, 1);
        };
    }

})();
