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

        addItem: function (name, calories) {
            let ID;
            //Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Calories to number
            calories = parseInt(calories);

            //Create new item
            newItem = new Item(ID, name, calories);

            //Push new item into data structure array
            data.items.push(newItem);

            //Make newItem public for later use
            return newItem;
        },


        logData: function () {
            return data;
        }
    }


})();

//UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCalorieInput: '#item-calories'
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
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCalorieInput).value
            }
        },

        //Create addListItem function
        addListItem: function (item) {
            //Show the list
            document.querySelector(UISelectors.itemList.style.display = 'block';
            //Create li element
            const li = document.createElement('li');
            //Add class
            li.className = 'collection-item';
            //Add ID
            li.id = `item-${item.id}`;
            //Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
            //Insert item into DOM
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },

        //Create clearInput function
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        //Create hideList function when no items are present in items array
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
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
        //Store input from user form
        const input = UICtrl.getItemInput();

        //Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            //Add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            //Add item to UI list
            UICtrl.addListItem(newItem);
            //Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    //Public methods
    return {
        init: function () {
            console.log('Initializing app...');

            //Fetch items from data structure (state)
            const items = ItemCtrl.getItems();

            //Check if any items present
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                //Populate list with items
                UICtrl.populateItemList(items);
            }

            //Load event listeners
            loadEventListeners();

        }
    }

})(ItemCtrl, UICtrl);


//Initialize App
App.init();