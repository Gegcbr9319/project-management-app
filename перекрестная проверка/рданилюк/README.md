- PR Link: https://github.com/rdaniliuk/project-management-app/pull/2
- Deploy: https://umbrella-3044.onrender.com/

> ## Points: 43/60
> Не плохая работа, местами не логичная чуть-чуть, но мы еще учимся,
То что колонка в конце добавляется, это не удобно если их много.  После редактирования профиля не смог зайти,  три раза тестил и тогда ошибки в консоль кидает, но я это не учитывал, как штрафы.
Немного странно, что нет возможности доску редактировать, это вроде бы само собой просится) 


### Welcome route -  6/7 points

- [x] The welcome page should contain general information about the developer, project, and course. **1 point**
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. **1 point**
- [x] If login token is valid and unexpired, change buttons Sign In and Sign Up on "Go to Main Page" button. **2 points**
- [ ] When the token expires - the user should be redirected to the "Welcome page" automatically. **1/2 points**
> Не нахожу в коде логики, которая бы делала resetAuth принудительно, просто по прошествии времени
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. **1 point**


### Sign In / Sign Up  -  8 points

- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **2 points**
- [x] Form fields should be implemented according to the backend API. Validation should be implemented. **4 points**
- [x] Upon successful login, the user should be redirected to "Main route" **1 point**
- [x] If user already logged in and he try to reach this routes - he should be redirected to Main route. **1 point**


### Main route - 5/8 points

- [x] Board creation functionality **2 points**
- [x] Displays all created boards as a list/grid **1 point**
- [x] Each board in the list is displayed with a small preview of available information (title, description, etc). By clicking an element the user navigates to the board item (Board route). There's also a button for board deletion. **1 point**
- [x] When trying to delete the board, we should receive a confirmation modal. The confirmation modal must be a generic component (one for the entire application). **1 points**
- [ ] The user profile editing functionality is implemented. **1/3 points**
>пользователя обновить можно, правда под обновленным не запускает, поэтому 1 балл


### Board route -  16/26 points

- [x] Button for column creation is displayed **1 point**
- [x] If a board contains at least one column - a button for task creation is displayed/become enabled as well **1 points**
- [x] A modal windows with forms is displayed for column and task creations  **3 points**
- [x] A vertical scrollbar is displayed in the column when overflowing with the number of column tasks  **2 points**
- [x] The page itself on the current route doesn't have a vertical scrollbar **1 points**
- [ ] With the help of drag-n-drop, we can swap columns. **0/3 points**
- [x] With the help of drag-n-drop, we can change the order of tasks within a column.  **3 points**
- [ ] With the help of drag-n-drop, we can change the task belonging to the column.  **0/5 points**
- [ ] The functionality of viewing and editing of the task has been implemented. **1/3 points**
> Задачу можно лишь просмотреть, но не редактировать 1 балл
- [x] The task must have a delete task button. On click: confirmation modal -> delete.  **1 points**
- [x] At the top of the column should be Title. When you click on it, it should become an input, with Submit and Cancel buttons near it. After entering text in the input and clicking Submit - the Title of the column should change. **2 points**
- [x] The column should have a delete button. By clicking -> confirmation modal -> when approving -> deleting. **1 points**


### General requirements - 8/11 points

- [x] Backend error handling - (Not found, unhandled rejection, etc) should be performed in a user-friendly way (toast, pop-up or anything else you implement). **4 points**
- [ ] Localization **0/1 point**
- [x] Backend is deployed and publicly available **2 points**
- [x] Sticky header **2 points**
- [ ] Extra scope same complexity as Global search **0/2 points**
 

### Penalties - none
- [ ] React default favicon **- 1 points**
- [ ] The presence of errors and warnings in the console  **- 2 points** for each
- [ ] The presence in the console of the results of the console.log execution - **- 2 points** for each
- [ ] @ts-ignore or any usage (search through github repo) - **- 1 point** for each
- [ ] Making commits after the deadline - **- 20 points**  
 
