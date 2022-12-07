- PR Link: https://github.com/EugeneTsalko/project-management-app/pull/12
- Deploy: https://kanban-app-rsschool.netlify.app/

 ## Points: 53/60


### Welcome route -  6/7 points

- [x] The welcome page should contain general information about the developer, project, and course. **1 point**
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. **1 point**
- [x] If login token is valid and unexpired, change buttons Sign In and Sign Up on "Go to Main Page" button. **2 points**
- [ ] When the token expires - the user should be redirected to the "Welcome page" automatically. **1/2 points**
> Проверка токена производится единожды при монтировании компонента App - если токен истечет посреди сессии, автоматический редирект не произойдет
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. **1 point**


### Sign In / Sign Up  - 8 points

- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **2 points**
- [x] Form fields should be implemented according to the backend API. Validation should be implemented. **4 points**
- [x] Upon successful login, the user should be redirected to "Main route" **1 point**
- [x] If user already logged in and he try to reach this routes - he should be redirected to Main route. **1 point**


### Main route -  8 points

- [x] Board creation functionality **2 points**
- [x] Displays all created boards as a list/grid **1 point**
- [x] Each board in the list is displayed with a small preview of available information (title, description, etc). By clicking an element the user navigates to the board item (Board route). There's also a button for board deletion. **1 point**
- [x] When trying to delete the board, we should receive a confirmation modal. The confirmation modal must be a generic component (one for the entire application). **1 points**
- [x] The user profile editing functionality is implemented. **3 points**


### Board route -  21/26 points

- [x] Button for column creation is displayed **1 point**
- [x] If a board contains at least one column - a button for task creation is displayed/become enabled as well **1 points**
- [x] A modal windows with forms is displayed for column and task creations  **3 points**
- [x] A vertical scrollbar is displayed in the column when overflowing with the number of column tasks  **2 points**
- [x] The page itself on the current route doesn't have a vertical scrollbar **1 points**
- [x] With the help of drag-n-drop, we can swap columns. **3 points**
- [x] With the help of drag-n-drop, we can change the order of tasks within a column.  **3 points**
- [ ] With the help of drag-n-drop, we can change the task belonging to the column.  **0/5 points**
> Нельзя перенести задачу в другой столбец
- [x] The functionality of viewing and editing of the task has been implemented. **3 points**
- [x] The task must have a delete task button. On click: confirmation modal -> delete.  **1 points**
- [x] At the top of the column should be Title. When you click on it, it should become an input, with Submit and Cancel buttons near it. After entering text in the input and clicking Submit - the Title of the column should change. **2 points**
- [x] The column should have a delete button. By clicking -> confirmation modal -> when approving -> deleting. **1 points**



### General requirements - 10/11 points

- [x] Backend error handling - (Not found, unhandled rejection, etc) should be performed in a user-friendly way (toast, pop-up or anything else you implement). **4 points**
- [x] Localization **1 point**
- [x] Backend is deployed and publicly available **2 points**
- [x] Sticky header **2 points**
- [ ] Extra scope same complexity as Global search **1/2 points**
> Отзыв по разделу:  у вас не глобальный поиск, это поиск только по задачам одной доски, по этому 1 балл
> - Отзыв badikgit: Да, доп. функционал не глобальны поиск, а поиск по задачам на доске, но не согласен со снятием балла именно по этой причине, так как делается отдельный запрос на сервер на получение тасок, как это было бы при глобальном поиске. Т.е. сложность на мой взгляд соответствует сложности реализации глобального поиска, который был приведён только в качестве примера, там тоже вполне возможно было бы уложиться в 1 запрос. Но у меня скорее вопрос к не продуманности реализации, а именно отсутствию рабочей возможности сброса результата этого поиска без перезагрузки страницы или повторного входа на неё, хотя вроде как и есть крестик, и отправлятся пустой запрос. Также добавление этого дополнительного функционала в момент отображения поиска может привести к проблемам неочевидности формирования порядка колонок, т.к. у пользователя доступна возможность в этом режиме создать ещё одну колонку, она отобразится, как последняя в данный момент, но при обновлении боарда нет гарантии что она останется последней когда видны все колонки или будет на месте на котором она была в момент создания. Возможно лучшим решением было бы блокировать возможность создания колонок, пока показываются результаты поиска. Именно по этим причинам я бы снял 1 балл, за непродумманность вариантов использования, раз добавляется функционал, который может привести к непоняткам в основном функционале формирования колонок доски. 


### Penalties - none
- [ ] React default favicon **- 1 points**
- [ ] The presence of errors and warnings in the console  **- 2 points** for each
- [ ] The presence in the console of the results of the console.log execution - **- 2 points** for each
- [ ] @ts-ignore or any usage (search through github repo) - **- 1 point** for each
- [ ] Making commits after the deadline - **- 20 points**  

