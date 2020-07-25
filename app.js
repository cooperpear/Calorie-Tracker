//Storage Controller

//Item Controller
const ItemCtrl = (function () {
    //Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        items: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    }
    //Public Methods
    return {
        getItems: function () {
            return data.items;
        },


        logData: function () {
            return data;
        }
    }


})();

//UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list'
    }

    //Public methods
    return {
        populateItemList: function (items) {
            //Initiate HTML variable
            let html = '';

            //Loop through each item and generate template literal HTML for each item
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`;
            });

            //Insert html list items 
            document.querySelector(UISelectors.itemlist).innerHTML = html;
        },

        //UISelectors currently private due to scope
        //Create UISelectors public method
        getSelectors: function () {
            return UISelectors;
        }
    }

})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
    //Load event listeners
    const loadEventListeners = function () {
        //Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    //Add item submit
    const itemAddSubmit = function (e) {
        e.preventDefault();
    }

    //Public methods
    return {
        init: function () {
            console.log('Initializing app...');

            //Fetch items from data structure (state)
            const items = ItemCtrl.getItems();

            //Populate list with items
            UICtrl.populateItemList(items);


        }
    }

})(ItemCtrl, UICtrl);


//Initialize App
App.init();