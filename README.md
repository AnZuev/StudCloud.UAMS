# Модули

## User
    
* [User](#module_User)
    * [~changePhoto(photoId)](#module_User..changePhoto)
    * [~changeGroup(newGroup)](#module_User..changeGroup)
    * [~changeUniversity(newUniversity)](#module_User..changeUniversity)
    * [~changeFaculty(newFaculty)](#module_User..changeFaculty)
    * [~changeYear(newYear)](#module_User..changeYear)
    * [~changeName(newName)](#module_User..changeName)
    * [~changeSurname(newSurname)](#module_User..changeSurname)
    * [~saveUser()](#module_User..saveUser) ⇒ <code>user</code>
    * [~checkPassword(password)](#module_User..checkPassword) ⇒ <code>boolean</code>
    * [~getAuthLevel()](#module_User..getAuthLevel) ⇒ <code>enum</code>
    * [~isInGroup(group)](#module_User..isInGroup) ⇒ <code>boolean</code>
    * [~requestMailConfirmation()](#module_User..requestMailConfirmation) ⇒ <code>string</code>
    * [~confirmMail(key)](#module_User..confirmMail) ⇒ <code>boolean</code>
    * [~requestMobileConfirmation()](#module_User..requestMobileConfirmation) ⇒ <code>string</code>
    * [~confirmMobile(key)](#module_User..confirmMobile) ⇒ <code>boolean</code>
    * [~requestPasswordChange()](#module_User..requestPasswordChange)
    * [~confirmPasswordToken(key)](#module_User..confirmPasswordToken) ⇒ <code>boolean</code>
    * [~getContactsByOneKey(key, context)](#module_User..getContactsByOneKey) ⇒ <code>promise</code>
    * [~getContactsByTwoKeys(key1, key2, context)](#module_User..getContactsByTwoKeys) ⇒ <code>promise</code>
    * [~getContactsByContext(context)](#module_User..getContactsByContext) ⇒ <code>promise</code>

## UAMS
    
* [UAMS](#module_UAMS)
    * [~UAMS](#module_UAMS..UAMS)
        * [.init()](#module_UAMS..UAMS+init)
        * [.getUserById(id)](#module_UAMS..UAMS+getUserById) ⇒ <code>user</code>
        * [.getUserByMail(mail)](#module_UAMS..UAMS+getUserByMail) ⇒ <code>user</code>
        * [.getUserByPhone(phone)](#module_UAMS..UAMS+getUserByPhone) ⇒ <code>user</code>
        * [.getUsersByKeyAndContext(key, context)](#module_UAMS..UAMS+getUsersByKeyAndContext) ⇒
        * [.getUsersByTwoKeysAndContext(key1, key2, context)](#module_UAMS..UAMS+getUsersByTwoKeysAndContext) ⇒
        * [.getUsersByUniversity(university)](#module_UAMS..UAMS+getUsersByUniversity) ⇒
        * [.getUsersByFaculty(faculty)](#module_UAMS..UAMS+getUsersByFaculty) ⇒
        * [.getUsersByGroup(university, faculty, group)](#module_UAMS..UAMS+getUsersByGroup) ⇒
        * [.getUsersByYear(year)](#module_UAMS..UAMS+getUsersByYear) ⇒
        * [.getUsersByMailConfirmation(skip)](#module_UAMS..UAMS+getUsersByMailConfirmation) ⇒
        * [.countUsersByMailConfirmation()](#module_UAMS..UAMS+countUsersByMailConfirmation) ⇒ <code>number</code>
        * [.getUsersByMobileConfirmation(skip)](#module_UAMS..UAMS+getUsersByMobileConfirmation) ⇒
        * [.countUsersByMobileConfirmation()](#module_UAMS..UAMS+countUsersByMobileConfirmation) ⇒ <code>number</code>
        * [.countNewUsersToday()](#module_UAMS..UAMS+countNewUsersToday) ⇒ <code>number</code>
        * [.countNewUsersThisWeek()](#module_UAMS..UAMS+countNewUsersThisWeek) ⇒ <code>number</code>
        * [.countNewUsersThisMonth()](#module_UAMS..UAMS+countNewUsersThisMonth) ⇒ <code>number</code>
        * [.countNewUsersThisYear()](#module_UAMS..UAMS+countNewUsersThisYear) ⇒ <code>number</code>
        * [.countAllUsers()](#module_UAMS..UAMS+countAllUsers) ⇒ <code>number</code>
        * [.createUser(authData)](#module_UAMS..UAMS+createUser) ⇒ <code>user</code>
        * [.blockUser(userId)](#module_UAMS..UAMS+blockUser) ⇒ <code>boolean</code>
        * [.removeUser(userId)](#module_UAMS..UAMS+removeUser) ⇒ <code>boolean</code>


# Методы

## &nbsp;&nbsp;User
  <a name="module_User..changePhoto"></a>

### User~changePhoto(photoId)
Изменить аватарку

**Kind**: inner method of <code>[User](#module_User)</code>  

| Param | Description |
| --- | --- |
| photoId | идентификатор фотографии на сервере статики |

<a name="module_User..changeGroup"></a>

### User~changeGroup(newGroup)
Изменить группу

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 400, номер группы совпадает со старым
- <code>ValidationError</code> 400, длина группы не может быть 0


| Param | Description |
| --- | --- |
| newGroup | новая группа |

<a name="module_User..changeUniversity"></a>

### User~changeUniversity(newUniversity)
Изменение университета

**Kind**: inner method of <code>[User](#module_User)</code>  

| Param | Description |
| --- | --- |
| newUniversity | идентификатор университета |

<a name="module_User..changeFaculty"></a>

### User~changeFaculty(newFaculty)
Изменение факультета

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 400, новый факультет совпадает со старым


| Param | Description |
| --- | --- |
| newFaculty | id нового факультета |

<a name="module_User..changeYear"></a>

### User~changeYear(newYear)
Изменение курса обучения

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 400 - переданное значение курса < 0 или больше 6


| Param | Description |
| --- | --- |
| newYear | новый курс |

<a name="module_User..changeName"></a>

### User~changeName(newName)
Изменение имени

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 400, Имя должно содержать хотя бы 2 символа


| Param | Description |
| --- | --- |
| newName | новое имя |

<a name="module_User..changeSurname"></a>

### User~changeSurname(newSurname)
Изменение имени

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 400, фамилия должна содержать хотя бы 2 символа


| Param | Description |
| --- | --- |
| newSurname | новая фамилия |

<a name="module_User..saveUser"></a>

### User~saveUser() ⇒ <code>user</code>
**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>user</code> - все прошло хорошо, вернулся объект типа user  
**Throws**:

- <code>DbError</code> 500, ошибка базы данных

**this**: <code>{User}</code>  
<a name="module_User..checkPassword"></a>

### User~checkPassword(password) ⇒ <code>boolean</code>
Check password

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>boolean</code> - . true - пароль верен, false - пароль неверен  

| Param | Description |
| --- | --- |
| password | пароль для проверки |

<a name="module_User..getAuthLevel"></a>

### User~getAuthLevel() ⇒ <code>enum</code>
Получение уровня авторизации

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>enum</code> - - 1, 2, 3, 4  
<a name="module_User..isInGroup"></a>

### User~isInGroup(group) ⇒ <code>boolean</code>
Пользователь принадлежит группе?

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>boolean</code> - , true - принадлежит, false - не принадлежит  

| Param | Description |
| --- | --- |
| group | группа |

<a name="module_User..requestMailConfirmation"></a>

### User~requestMailConfirmation() ⇒ <code>string</code>
Запрос создания ключа для подтверждения почты

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>string</code> - Новый ключ  
<a name="module_User..confirmMail"></a>

### User~confirmMail(key) ⇒ <code>boolean</code>
Подтверждение почты

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>boolean</code> - true - почта подтверждена, false - почта не подтверждена  
**Throws**:

- <code>ValidationError</code> - ключ не может быть пустым


| Param | Description |
| --- | --- |
| key | ключ для подтверждения(длина больше 0) |

<a name="module_User..requestMobileConfirmation"></a>

### User~requestMobileConfirmation() ⇒ <code>string</code>
Запрос ключа для подтверждения номера телефона

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>string</code> - - ключ  
<a name="module_User..confirmMobile"></a>

### User~confirmMobile(key) ⇒ <code>boolean</code>
Подтверждение мобильного телефона

**Kind**: inner method of <code>[User](#module_User)</code>  
**Returns**: <code>boolean</code> - true - номер телефона подтвержден, false - номер телефона не подтвержден  
**Throws**:

- <code>ValidationError</code> 400, ключ не может быть пустым


| Param | Description |
| --- | --- |
| key | ключ для подтверждения(длина больше 0) |

<a name="module_User..requestPasswordChange"></a>

### User~requestPasswordChange()
Запрос ключа для смены пароля

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 405, Для смены пароля необходимо, чтобы почта была подтверждена

<a name="module_User..confirmPasswordToken"></a>

### User~confirmPasswordToken(key) ⇒ <code>boolean</code>
Подтверждение смены пароля

**Kind**: inner method of <code>[User](#module_User)</code>  
**Throws**:

- <code>ValidationError</code> 400, ключ не может быть пустым


| Param | Description |
| --- | --- |
| key | ключ для подветржения |

<a name="module_User..getContactsByOneKey"></a>

### User~getContactsByOneKey(key, context) ⇒ <code>promise</code>
Получение контактов пользователя по ключу и контексту

**Kind**: inner method of <code>[User](#module_User)</code>  
**Fulfil**: <code>user</code> - объект вида user  
**Reject**: <code>DbError</code> 204, не найдено контактов  
**Reject**: <code>DbError</code> 500, ошибка базы данных  

| Param | Description |
| --- | --- |
| key | ключ(регулярное выражение) |
| context | объект. Поддерживаемые значения - university, faculty, year, group |

<a name="module_User..getContactsByTwoKeys"></a>

### User~getContactsByTwoKeys(key1, key2, context) ⇒ <code>promise</code>
Получение контактов пользователя по двум ключам и контексту

**Kind**: inner method of <code>[User](#module_User)</code>  
**Fulfil**: <code>user</code> - объект вида user  
**Reject**: <code>DbError</code> 204, не найдено контактов  
**Reject**: <code>DbError</code> 500, ошибка базы данных  

| Param | Description |
| --- | --- |
| key1 | ключ(регулярное выражение) |
| key2 | ключ(регулярное выражение) |
| context | объект. Поддерживаемые значения - university, faculty, year, group |

<a name="module_User..getContactsByContext"></a>

### User~getContactsByContext(context) ⇒ <code>promise</code>
Получение контактов пользователя по контексту

**Kind**: inner method of <code>[User](#module_User)</code>  
**Fulfil**: <code>user</code> - объект вида user  
**Reject**: <code>DbError</code> 204, не найдено контактов  
**Reject**: <code>DbError</code> 500, ошибка базы данных  

| Param | Description |
| --- | --- |
| context | объект. Поддерживаемые значения - university, faculty, year, group |

## &nbsp;&nbsp;UAMS
  <a name="module_UAMS..UAMS"></a>

### UAMS~UAMS
**Kind**: inner class of <code>[UAMS](#module_UAMS)</code>  
**this**: <code>{UAMS}</code>  

* [~UAMS](#module_UAMS..UAMS)
    * [.init()](#module_UAMS..UAMS+init)
    * [.getUserById(id)](#module_UAMS..UAMS+getUserById) ⇒ <code>user</code>
    * [.getUserByMail(mail)](#module_UAMS..UAMS+getUserByMail) ⇒ <code>user</code>
    * [.getUserByPhone(phone)](#module_UAMS..UAMS+getUserByPhone) ⇒ <code>user</code>
    * [.getUsersByKeyAndContext(key, context)](#module_UAMS..UAMS+getUsersByKeyAndContext) ⇒
    * [.getUsersByTwoKeysAndContext(key1, key2, context)](#module_UAMS..UAMS+getUsersByTwoKeysAndContext) ⇒
    * [.getUsersByUniversity(university)](#module_UAMS..UAMS+getUsersByUniversity) ⇒
    * [.getUsersByFaculty(faculty)](#module_UAMS..UAMS+getUsersByFaculty) ⇒
    * [.getUsersByGroup(university, faculty, group)](#module_UAMS..UAMS+getUsersByGroup) ⇒
    * [.getUsersByYear(year)](#module_UAMS..UAMS+getUsersByYear) ⇒
    * [.getUsersByMailConfirmation(skip)](#module_UAMS..UAMS+getUsersByMailConfirmation) ⇒
    * [.countUsersByMailConfirmation()](#module_UAMS..UAMS+countUsersByMailConfirmation) ⇒ <code>number</code>
    * [.getUsersByMobileConfirmation(skip)](#module_UAMS..UAMS+getUsersByMobileConfirmation) ⇒
    * [.countUsersByMobileConfirmation()](#module_UAMS..UAMS+countUsersByMobileConfirmation) ⇒ <code>number</code>
    * [.countNewUsersToday()](#module_UAMS..UAMS+countNewUsersToday) ⇒ <code>number</code>
    * [.countNewUsersThisWeek()](#module_UAMS..UAMS+countNewUsersThisWeek) ⇒ <code>number</code>
    * [.countNewUsersThisMonth()](#module_UAMS..UAMS+countNewUsersThisMonth) ⇒ <code>number</code>
    * [.countNewUsersThisYear()](#module_UAMS..UAMS+countNewUsersThisYear) ⇒ <code>number</code>
    * [.countAllUsers()](#module_UAMS..UAMS+countAllUsers) ⇒ <code>number</code>
    * [.createUser(authData)](#module_UAMS..UAMS+createUser) ⇒ <code>user</code>
    * [.blockUser(userId)](#module_UAMS..UAMS+blockUser) ⇒ <code>boolean</code>
    * [.removeUser(userId)](#module_UAMS..UAMS+removeUser) ⇒ <code>boolean</code>

<a name="module_UAMS..UAMS+init"></a>

#### UAMS.init()
Инициализация модуля. Здесь проверяем соединение к базе данных.

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Throws**:

- <code>Error</code> - не указано соединение для коллекции 'users'

<a name="module_UAMS..UAMS+getUserById"></a>

#### UAMS.getUserById(id) ⇒ <code>user</code>
Получение пользователя по id

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| id | идентификатор пользователя |

<a name="module_UAMS..UAMS+getUserByMail"></a>

#### UAMS.getUserByMail(mail) ⇒ <code>user</code>
Получение пользователя по почте

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| mail | почтовый адрес |

<a name="module_UAMS..UAMS+getUserByPhone"></a>

#### UAMS.getUserByPhone(phone) ⇒ <code>user</code>
Получение пользователя по номеру телефона

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>user</code> - объект типа user  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| phone | <code>string</code> | номер телефона |

<a name="module_UAMS..UAMS+getUsersByKeyAndContext"></a>

#### UAMS.getUsersByKeyAndContext(key, context) ⇒
Поиск пользователей по ключу и контексту.

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| key |  | регулярное выражение, сгенерированное на основе данных от пользователя. |
| context | <code>object</code> | контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string) |

<a name="module_UAMS..UAMS+getUsersByTwoKeysAndContext"></a>

#### UAMS.getUsersByTwoKeysAndContext(key1, key2, context) ⇒
Поиск пользователей по двум ключам и контексту

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| key1 |  | регулярное выражение, сгенерированное на основе данных от пользователя. |
| key2 |  | регулярное выражение, сгенерированное на основе данных от пользователя. |
| context | <code>object</code> | контекст поиска. Возможны проверти university(objectId), faculty(objectId), year(number), group(string) |

<a name="module_UAMS..UAMS+getUsersByUniversity"></a>

#### UAMS.getUsersByUniversity(university) ⇒
Поиск пользователей по университету

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| university | <code>Mongoose.Types.ObjectId</code> | id университета |

<a name="module_UAMS..UAMS+getUsersByFaculty"></a>

#### UAMS.getUsersByFaculty(faculty) ⇒
Поиск пользователей по факультету

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| faculty | <code>Mongoose.Types.ObjectId</code> | id факультета |

<a name="module_UAMS..UAMS+getUsersByGroup"></a>

#### UAMS.getUsersByGroup(university, faculty, group) ⇒
Поиск пользователей по группе

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| university | <code>Mongoose.Types.ObjectId</code> | id университета |
| faculty | <code>Mongoose.Types.ObjectId</code> | id факультета |
| group | <code>Mongoose.Types.ObjectId</code> | группа(string) |

<a name="module_UAMS..UAMS+getUsersByYear"></a>

#### UAMS.getUsersByYear(year) ⇒
Поиск пользователей по курсу

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Type | Description |
| --- | --- | --- |
| year | <code>Mongoose.Types.ObjectId</code> | год обучения(курс) |

<a name="module_UAMS..UAMS+getUsersByMailConfirmation"></a>

#### UAMS.getUsersByMailConfirmation(skip) ⇒
Поиск пользователей с подтвержденной почтой

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- ValidationError - 400, параметр skip < 0
- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| skip | сколько страниц сначала необходимо пропустить. На странице 20 элементов. |

<a name="module_UAMS..UAMS+countUsersByMailConfirmation"></a>

#### UAMS.countUsersByMailConfirmation() ⇒ <code>number</code>
Подсчет количества пользователей с подтвержденной почтой

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+getUsersByMobileConfirmation"></a>

#### UAMS.getUsersByMobileConfirmation(skip) ⇒
Поиск пользователей с подтвержденным номером телефона

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: [user] массив из объектов типа user, если хотя бы один пользователь найден  
**Throws**:

- ValidationError - 400, параметр skip < 0
- <code>DbError</code> - 204, не найдено пользователей, удовлетворяющих условиям
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| skip | сколько страниц сначала необходимо пропустить. На странице 20 элементов. |

<a name="module_UAMS..UAMS+countUsersByMobileConfirmation"></a>

#### UAMS.countUsersByMobileConfirmation() ⇒ <code>number</code>
Подсчет количества пользователей с подтвержденным номером телефона

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+countNewUsersToday"></a>

#### UAMS.countNewUsersToday() ⇒ <code>number</code>
Подсчет новых пользователей за сегодня

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+countNewUsersThisWeek"></a>

#### UAMS.countNewUsersThisWeek() ⇒ <code>number</code>
Подсчет новых пользователей за неделю

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+countNewUsersThisMonth"></a>

#### UAMS.countNewUsersThisMonth() ⇒ <code>number</code>
Подсчет новых пользователей за месяц

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+countNewUsersThisYear"></a>

#### UAMS.countNewUsersThisYear() ⇒ <code>number</code>
Подсчет новых пользователей за год

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+countAllUsers"></a>

#### UAMS.countAllUsers() ⇒ <code>number</code>
Подсчет новых пользователей за все время

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>number</code> - Количество пользователей  
**Throws**:

- <code>DbError</code> - 500, ошибка базы данных

<a name="module_UAMS..UAMS+createUser"></a>

#### UAMS.createUser(authData) ⇒ <code>user</code>
Создание нового пользователя

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
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

<a name="module_UAMS..UAMS+blockUser"></a>

#### UAMS.blockUser(userId) ⇒ <code>boolean</code>
Блокировка юзера

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>boolean</code> - true - все прошло хорошо  
**Throws**:

- <code>DbError</code> - 404, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| userId | идентификатор пользователя |

<a name="module_UAMS..UAMS+removeUser"></a>

#### UAMS.removeUser(userId) ⇒ <code>boolean</code>
Удаление пользователя по идентификатору

**Kind**: instance method of <code>[UAMS](#module_UAMS..UAMS)</code>  
**Returns**: <code>boolean</code> - true - все прошло хорошо  
**Throws**:

- <code>DbError</code> - 400, пользователь не найден
- <code>DbError</code> - 500, ошибка базы данных


| Param | Description |
| --- | --- |
| userId | идентификатор пользователя |


