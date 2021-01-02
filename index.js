import { combineReducers, createStore } from 'redux'

console.log('hello world - redux-chore-money');



// action, add a new chore
const createChore = (choreId, choreName, choreValue) => {
    console.log('returning CREATE_CHORE');
    return {
      // this is a form
      type: 'CREATE_CHORE',
      payload: {
        id: choreId,
        name: choreName,
        value: choreValue,
      },
    }
  }

  // action, add a new chore
const addChild = (childId, childName, beginningBalance=0) => {
    console.log('returning CREATE_CHILD');
    return {
      // this is a form
      type: 'CREATE_CHILD',
      payload: {
        id: childId,
        name: childName,
        accountBalance: beginningBalance
      }
    }
  }
//(policy) => policy.name != action.payload.name
const doChore = (childId, choreId) => {    
    const aChore = store.getState().familyChores.filter((chore) => chore.id==choreId);
    if(aChore){
    return {
      // this is a form
      type: 'DO_CHORE',
      payload: {
        childId: childId,
        choreId: choreId,
        choreValue: aChore[0].value
      }
    }
    }
  }


const chores = (choreList = [], action) => {
    if (action.type === 'CREATE_CHORE') {
      return [...choreList, action.payload]  //add a new chore, add it to the list
    }
    return choreList
  }

const children = (childList = [], action) => {
    if (action.type === 'CREATE_CHILD') {
        //add a new child, add it to the list
      return [...childList, action.payload]  
    }if (action.type === 'DO_CHORE') {
        //child did a chore, add the value of the chore to their account balance
        const aChild = childList.filter((child) => child.id===action.payload.childId);
        aChild[0].accountBalance += action.payload.choreValue;
        return childList; 
      }
  
    return childList;
  }

  
const choreStoreReducers = combineReducers({
    myFamily: children,
    familyChores: chores
  })
  
  const logStore = () => {
    console.log('-----------------------')
    console.log('--- current redux store')
    console.log(store.getState())
    console.log('---')
    console.log('-----------------------')
  }
  
  console.log(`creating store`);
  const store = createStore(choreStoreReducers);

  logStore();
  store.dispatch(createChore('WALKDOG_01', 'walk santas little helper', 5.00));
  logStore();
  store.dispatch(createChore('LEGRILLE_01', 'assemble le grille', 20.00));
  logStore();
  store.dispatch(createChore('COOK_01', 'cook me a steamed ham', 1.25));
  logStore();
  store.dispatch(createChore('COOK_02', 'cook me a krusty burger', 2.75));
  logStore();

  store.dispatch(addChild('1', 'Bart', 0.0));
  logStore();
  store.dispatch(addChild('2', 'Lisa', 0.0));
  logStore();


  store.dispatch(doChore('1','LEGRILLE_01'));
  logStore();
  store.dispatch(doChore('2','COOK_01'));
  logStore();
  store.dispatch(doChore('2','COOK_02'));
  logStore();

  