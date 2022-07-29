/* REDUX DEMO */

/***********************************************/
/*
  Redux Cycle
  ===========
  1. Action creator -> 2. Action -> 3. Dispatch -> 4. Reducers -> 5. State
  - To change the state of an app we call an action creator
  - The action creator function produces an action
  - The action gets fed into the dispatch method
  - The dispatch method feeds into our reducers the copies 
    of our action object
  - The reducers takes the action and previous data (state)
    and modifies the data and returns it
  - The returned data forms the new state

  Redux Chronological Steps
  =========================
  1. Action creator -> 2. Action -> 3. Reducers -> 4. Dispatch -> 5. State
*/
/***********************************************/

/* Clear the console */
console.clear();

/***********************************************/
/* People dropping off a form (Action creator) */
/***********************************************/

/* Action creator */
const createPolicy = (name, amount) => {
  return {
    /* Action */
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount,
    },
  };
};
/* Action creator */
const deletePolicy = name => {
  return {
    /* Action */
    type: 'DELETE_POLICY',
    payload: {
      name,
    },
  };
};
/* Action creator */
const createClaim = (name, amountToCollect) => {
  return {
    /* Action */
    type: 'CREATE_CLAIM',
    payload: {
      name,
      amountToCollect,
    },
  };
};
/**************************/
/* Reducers (Departments) */
/**************************/

/* Reducer (claims history department) */
/* 
  When the claimsHistory reducer is called for the first time
  its value is undefined. That is why we initialize it with a 
  default value of an empty array.
 */
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action
    return [...oldListOfClaims, action.payload];
  }
  // we don't care about this action
  return oldListOfClaims;
};
/* Reducer (accounting department) */
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action
    return bagOfMoney - action.payload.amountToCollect;
  }
  if (action.type === 'CREATE_POLICY') {
    // we care about this action
    return bagOfMoney + action.payload.amount;
  }
  // we don't care about this action
  return bagOfMoney;
};
/* Reducer (policy department) */
const policies = (oldListOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...oldListOfPolicies, action.payload.name];
  }
  if (action.type === 'DELETE_POLICY') {
    return [...oldListOfPolicies.filter(name => name !== action.payload.name)];
  }
  return oldListOfPolicies;
};

/**************/
/* Add Redux */
/*************/

/* Extract createStore and combineReducers from Redux */
const { createStore, combineReducers } = Redux;

/* Combine reducers (departments) */
const ourDeparments = combineReducers({
  accounting,
  claimsHistory,
  policies,
});

/* Create a Redux store */
const store = createStore(ourDeparments);

/**************/
/* Dispatcher */
/**************/

/* Initialize an action */
// const action = createPolicy('Alex', 20);
/* Log the action object */
// console.log(action);

/* Dispatch an action */
// store.dispatch(action);
store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jane', 40));
store.dispatch(createPolicy('Jim', 20));
store.dispatch(createPolicy('Bob', 30));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'));

/***************************************/
/* Log state after the action has commenced */
console.log(store.getState());
