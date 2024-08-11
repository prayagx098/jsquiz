import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const [username, setUsername] = useState('');
    const [category, setCategory] = useState('');
    const questions = [];
    const navigate = useNavigate();
  
    const Submit = (event) => {
      event.preventDefault();
  

        if(username === '' || category == '' ){
            alert("enter the correct details to caontinue")
        }else{
            const data = {
                username,
                category,
                questions,
              };
          
        
              localStorage.setItem('userData', JSON.stringify(data));
          
              navigate('confirm');
        }


 

      

    }
  return (
    <div>
      <div class="lg:grid lg:grid-cols-3">
        <div class="..."></div>
        <div class="...">


          <form className='text-center justify-around py-10 w-auto mt-60 border border-neutral-500 rounded-lg bg-white/20 backdrop-blur-lg p-3 px-6' onSubmit={Submit}>
            <div className=' formContent '>
              <h1 className="text-7xl font-bold text-white py-2">GET QUIZ</h1>
              <span class="text-xl text-white py-2">Fill Up To Start Quiz</span><br />
              <div>
                <input
                className='relative bg-white ring-0 outline-none font-bold border border-neutral-500 text-violet-750 placeholder-dark text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500'
                id="username"
                type="text"
                value={username}
                placeholder='Full Name'
                onChange={(e) => setUsername(e.target.value)}
                required
                />
              </div><br />
              <div>
                <select
                    className='relative bg-white ring-0 outline-none border border-neutral-500 text-violet-950 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5'
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required>
                    <option value="" disabled>Select a category</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="bootstrap">Bootstrap</option>
                </select>
              </div><br />


              <button class="bg-violet-700 text-neutral-50 p-2 rounded-lg hover:bg-violet-800">START QUIZ</button>

            </div>
          </form>
        </div>
        <div class="..."></div>
        {/* <div className="...">
          <div className='bg-cyan-100'>
          <div
            className="h-96 w-60 bg-gradient from-slate-300 to-slate-100 mt-60 ms-20 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md">
              <img src="https://cdn.pixabay.com/photo/2015/10/31/12/00/question-1015308_640.jpg" alt="" />
            <div className="col-span-2 rounded-md">
              Using Lorem ipsum to focus attention on graphic elements in a webpage design proposal · One of the
              earliest examples
              of the Lorem ipsum placeholder text on 1960s advertising...
            </div>
          </div>
          </div>
        </div> */}
  </div>
            

    </div>
  )
}

export default LandingPage
