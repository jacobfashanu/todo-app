import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { ListItem, NewListItem, FilterItem } from './components/ListItem';
import bgDesktopDarkImg from '/images/bg-desktop-dark.jpg';
import bgDesktopLightImg from '/images/bg-desktop-light.jpg'
import Pagination from '@mui/material/Pagination';

function App() {
  const [pageData, setPageData] = useState({
    pages:[{
      tasks: [{task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true}], // array of objects where each object represents a task. Each object stores the string of the task and whether the task is completed
      numOfTasks: 0,
      numOfActiveTasks: 0,
      numOfInActiveTasks: 0
    }],
    state: 'All',
    currentPage: 0,
    numOfPages: 1});
  const [lightDarkMode, setLightDarkMode] = useState('dark');
  const [backgroundCol, setBackgroundCol] = useState('hsl(235, 21%, 11%)');
  const [backgroundImg, setBackgroundImg] = useState(bgDesktopDarkImg);

  const veryDarkBlue = 'hsl(235, 21%, 11%)';
  const veryLightGray = 'hsl(0, 0%, 98%)';
  const lightGrayishBlueLight = 'hsl(233, 11%, 84%)';

  
  function changeLightDarkMode() {
    if (lightDarkMode === 'dark') {
      setLightDarkMode('light');
      setBackgroundCol(lightGrayishBlueLight);
      setBackgroundImg(bgDesktopLightImg);
    }
    else {
      setLightDarkMode('dark');
      setBackgroundCol(veryDarkBlue);
      setBackgroundImg(bgDesktopDarkImg);
    }
  }
  
  document.body.style.backgroundColor = backgroundCol;

  let i = -1;
  const listItems = pageData.pages[pageData.currentPage].tasks.map(item => {
    i += 1;
    if (pageData.state === 'All') {
      return <ListItem pageData={pageData} setPageData={setPageData} key={i} index={i} active={item.active} task={item.task} lightDarkMode={lightDarkMode}/>
    }

    else if (pageData.state === 'Active') {
      if (item.active) {
        return <ListItem pageData={pageData} setPageData={setPageData} key={i} index={i} active={item.active} task={item.task} lightDarkMode={lightDarkMode}/>
      }
      else {
        return <ListItem pageData={pageData} setPageData={setPageData} key={i} index={i} active={true} task={''} lightDarkMode={lightDarkMode}/>
      }
    }

    else {
      if (!item.active) {
        return <ListItem pageData={pageData} setPageData={setPageData} key={i} index={i} active={item.active} task={item.task} lightDarkMode={lightDarkMode}/>
      }
      else {
        return <ListItem pageData={pageData} setPageData={setPageData} key={i} index={i} active={true} task={''} lightDarkMode={lightDarkMode}/>
      }
    }

  });

  function handlePageChange(event, value) {
    setPageData({
      ...pageData,
      currentPage: value - 1
    })
  }
  return (
    <>
      <div className='backgroundImgContainer'>
        <img className='backgroundImg' src={backgroundImg}></img>
      </div>
      <main>
        <div className='titleContainer d-flex align-items-center justify-content-between mb-3'>
          <h1>TODO</h1>
          {lightDarkMode === 'dark' && <svg onClick={changeLightDarkMode} className='lightDarkButton' xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill={veryLightGray} fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>}
          {lightDarkMode === 'light' && <svg onClick={changeLightDarkMode} className='lightDarkButton' xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill={veryLightGray} fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>}
        </div>
        <NewListItem pageData={pageData} setPageData={setPageData} lightDarkMode={lightDarkMode} />
        <div className='taskList d-flex flex-column'>
          {listItems}
          <FilterItem pageData={pageData} setPageData={setPageData} itemsLeft={pageData.pages[pageData.currentPage].numOfActiveTasks} lightDarkMode={lightDarkMode} />
        </div>
        <Pagination page={pageData.currentPage + 1} onChange={handlePageChange} color={lightDarkMode === 'dark'? 'primary' : 'secondary'} count={pageData.numOfPages} siblingCount={0} />
      </main>
    </>
  )
}

export default App
