- PR Link: https://github.com/Alex99like/management-app/pull/45
- Deploy: https://management-project-application-5lfl.vercel.app/

> ### Points: 56/60
> Основной отзыв:
> Довольно красивая работа. Но есть не удобные моменты, некоторые вне баллов. Сообщения валидации полей везде не user-friendly, никогда не поймешь почему ник 11qwerty не подходит.
Иногда не успевает обновится драг н дроп, два раза даже ошибку запроса в консоль ловил, но это не учитываю.
Не удобные кнопки добавления задач и столбцов, ибо до них нужно скролить при большом количесве контента (и внутри колонок, и сами колонки).
Странное отсутствие возможности редактирование и удаления доски с доски.
Не удобно ограничение по длине описания задачи/доски, но обязательность этого поля (хотя мб это и ограничение бэка).
В общем это наверное все неудобные моменты если рассматривать работу как PM. В остальном (стилистика, анимации) всё красиво, это факт) Однако на лоудер надо предупреждение про эпилепсию) резковат.
 

### Welcome route - max 7 points

- [x] The welcome page should contain general information about the developer, project, and course. **1 point**
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. **1 point**
- [x] If login token is valid and unexpired, change buttons Sign In and Sign Up on "Go to Main Page" button. **2 points**
- [x] When the token expires - the user should be redirected to the "Welcome page" automatically. **2 points**
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. **1 point**
> Отзыв по разделу: всё ок
> > SCORE: + 7

### Sign In / Sign Up  - max 8 points

- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **2 points**
- [ ] Form fields should be implemented according to the backend API. Validation should be implemented. **4 points**
- [x] Upon successful login, the user should be redirected to "Main route" **1 point**
- [x] If user already logged in and he try to reach this routes - he should be redirected to Main route. **1 point**
> Отзыв по разделу: 
> - За форму сняли ~~2 балла~~ 1 балл, ибо сообщения валидации для пользователя не достаточно информативны, не понятно что можно ввести, а что нет.
> > SCORE: + 7

### Main route - max 8 points

- [x] Board creation functionality **2 points**
- [x] Displays all created boards as a list/grid **1 point**
- [x] Each board in the list is displayed with a small preview of available information (title, description, etc). By clicking an element the user navigates to the board item (Board route). There's also a button for board deletion. **1 point**
- [x] When trying to delete the board, we should receive a confirmation modal. The confirmation modal must be a generic component (one for the entire application). **1 points**
- [x] The user profile editing functionality is implemented. **3 points**
> Отзыв по разделу: 
> Есть недочёты не по баллам, а скорее логичеческие.
> - Сообщения валидации полей при создании/редактировании досок страдают той же болезнью, что и в другим местах - не особо информативные.
> - В редактировании профиля давать возможность менять пароль без подтверждения старым паролем - не лучшая практика.
> > SCORE: + 8

### Board route - max 26 points

- [x] Button for column creation is displayed **1 point**
- [x] If a board contains at least one column - a button for task creation is displayed/become enabled as well **1 points**
- [x] A modal windows with forms is displayed for column and task creations  **3 points**
- [x] A vertical scrollbar is displayed in the column when overflowing with the number of column tasks  **2 points**
- [x] The page itself on the current route doesn't have a vertical scrollbar **1 points**
- [x] With the help of drag-n-drop, we can swap columns. **3 points**
- [x] With the help of drag-n-drop, we can change the order of tasks within a column.  **3 points**
- [x] With the help of drag-n-drop, we can change the task belonging to the column.  **5 points**
- [ ] The functionality of viewing and editing of the task has been implemented. **3 points**
- [x] The task must have a delete task button. On click: confirmation modal -> delete.  **1 points**
- [x] At the top of the column should be Title. When you click on it, it should become an input, with Submit and Cancel buttons near it. After entering text in the input and clicking Submit - the Title of the column should change. **2 points**
- [x] The column should have a delete button. By clicking -> confirmation modal -> when approving -> deleting. **1 points**
> Отзыв по разделу: 
> - нет просмотра задачи (-1)
> - очень не удобно, что нужно скролить таски до конца чтобы добавить новую если их много, и что для создания новой колонки надо полностью крутить страницу если их много. 
> - иногда изменения перетаскивания колонок не отображается (перетащил - она обратно перескочила, но после обновления страницы находится на том месте куда перетащил), иногда колонки не удаляются визуально (если например нажать удаление, отменить, потом попробовать ещё раз, удаление судя по запросам и тосту происходит, но можно нажать удалить ещё раз, только теперь уже без тоста).
> > SCORE: + 25

### General requirements - max 11 points

- [x] Backend error handling - (Not found, unhandled rejection, etc) should be performed in a user-friendly way (toast, pop-up or anything else you implement). **4 points**
- [x] Localization **1 point**
- [x] Backend is deployed and publicly available **2 points**
- [x] Sticky header **2 points**
- [ ] Extra scope same complexity as Global search **2 points**
> Отзыв по разделу: 
> 1. Отсутствует возможность изменить язык приложения до авторизации (недочёт без снятия баллов).
> 2. В задании предлагалось реализовать доп. функционал по сложности аля глобального поиска, нам кажется делался акцент именно на доп. функционале работы с api, а не на визуальном доп. функционале, поэтому не зачли.
> > SCORE: + 9

### Penalties
- [ ] React default favicon **- 1 points**
- [ ] The presence of errors and warnings in the console  **- 2 points** for each
- [ ] The presence in the console of the results of the console.log execution - **- 2 points** for each
- [ ] @ts-ignore or any usage (search through github repo) - **- 1 point** for each
- [ ] Making commits after the deadline - **- 20 points**  
> Отзыв по разделу: 
> ок
> > SCORE: 0
