/* REDUX DEMO */

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
