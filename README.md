## UAMS

## &nbsp;&nbsp;UAMS
  <a name="module_UAMS..UAMS"></a>

### UAMS~UAMS
**Kind**: inner class of <code>[UAMS](#module_UAMS)</code>  
**this**: <code>{UAMS}</code>  

* [~UAMS](#module_UAMS..UAMS)
    * [.configure(config)](#module_UAMS..UAMS.configure)
    * [.getUserById(id)](#module_UAMS..UAMS.getUserById) ⇒ <code>user</code>
    * [.getUserByMail(mail)](#module_UAMS..UAMS.getUserByMail) ⇒ <code>user</code>
    * [.getUserByPhone(phone)](#module_UAMS..UAMS.getUserByPhone) ⇒ <code>user</code>
    * [.getUsersByKeyAndContext(key, context)](#module_UAMS..UAMS.getUsersByKeyAndContext) ⇒
    * [.getUsersByTwoKeysAndContext(key1, key2, context)](#module_UAMS..UAMS.getUsersByTwoKeysAndContext) ⇒
    * [.getUsersByUniversity(university)](#module_UAMS..UAMS.getUsersByUniversity) ⇒
    * [.getUsersByFaculty(faculty)](#module_UAMS..UAMS.getUsersByFaculty) ⇒
    * [.getUsersByGroup(university, faculty, group)](#module_UAMS..UAMS.getUsersByGroup) ⇒
    * [.getUsersByYear(year)](#module_UAMS..UAMS.getUsersByYear) ⇒
    * [.getUsersByMailConfirmation(skip)](#module_UAMS..UAMS.getUsersByMailConfirmation) ⇒
    * [.countUsersByMailConfirmation()](#module_UAMS..UAMS.countUsersByMailConfirmation) ⇒ <code>number</code>
    * [.getUsersByMobileConfirmation(skip)](#module_UAMS..UAMS.getUsersByMobileConfirmation) ⇒
    * [.countUsersByMobileConfirmation()](#module_UAMS..UAMS.countUsersByMobileConfirmation) ⇒ <code>number</code>
    * [.countNewUsersToday()](#module_UAMS..UAMS.countNewUsersToday) ⇒ <code>number</code>
    * [.countNewUsersThisWeek()](#module_UAMS..UAMS.countNewUsersThisWeek) ⇒ <code>number</code>
    * [.countNewUsersThisMonth()](#module_UAMS..UAMS.countNewUsersThisMonth) ⇒ <code>number</code>
    * [.countNewUsersThisYear()](#module_UAMS..UAMS.countNewUsersThisYear) ⇒ <code>number</code>
    * [.countAllUsers()](#module_UAMS..UAMS.countAllUsers) ⇒ <code>number</code>
    * [.createUser(authData)](#module_UAMS..UAMS.createUser) ⇒ <code>user</code>
    * [.blockUser(userId)](#module_UAMS..UAMS.blockUser) ⇒ <code>boolean</code>
    * [.removeUser(userId)](#module_UAMS..UAMS.removeUser) ⇒ <code>boolean</code>

<a name="module_UAMS..UAMS.configure"></a>

#### UAMS.configure(config)
Инициализация модуля. Здесь происходит попытка подключиться к бд,
 используя данные из конфига, а после происходит привязка модели
 User к данному подключению

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Throws**:

- <code>Error</code> - не указано соединение для коллекции 'users'


| Param | Description |
| --- | --- |
| config | конфигурация типа nconf |

<a name="module_UAMS..UAMS.getUserById"></a>

#### UAMS.getUserById(id) ⇒ <code>user</code>
Получение пользователя по id

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| id | идентификатор пользователя |

<a name="module_UAMS..UAMS.getUserByMail"></a>

#### UAMS.getUserByMail(mail) ⇒ <code>user</code>
Получение пользователя по почте

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| mail | почтовый адрес |

<a name="module_UAMS..UAMS.getUserByPhone"></a>

#### UAMS.getUserByPhone(phone) ⇒ <code>user</code>
Получение пользователя по номеру телефона

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| phone | <code>string</code> | номер телефона |

<a name="module_UAMS..UAMS.getUsersByKeyAndContext"></a>

#### UAMS.getUsersByKeyAndContext(key, context) ⇒
Поиск пользователей по ключу и контексту.

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| key |  | регулярное выражение, сгенерированное на основе данных от пользователя. |
| context | <code>object</code> | контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string) |

<a name="module_UAMS..UAMS.getUsersByTwoKeysAndContext"></a>

#### UAMS.getUsersByTwoKeysAndContext(key1, key2, context) ⇒
Поиск пользователей по двум ключам и контексту

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| key1 |  | регулярное выражение, сгенерированное на основе данных от пользователя. |
| key2 |  | регулярное выражение, сгенерированное на основе данных от пользователя. |
| context | <code>object</code> | контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string) |

<a name="module_UAMS..UAMS.getUsersByUniversity"></a>

#### UAMS.getUsersByUniversity(university) ⇒
Поиск пользователей по университету

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| university | <code>Mongoose.Types.ObjectId</code> | id университета |

<a name="module_UAMS..UAMS.getUsersByFaculty"></a>

#### UAMS.getUsersByFaculty(faculty) ⇒
Поиск пользователей по факультету

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| faculty | <code>Mongoose.Types.ObjectId</code> | id факультета |

<a name="module_UAMS..UAMS.getUsersByGroup"></a>

#### UAMS.getUsersByGroup(university, faculty, group) ⇒
Поиск пользователей по группе

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| university | <code>Mongoose.Types.ObjectId</code> | id университета |
| faculty | <code>Mongoose.Types.ObjectId</code> | id факультета |
| group | <code>Mongoose.Types.ObjectId</code> | группа(string) |

<a name="module_UAMS..UAMS.getUsersByYear"></a>

#### UAMS.getUsersByYear(year) ⇒
Поиск пользователей по курсу

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| year | <code>Mongoose.Types.ObjectId</code> | год обучения(курс) |

<a name="module_UAMS..UAMS.getUsersByMailConfirmation"></a>

#### UAMS.getUsersByMailConfirmation(skip) ⇒
Поиск пользователей с подтвержденной почтой

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- ValidationError - 400, параметр skip < 0
- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| skip | сколько страниц сначала необходимо пропустить. На странице 20 элементов. |

<a name="module_UAMS..UAMS.countUsersByMailConfirmation"></a>

#### UAMS.countUsersByMailConfirmation() ⇒ <code>number</code>
Подсчет количества пользователей с подтвержденной почтой

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.getUsersByMobileConfirmation"></a>

#### UAMS.getUsersByMobileConfirmation(skip) ⇒
Поиск пользователей с подтвержденным номером телефона

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- ValidationError - 400, параметр skip < 0
- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| skip | сколько страниц сначала необходимо пропустить. На странице 20 элементов. |

<a name="module_UAMS..UAMS.countUsersByMobileConfirmation"></a>

#### UAMS.countUsersByMobileConfirmation() ⇒ <code>number</code>
Подсчет количества пользователей с подтвержденным номером телефона

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.countNewUsersToday"></a>

#### UAMS.countNewUsersToday() ⇒ <code>number</code>
Подсчет новых пользователей за сегодня

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.countNewUsersThisWeek"></a>

#### UAMS.countNewUsersThisWeek() ⇒ <code>number</code>
Подсчет новых пользователей за неделю

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.countNewUsersThisMonth"></a>

#### UAMS.countNewUsersThisMonth() ⇒ <code>number</code>
Подсчет новых пользователей за месяц

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.countNewUsersThisYear"></a>

#### UAMS.countNewUsersThisYear() ⇒ <code>number</code>
Подсчет новых пользователей за год

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.countAllUsers"></a>

#### UAMS.countAllUsers() ⇒ <code>number</code>
Подсчет новых пользователей за все время

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS.createUser"></a>

#### UAMS.createUser(authData) ⇒ <code>user</code>
Создание нового пользователя

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user, если все прошло успешно  
**Throws**:

- <code>ValidationError</code> 400, Mail is incorrect - длина почты меньше 5
- <code>ValidationError</code> 400, Password is too weak - длина пароля меньше 5
- <code>ValidationError</code> 400, Incorrect personal info - имя или фамилия не переданы
- <code>AuthError</code> 400, mail {mail} already in use - почта уже кем-то используется
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| authData | данные для авторизации. Пропирти можно увидеть в пункте properties |

**Properties**

| Name | Description |
| --- | --- |
| mail | почтовый адрес |
| password | пароль |
| name | имя пользователя |
| surname | пароль |

<a name="module_UAMS..UAMS.blockUser"></a>

#### UAMS.blockUser(userId) ⇒ <code>boolean</code>
Блокировка юзера

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>boolean</code> - true - все прошло хорошо  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| userId | идентификатор пользователя |

<a name="module_UAMS..UAMS.removeUser"></a>

#### UAMS.removeUser(userId) ⇒ <code>boolean</code>
Удаление пользователя по идентификатору

**Kind**: static method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>boolean</code> - true - все прошло хорошо  
**Throws**:

- <code>DbError</code> - 400, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| userId | идентификатор пользователя |

<a name="module_UAMS..User"></a>

### UAMS~User
**Kind**: inner class of <code>[UAMS](#module_UAMS)</code>  
**Access:** public  

* [~User](#module_UAMS..User)
    * [.changePhoto(photoId)](#module_UAMS..User+changePhoto)
    * [.changeGroup(newGroup)](#module_UAMS..User+changeGroup)
    * [.changeUniversity(newUniversity)](#module_UAMS..User+changeUniversity)
    * [.changeFaculty(newFaculty)](#module_UAMS..User+changeFaculty)
    * [.changeYear(newYear)](#module_UAMS..User+changeYear)
    * [.changeName(newName)](#module_UAMS..User+changeName)
    * [.changeSurname(newSurname)](#module_UAMS..User+changeSurname)
    * [.format()](#module_UAMS..User+format) ⇒ <code>Object</code> &#124; <code>\*</code>
    * [.saveUser()](#module_UAMS..User+saveUser) ⇒ <code>user</code>
    * [.getAuthLevel()](#module_UAMS..User+getAuthLevel) ⇒ <code>number</code>
    * [.isInGroup(group)](#module_UAMS..User+isInGroup) ⇒ <code>boolean</code>
    * [.requestMailConfirmation()](#module_UAMS..User+requestMailConfirmation) ⇒ <code>string</code>
    * [.confirmMail(key)](#module_UAMS..User+confirmMail) ⇒ <code>boolean</code>
    * [.requestMobileConfirmation()](#module_UAMS..User+requestMobileConfirmation) ⇒ <code>string</code>
    * [.confirmMobile(key)](#module_UAMS..User+confirmMobile) ⇒ <code>boolean</code>
    * [.requestPasswordChange()](#module_UAMS..User+requestPasswordChange)
    * [.confirmPasswordToken(key)](#module_UAMS..User+confirmPasswordToken) ⇒ <code>boolean</code>
    * [.setNewPassword(password)](#module_UAMS..User+setNewPassword) ⇒ <code>void</code>
    * [.getContactsByOneKey(key, context)](#module_UAMS..User+getContactsByOneKey) ⇒ <code>promise</code>
    * [.getContactsByTwoKeys(key1, key2, context)](#module_UAMS..User+getContactsByTwoKeys) ⇒ <code>promise</code>
    * [.getContactsByContext(context)](#module_UAMS..User+getContactsByContext) ⇒ <code>promise</code>

<a name="module_UAMS..User+changePhoto"></a>

#### user.changePhoto(photoId)
Изменить аватарку

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  

| Param | Description |
| --- | --- |
| photoId | идентификатор фотографии на сервере статики |

<a name="module_UAMS..User+changeGroup"></a>

#### user.changeGroup(newGroup)
Изменить группу

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 400, номер группы совпадает со старым
- <code>ValidationError</code> 400, длина группы не может быть 0


| Param | Description |
| --- | --- |
| newGroup | новая группа |

<a name="module_UAMS..User+changeUniversity"></a>

#### user.changeUniversity(newUniversity)
Изменение университета

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**this**: <code>User</code>  

| Param | Type | Description |
| --- | --- | --- |
| newUniversity | <code>void</code> | идентификатор университета return |

<a name="module_UAMS..User+changeFaculty"></a>

#### user.changeFaculty(newFaculty)
Изменение факультета

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 400, новый факультет совпадает со старым

**this**: <code>User</code>  

| Param | Description |
| --- | --- |
| newFaculty | id нового факультета |

<a name="module_UAMS..User+changeYear"></a>

#### user.changeYear(newYear)
Изменение курса обучения

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 400 - переданное значение курса < 0 или больше 6


| Param | Description |
| --- | --- |
| newYear | новый курс |

<a name="module_UAMS..User+changeName"></a>

#### user.changeName(newName)
Изменение имени

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 400, Имя должно содержать хотя бы 2 символа

**this**: <code>{User}</code>  

| Param | Description |
| --- | --- |
| newName | новое имя |

<a name="module_UAMS..User+changeSurname"></a>

#### user.changeSurname(newSurname)
Изменение имени

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 400, фамилия должна содержать хотя бы 2 символа

**this**: <code>{User}</code>  

| Param | Description |
| --- | --- |
| newSurname | новая фамилия |

<a name="module_UAMS..User+format"></a>

#### user.format() ⇒ <code>Object</code> &#124; <code>\*</code>
Форматирование юзера к виду

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**this**: <code>{User}</code>  
**Example**  
```js
yield* user.format()
// result

{
     id: 5747521bf58f75460d9f5960,
     name: 'Антон',
     surname: 'Ильин',
     photo: '',
     year: 1,
     group: '4304',
     faculty: 'Компьютерные технологии',
     university: 'СПБГЭТУ Лэти'
}
```
<a name="module_UAMS..User+saveUser"></a>

#### user.saveUser() ⇒ <code>user</code>
**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>user</code> - все прошло хорошо, вернулся объект типа user  
**Throws**:

- <code>DbError</code> 500, ошибка базы данных

**this**: <code>{User}</code>  
<a name="module_UAMS..User+getAuthLevel"></a>

#### user.getAuthLevel() ⇒ <code>number</code>
Получение уровня авторизации

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>number</code> - - 1, 2, 3, 4  
**this**: <code>{User}</code>  
<a name="module_UAMS..User+isInGroup"></a>

#### user.isInGroup(group) ⇒ <code>boolean</code>
Пользователь принадлежит группе?

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>boolean</code> - , true - принадлежит, false - не принадлежит  
**this**: <code>{User}</code>  

| Param | Description |
| --- | --- |
| group | группа |

<a name="module_UAMS..User+requestMailConfirmation"></a>

#### user.requestMailConfirmation() ⇒ <code>string</code>
Запрос создания ключа для подтверждения почты

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>string</code> - Новый ключ  
**this**: <code>User</code>  
<a name="module_UAMS..User+confirmMail"></a>

#### user.confirmMail(key) ⇒ <code>boolean</code>
Подтверждение почты

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>boolean</code> - true - почта подтверждена, false - почта не подтверждена  
**Throws**:

- <code>ValidationError</code> - ключ не может быть пустым

**this**: <code>User</code>  

| Param | Description |
| --- | --- |
| key | ключ для подтверждения(длина больше 0) |

<a name="module_UAMS..User+requestMobileConfirmation"></a>

#### user.requestMobileConfirmation() ⇒ <code>string</code>
Запрос ключа для подтверждения номера телефона

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>string</code> - - ключ  
**this**: <code>User</code>  
<a name="module_UAMS..User+confirmMobile"></a>

#### user.confirmMobile(key) ⇒ <code>boolean</code>
Подтверждение мобильного телефона

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>boolean</code> - true - номер телефона подтвержден, false - номер телефона не подтвержден  
**Throws**:

- <code>ValidationError</code> 400, ключ не может быть пустым

**this**: <code>User</code>  

| Param | Description |
| --- | --- |
| key | ключ для подтверждения(длина больше 0) |

<a name="module_UAMS..User+requestPasswordChange"></a>

#### user.requestPasswordChange()
Запрос ключа для смены пароля

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 405, Для смены пароля необходимо, чтобы почта была подтверждена

**this**: <code>User</code>  
<a name="module_UAMS..User+confirmPasswordToken"></a>

#### user.confirmPasswordToken(key) ⇒ <code>boolean</code>
Подтверждение смены пароля

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Returns**: <code>boolean</code> - true - ключ подходит, false - ключ не подходит  
**Throws**:

- <code>ValidationError</code> 400, ключ не может быть пустым

**this**: <code>User</code>  

| Param | Description |
| --- | --- |
| key | ключ для подветржения |

<a name="module_UAMS..User+setNewPassword"></a>

#### user.setNewPassword(password) ⇒ <code>void</code>
Установка нового пароля

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**Throws**:

- <code>ValidationError</code> 400, пароль не может быть короче 5 символов

**this**: <code>User</code>  

| Param | Description |
| --- | --- |
| password | новый парол |

<a name="module_UAMS..User+getContactsByOneKey"></a>

#### user.getContactsByOneKey(key, context) ⇒ <code>promise</code>
Получение контактов пользователя по ключу и контексту

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**this**: <code>User</code>  
**Fulfil**: <code>user</code> - объект вида user  
**Reject**: <code>DbError</code> 204, не найдено контактов  
**Reject**: <code>DbError</code> 500, ошибка базы данных  

| Param | Description |
| --- | --- |
| key | ключ(регулярное выражение) |
| context | объект. Поддерживаемые значения - university, faculty, year, group |

<a name="module_UAMS..User+getContactsByTwoKeys"></a>

#### user.getContactsByTwoKeys(key1, key2, context) ⇒ <code>promise</code>
Получение контактов пользователя по двум ключам и контексту

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**this**: <code>User</code>  
**Fulfil**: <code>user</code> - объект вида user  
**Reject**: <code>DbError</code> 204, не найдено контактов  
**Reject**: <code>DbError</code> 500, ошибка базы данных  

| Param | Description |
| --- | --- |
| key1 | ключ(регулярное выражение) |
| key2 | ключ(регулярное выражение) |
| context | объект. Поддерживаемые значения - university, faculty, year, group |

<a name="module_UAMS..User+getContactsByContext"></a>

#### user.getContactsByContext(context) ⇒ <code>promise</code>
Получение контактов пользователя по контексту

**Kind**: instance method of <code>[User](#module_UAMS..User)</code>  
**this**: <code>User</code>  
**Fulfil**: <code>user</code> - объект вида user  
**Reject**: <code>DbError</code> 204, не найдено контактов  
**Reject**: <code>DbError</code> 500, ошибка базы данных  

| Param | Description |
| --- | --- |
| context | объект. Поддерживаемые значения - university, faculty, year, group |

