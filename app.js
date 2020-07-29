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

            //Make newItem public for later use by user
            return newItem;
        },

        //Create getItemById function
        getItemById: function (id) {
            let found = null;
            //Loop through items
            data.items.forEach(function (item) {
                //match the ids
                if (item.id === id) {
                    found = item;
                }
            });

            return found;
        },

        //Create setCurrentItem function
        setCurrentItem: function (item) {
            data.currentItem = item;
        },

        //Create getTotalCalories function
        getTotalCalories: function () {
            //init total (data structure)
            let total = 0;
            //loop through items and add calories
            data.items.forEach(function (item) {
                total += item.calories;
            });

            //Set total cal in data structure
            data.totalCalories = total;

            //make data public
            return data.totalCalories;
        },


        //make data public
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
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
            document.querySelector(UISelectors.itemList.style.display) = 'block';
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
        //Create showTotalCalories function
        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';

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

        //Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
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
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    //Update  item submit
    const itemUpdateSubmit = function (e) {
        //IF event target contains the class 'edit-item' 
        if (e.target.classList.contains('edit-item')) {
            //THEN get list item id (item-0, item-1...)
            const listId = e.target.parentNode.parentNode.id;
            //Break into an array by "splitting it with the dash"
            const listIdArr = listId.split('-');
            //Get the actual id
            const id = parseInt(listIdArr[1]);
            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);
            //Set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            //Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();

    }

    //Public methods via return
    return {
        init: function () {
            console.log('Initializing app...');

            //Clear edite state/ set initial state
            UICtrl.clearEditState();

            //Fetch items from data structure (state)
            const items = ItemCtrl.getItems();

            //Check if any items present
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                //Populate list with items
                UICtrl.populateItemList(items);
            }

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListeners();

        }
    }

})(ItemCtrl, UICtrl);


//Initialize App
App.init();