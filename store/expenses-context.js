import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'New Shoes',
    amount: 59.99,
    date: new Date('2021-07-14')
  },
  {
    id: 'e2',
    description: 'Groceries',
    amount: 34.50,
    date: new Date('2021-07-16')
  },
  {
    id: 'e3',
    description: 'Cinema',
    amount: 15.99,
    date: new Date('2021-07-20')
  },
  {
    id: 'e4',
    description: 'New Book',
    amount: 9.99,
    date: new Date('2021-08-01')
  },
  {
    id: 'e5',
    description: 'Rent',
    amount: 1299.99,
    date: new Date('2021-08-02')
  },
  {
    id: 'e6',
    description: 'New Shoes',
    amount: 59.99,
    date: new Date('2021-07-14')
  },
  {
    id: 'e7',
    description: 'Groceries',
    amount: 34.50,
    date: new Date('2021-07-16')
  },
  {
    id: 'e8',
    description: 'Cinema',
    amount: 15.99,
    date: new Date('2021-07-20')
  },
  {
    id: 'e9',
    description: 'New Book',
    amount: 9.99,
    date: new Date('2021-08-01')
  },
  {
    id: 'e10',
    description: 'Rent',
    amount: 1299.99,
    date: new Date('2021-08-02')
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'Add':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'Update':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'Delete':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'Add', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'Delete', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'Update', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return(
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider;
