import './App.css';
// import { useState } from 'react';

// function Counter() { // Simple Counter
//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);
//   const reset = () => setCount(0);

//   return (
//     <div>
//       <h2>Count: {count}</h2>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   )
// }


// function UserProfile(){ // Managing Multiple State Variables
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState(0);

//   return(
//     <div>
//       <input
//         placeholder="First Name"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//       />

//       <input
//         placeholder="Last Name"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//       />
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         placeholder="Set Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />
//       <h3>Hello, {firstName} {lastName}!</h3>
//       <p>Email: {email}</p>
//       <p>Age: {age}</p>
//     </div>
//   );
// }

// function UserForm(){ // Object State Management
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone:''
//   });

//   const handleInputChange = (field, value) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       [field]: value
//     }));
//   }

//   return (
//     <div>
//       <input
//         placeholder="Name"
//         value={user.name}
//         onChange={(e) => handleInputChange('name', e.target.value)}
//       />
//       <input
//         placeholder="Email"
//         value={user.email}
//         onChange={(e) => handleInputChange('email', e.target.value)}
//       />
//       <input
//         placeholder="Phone"
//         value={user.phone}
//         onChange={(e) => handleInputChange('phone', e.target.value)}
//       />
//       <div>
//         <h3>User Info:</h3>
//         <p>Name: {user.name}</p>
//         <p>Email: {user.email}</p>
//         <p>Phone: {user.phone}</p>
//       </div>
//     </div>
//   )
// }

// function TodoList(){ //Array State Management
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState ('');

//   const addTodo = () => {
//     if (inputValue.trim()) {
//       setTodos(prevTodos => [
//         ...prevTodos,
//         { id: Date.now(), text: inputValue, completed: false }
//       ]);
//       setInputValue('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(prevTodos =>
//       prevTodos.map(todo =>
//         todo.id === id ? { ...todo, completed: !todo.completed } :todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
//   };

//   return (
//     <div>
//       <input
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Add a todo"
//       />
//       <button onClick={addTodo}>Add</button>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo.id}>
//             <span
//               style={{
//                 textDecoration: todo.completed ? 'line-through' : 'none'
//               }}
//               onClick={() => toggleTodo(todo.id)}
//             >
//               {todo.text}
//             </span>
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function AllExample(){
//   return(
//     <div>
//       <h2>Example 1: Simple Counter</h2>
//       <Counter/>
//       <br/><hr/>
//       <h2>Example 2: Managing Multiple State Variables</h2>
//       <UserProfile/>
//       <br/><hr/>
//       <h2>Example 3: Object State Management</h2>
//       <UserForm/>
//       <br/><hr/>
//       <h2>Example 4: Array State Management</h2>
//       <TodoList/>
//     </div>
//   )
// }

// export default AllExample

// ------ Exercises ------

// import { useState } from 'react';

// function TemperatureConverter(){
//   const [celcius, setCelcius] = useState('');
//   const [fahrenheit, setFarenheit] = useState('');

//   const handleCelciusChange = (e) => {
//     const value = e.target.value;
//     setCelcius(value);
//     setFarenheit(value === '' ? '' : ((value * 9) / 5 + 32).toFixed(2));
//   };

//   const handleFahrenheitChange = (e) => {
//     const value = e.target.value;
//     setFarenheit(value);
//     setCelcius(value === '' ? '' : (((value - 32 ) * 5) / 9).toFixed(2));
//   };

//   return (
//     <div>
//       <h2>Temperature Converter</h2>
//       <label>
//         Celcius: 
//         <input type="number" value={celcius} onChange={handleCelciusChange}/>
//       </label>
//       <br/>
//       <label>
//         Fahrenheit:
//         <input type="number" value={fahrenheit} onChange={handleFahrenheitChange}/>
//       </label>
//     </div>
//   );
// }

// export default TemperatureConverter

// import { useState } from 'react';

// function ShoppingCart() {
//   const product = [
//     {
//       id: 1,
//       name: 'Apple',
//       price: 2
//     },
//     {
//       id: 2,
//       name: 'Orange',
//       price: 3
//     },
//     {
//       id: 3,
//       name: 'Banana',
//       price: 1.5
//     },
//   ];

//   const [cart, setCart] = useState ([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//   };

//   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

//   return(
//     <div>
//       <h2>Shopping Cart</h2>
//       <h3>Products</h3>
//       {product.map((product) => (
//         <div key ={product.id}>
//           {product.name} - ${product.price}
//           <button onClick={() => addToCart(product)}>Add</button>
//         </div>
//       ))}

//       <h3>Cart</h3>
//       {cart.map((item, index) => (
//         <div key={index}>
//           {item.name} - ${item.price}
//           <button onClick={() => removeFromCart(index)}>Remove</button>
//         </div>
//       ))}

//       <h3>Total: ${totalPrice.toFixed(2)}</h3>
//     </div>
//   )
// }

// export default ShoppingCart

import { useState } from 'react';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [filter, setFilter] = useState('all');

  // Categories list for reuse in form and filter
  const categories = ['food', 'transport', 'utilities', 'entertainment', 'other'];

  // 1. Add new expense
  const handleAddExpense = (e) => {
    e.preventDefault();

    // Validation
    if (!description.trim() || !amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid description and positive amount.');
      return;
    }

    const newExpense = {
      id: Date.now(), // unique ID for deletion/key
      description: description.trim(),
      amount: parseFloat(amount),
      category: category,
    };

    setExpenses([...expenses, newExpense]);

    // Reset input fields
    setDescription('');
    setAmount('');
    setCategory('food');
  };

  // 5. Delete individual expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // 4. Filter expenses by category
  const filteredExpenses =
    filter === 'all'
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  // 3. Calculate total expenses (based on current filter, or change `filteredExpenses` to `expenses` for overall total)
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', fontFamily: 'sans-serif', padding: '1rem' }}>
      <h2>Expense Tracker</h2>

      {/* Expense Form */}
      <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', textTransform: 'capitalize' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit" style={{ padding: '0.6rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Add Expense
        </button>
      </form>

      <hr />

      {/* Filter Section */}
      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor="filter-select"><strong>Filter by Category:</strong></label>
        <select
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '0.4rem', fontSize: '0.9rem', textTransform: 'capitalize' }}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Total Expenses Display */}
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '1rem 0' }}>
        Total ({filter === 'all' ? 'All' : filter}): ${totalAmount.toFixed(2)}
      </div>

      {/* 2. Expense List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          filteredExpenses.map((expense) => (
            <li
              key={expense.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                borderBottom: '1px solid #ccc',
              }}
            >
              <div>
                <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)}{' '}
                <span style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
                  ({expense.category})
                </span>
              </div>
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                style={{
                  padding: '0.3rem 0.6rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ExpenseTracker;