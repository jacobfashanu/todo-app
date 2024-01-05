import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

const veryDarkDesaturatedBlue = 'hsl(235, 24%, 19%)';
const veryLightGray = 'hsl(0, 0%, 98%)';
const lightGrayishBlue = 'hsl(234, 39%, 85%)';
const veryDarkGrayishBlueLight = 'hsl(235, 19%, 35%)';
const veryDarkGrayishBlueDark = 'hsl(233, 14%, 35%)';
const lightGrayishBlue2 = 'hsl(236, 33%, 92%)';
const darkGrayishBlueLight = 'hsl(236, 9%, 61%)';
const checkmarkBackground = 'linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))';
const brightBlue = 'hsl(220, 98%, 61%)';

export function ListItem({ pageData, setPageData, index, active, task, lightDarkMode }) {
    let colors = {};
    if (lightDarkMode === 'dark') {
        colors = {
            backgroundColor : veryDarkDesaturatedBlue,
            textColor: lightGrayishBlue
        }
    }

    else { // lightDarkMode is 'light'
        colors = {
            backgroundColor : veryLightGray,
            textColor: veryDarkGrayishBlueLight
        }
    }

    let activeInactiveStyles = {};

    if (active) {
        activeInactiveStyles = {
            display: 'none',
            border: `${veryDarkGrayishBlueDark} solid 1.5px`,
            background: 'none',
            textDecoration: 'auto'
        }
    }

    else {
        activeInactiveStyles = {
            display: 'block',
            border: 'none',
            background: checkmarkBackground,
            textDecoration: 'line-through'
        }
    }

    function changeActive() {
        if (pageData.state === 'Active' && task === "" ) {
            return;
        }

        if (pageData.state === 'Completed' && !active) {
            return;
        }
        let istaskActive;
        let isEmpty = false;
        const newTasks = pageData.pages[pageData.currentPage].tasks.map((item, i) => {
            if (item.task === '' && i === index) {
                isEmpty = true;
                return item;
            }

            if(i !== index) {
                return item;
            }
            else {
                istaskActive = item.active;
                return {task: item.task, active: !item.active};
            }
        });

        const newPage = pageData.pages.map((page, i) => {
            if(pageData.currentPage === i) {
                let newNumOfActiveTasks;
                let newNumOfInActiveTasks;
                if (istaskActive) {
                    newNumOfActiveTasks = (page.numOfActiveTasks - 1);
                    newNumOfInActiveTasks = (page.numOfInActiveTasks + 1);
                }

                else {
                    newNumOfActiveTasks = (page.numOfActiveTasks + 1);
                    newNumOfInActiveTasks = (page.numOfInActiveTasks - 1);
                }
                return {
                    ...page,
                    tasks: newTasks,
                    numOfActiveTasks: newNumOfActiveTasks,
                    numOfInActiveTasks: newNumOfInActiveTasks
                }
            }
            else {
                return page;
            }
        })
        setPageData({
            ...pageData,
            pages: isEmpty? pageData.pages : newPage
        })
    }
    
    return (
        <div className="form-check" style={{
            backgroundColor: colors.backgroundColor,
            color: colors.textColor
        }}>
            <input
                className="checkbox me-4"
                type="checkbox"
                defaultValue=""
                id="flexCheckDefault"
            />
            <span onClick={changeActive} style={{
                display: activeInactiveStyles.display
            }} className='checkmark'></span>
            <span onClick={changeActive} style={{
                border: activeInactiveStyles.border,
                background: activeInactiveStyles.background
            }} className='checkmarkBackground listItem'></span>
            <label onClick={changeActive} style={{
                textDecoration: activeInactiveStyles.textDecoration
            }}  className="form-check-label" htmlFor="flexCheckDefault">
                {task}
            </label>
        </div>
    )
}

export function NewListItem({ pageData, setPageData, lightDarkMode }) {
    let colors = {};
    if (lightDarkMode === 'dark') {
        colors = {
            backgroundColor : veryDarkDesaturatedBlue,
            textColor: lightGrayishBlue
        }
    }

    else { // lightDarkMode is 'light'
        colors = {
            backgroundColor : veryLightGray,
            textColor: veryDarkGrayishBlueLight
        }
    }

    function AddNewTask(str1) {
        if(pageData.pages[pageData.numOfPages - 1].numOfTasks < 5) {
            const nextPages = pageData.pages.map((page, i) => {
                if (pageData.numOfPages - 1 !== i) {
                    return page;
                }
                else {
                    const newTasks = page.tasks.map((item, index) => {
                        if(index === page.numOfTasks) {
                            return {task: str1, active: true}
                        }
                        else {
                            return item;
                        }
                    });
                    return {
                        ...page,
                        tasks: newTasks,
                        numOfTasks: page.numOfTasks += 1,
                        numOfActiveTasks: page.numOfActiveTasks += 1
                    }
                }
            })
            setPageData({
                ...pageData,
                pages: nextPages,
                currentPage: pageData.numOfPages - 1
            })
        }
        else {
                setPageData({ // add a new page object to the pages array
                    ...pageData,
                    pages: [
                        ...pageData.pages,
                        {
                            tasks: [{task: str1, active: true}, {task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true}],
                            numOfTasks: 1,
                            numOfActiveTasks: 1,
                            numOfInActiveTasks: 0,
                        }
                    ],
                    currentPage: pageData.numOfPages,
                    numOfPages: pageData.numOfPages += 1,
                })
            
        }
    }
    return (
        <div className='form-check newItem' style={{
            backgroundColor: colors.backgroundColor
        }}>
            <span className='checkmarkBackground'></span>
            <input onKeyDown={(event) => {
                if(event.key == "Enter") {
                    if(event.target.value === '') return;
                    AddNewTask(document.querySelector('.form-check.newItem input').value);
                    event.target.value = ''
                }
            }} style={{
                backgroundColor: colors.backgroundColor,
                color: colors.textColor
            }} type='text' maxLength={30} placeholder='Create a new todo...'></input>
        </div>
    )
}

export function FilterItem({ pageData, setPageData, itemsLeft,lightDarkMode }) {
    let colors = {};
    if (lightDarkMode === 'dark') {
        colors = {
            backgroundColor : veryDarkDesaturatedBlue,
            textColor: veryDarkGrayishBlueDark,
            hover: lightGrayishBlue2
        }
    }

    else { // lightDarkMode is 'light'
        colors = {
            backgroundColor : veryLightGray,
            textColor: darkGrayishBlueLight,
            hover: veryDarkGrayishBlueLight
        }
    }

    let textColors = {};
    if (lightDarkMode === 'dark') {
        if(pageData.state === 'All') {
            textColors = {
                all : {
                    textColor: brightBlue,
                    hover: brightBlue
                },
                active: {
                    textColor: veryDarkGrayishBlueDark,
                    hover: lightGrayishBlue2
                },
                completed: {
                    textColor: veryDarkGrayishBlueDark,
                    hover: lightGrayishBlue2
                }

            }
        }

        else if(pageData.state === 'Active') {
            textColors = {
                active : {
                    textColor: brightBlue,
                    hover: brightBlue
                },
                all: {
                    textColor: veryDarkGrayishBlueDark,
                    hover: lightGrayishBlue2
                },
                completed: {
                    textColor: veryDarkGrayishBlueDark,
                    hover: lightGrayishBlue2
                }

            }
        }

        else {
            textColors = {
                completed : {
                    textColor: brightBlue,
                    hover: brightBlue
                },
                active: {
                    textColor: veryDarkGrayishBlueDark,
                    hover: lightGrayishBlue2
                },
                all: {
                    textColor: veryDarkGrayishBlueDark,
                    hover: lightGrayishBlue2
                }

            }
        }
    }

    else {
        if(pageData.state === 'All') {
            textColors = {
                all : {
                    textColor: brightBlue,
                    hover: brightBlue
                },
                
                active: {
                    textColor: darkGrayishBlueLight,
                    hover: veryDarkGrayishBlueLight
                },
                completed: {
                    textColor: darkGrayishBlueLight,
                    hover: veryDarkGrayishBlueLight
                }

            }
        }

        else if(pageData.state === 'Active') {
            textColors = {
                active : {
                    textColor: brightBlue,
                    hover: brightBlue
                },
                all: {
                    textColor: darkGrayishBlueLight,
                    hover: veryDarkGrayishBlueLight
                },
                completed: {
                    textColor: darkGrayishBlueLight,
                    hover: veryDarkGrayishBlueLight
                }

            }
        }

        else {
            textColors = {
                completed : {
                    textColor: brightBlue,
                    hover: brightBlue
                },
                active: {
                    textColor: darkGrayishBlueLight,
                    hover: veryDarkGrayishBlueLight
                },
                all: {
                    textColor: darkGrayishBlueLight,
                    hover: veryDarkGrayishBlueLight
                }

            }
        }
    }

    function changeColorOnHover(cssSelector, button='') {
        if(button === '') {
            document.querySelector(cssSelector).style.color = colors.hover;
        }
        if(button === 'All') {
            document.querySelector(cssSelector).style.color = textColors.all.hover;
        }
        else if (button === 'Active') {
            document.querySelector(cssSelector).style.color = textColors.active.hover;
        }
        
        else if (button === 'Completed') {
            document.querySelector(cssSelector).style.color = textColors.completed.hover;
        }
    }

    function changeColoronMouseOut(cssSelector, button='') {
        if(button === '') {
            document.querySelector(cssSelector).style.color = colors.textColor;
        }
        if(button === 'All') {
            document.querySelector(cssSelector).style.color = textColors.all.textColor;
        }
        else if (button === 'Active') {
            document.querySelector(cssSelector).style.color = textColors.active.textColor;
        }
        
        else if (button === 'Completed'){
            document.querySelector(cssSelector).style.color = textColors.completed.textColor;
        }
    }

    function clearCompleted() {
        if(pageData.pages[pageData.currentPage].numOfInActiveTasks === pageData.pages[pageData.currentPage].numOfTasks) {
            if(pageData.numOfPages === 1) {
                    setPageData({
                        pages:[{
                            tasks: [{task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true}], // array of objects where each object represents a task. Each object stores the string of the task and whether the task is completed
                            numOfTasks: 0,
                            numOfActiveTasks: 0,
                            numOfInActiveTasks: 0
                        }],
                        state: pageData.state,
                        currentPage: 0,
                        numOfPages: 1
                    })
            }
            else {

                const newPages = pageData.pages.filter((page, i) => i != pageData.currentPage);

                if(pageData.currentPage === pageData.numOfPages - 1) {
                    setPageData({
                        ...pageData,
                        pages: newPages,
                        currentPage: pageData.currentPage - 1,
                        numOfPages: pageData.numOfPages - 1
                    });
                }
                else {
                    setPageData({
                        ...pageData,
                        pages: newPages,
                        numOfPages: pageData.numOfPages - 1
                    })
                }
            }
        }

        else{
            console.log('asdas')
            const newPages = pageData.pages.map((page, i) => {
                if(pageData.currentPage === i) {
                    const newTasks = page.tasks.map((item) => {
                        if(item.task != '' && item.active === false) {
                            return {
                                task: '',
                                active: true
                            }
                        }
                        else {
                            return item;
                        }
                    })
                    return {
                        ...page,
                        tasks: newTasks
                    }
                }
                else {
                    return page;
                }
            });
            setPageData({
                ...pageData,
                pages: newPages
            })
        }
        
    }

    return (
        <div style={{
            backgroundColor: colors.backgroundColor,
            color: colors.textColor
        }} className='form-check filterItem' > 
            <ul className='d-flex justify-content-between'>
                <li className=''>{itemsLeft} items left</li>
                <ul className='filter d-flex justify-content-between'>
                    <li onClick={() => {
                        setPageData({
                            ...pageData,
                            state: 'All'
                        })
                    }} style={{
                            color: textColors.all.textColor
                        }} onMouseOut={() => changeColoronMouseOut('.filter li:nth-of-type(1)', 'All')} onMouseOver={() => changeColorOnHover('.filter li:nth-of-type(1)', 'All')}>All</li>
                    <li onClick={() => {
                        setPageData({
                            ...pageData,
                            state: 'Active'
                        })
                    }} onMouseOut={() => changeColoronMouseOut('.filter li:nth-of-type(2)', 'Active')} onMouseOver={() => changeColorOnHover('.filter li:nth-of-type(2)', 'Active')} style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            color: textColors.active.textColor
                        }}>Active</li>
                    <li onClick={() => {
                        setPageData({
                            ...pageData,
                            state: 'Completed'
                        })
                    }} style={{
                            color: textColors.completed.textColor
                        }} onMouseOut={() => changeColoronMouseOut('.filter li:nth-of-type(3)', 'Completed')} onMouseOver={() => changeColorOnHover('.filter li:nth-of-type(3)', 'Completed')}>Completed</li>
                </ul>
                <li style={{
                        color: colors.textColor
                    }} onClick={clearCompleted} onMouseOut={() => changeColoronMouseOut('.clear')} onMouseOver={() => changeColorOnHover('.clear')} className='clear'>Clear Completed</li>
            </ul>
        </div>
    ) 
}

ListItem.propTypes = {
    lightDarkMode: PropTypes.string,
    task: PropTypes.string,
    active: PropTypes.bool,
    index: PropTypes.number,
    pageData: PropTypes.object,
    setPageData: PropTypes.func
}

NewListItem.propTypes = {
    lightDarkMode: PropTypes.string,
    pageData: PropTypes.object,
    setPageData: PropTypes.func
}

FilterItem.propTypes = {
    lightDarkMode: PropTypes.string,
    itemsLeft: PropTypes.number,
    pageData: PropTypes.object,
    setPageData: PropTypes.func
}