import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// import PersonalInfo from './component/PersonalInfo';
// import UserCard from './component/UserCard'

// function App() {
//   // const users = [
//   //   {
//   //     id: 1,
//   //     name: 'Redza',
//   //     email: 'muhammadharithredza@gmail.com',
//   //     role: 'Full Stack Developer'
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Ismyralda',
//   //     email: 'donna.ismyralda@gmail.com',
//   //     role: 'Backend Developer'
//   //   },
//   //   {
//   //     id: 3,
//   //     name: 'Fadilah',
//   //     email: 'v6.mago@gmail.com',
//   //     role: 'Frontend Developer'
//   //   },
//   //   {
//   //     id: 4,
//   //     name: 'Wan',
//   //     email: 'kiritokurugaya102@gmail.com ',
//   //     role: 'Backend Developer'
//   //   },
//   //   {
//   //     id: 5,
//   //     name: 'Catherine',
//   //     email: 'fanoiising@gmail.com ',
//   //     role: 'Emotional Support Members'
//   //   }
//   // ];
//   const users = [
//     {
//       id: 0,
//     },
//     {
//       id: 1,
//       name: 'Redza',
//       age: 24,
//       isActive: true
//     },
//     {
//       id: 2,
//       name: 'Ismyralda',
//       age: 28,
//       isActive: true
//     },
//     {
//       id: 3,
//       name: 'Fadilah',
//       age: 38,
//       isActive: true
//     },
//     {
//       id: 4,
//       name: 'Wan',
//       age: 24,
//       isActive: true
//     },
//     {
//       id: 5,
//       name: 'Catherine',
//       age: 61,
//       isActive: false
//     }
//   ];
//   return (
//     <div>
//       <h1>Exercise 1: Environment Setup Verification</h1>
//       <p>My name is Donna!</p>
//       <br/>
//       <hr/>

//       <h1>Exercise 2: Basic JSX Practice</h1>
//       <PersonalInfo/>
//       <br/>
//       <hr/>

//       <h1>Exercise 3: Using Components</h1>
      
//       <h2>User Profiles</h2>
//       {users.map((user) => (
//         <UserCard
//           // key={user.id}
//           name={user.name}
//           age={user.age}
//           isActive={user.isActive}
//         />
//       ))}
//     </div>
//   )
// }

// export default App

import ProductCard from './component/ProductCard'

function ProductList() {
  const products = [
    {
      id: 0, 
    },
    {
      id: 1,
      name: 'Shocked',
      image: 'https://media.tenor.com/_zWYqfZdneIAAAAM/shocked-face-shocked-meme.gif',
      price: '10.229',
      isOnSale: true
    },
    { 
      id: 2,
      name: 'Speed Shock',
      price: '99.999',
      image: 'https://tcmhuxevcnxpxpubnhkm.supabase.co/storage/v1/object/public/template-images/user-sources/2026/04/30/176cf0d1-00fe-45c8-a847-159fdbdd3763.gif',
      isOnSale: false
    }
  ]

  return (
    <div>
      <h1 class="text-3xl font-bold underline decoration-sky-500">
      abcdgjypq!
      </h1>

      {products.map((product) => (
        <ProductCard
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          isOnSale={product.isOnSale}
        />
      ))}
    </div>
  )
}

export default ProductList