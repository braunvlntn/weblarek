https://github.com/braunvlntn/weblarek

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

#### Интерфейс IProduct

Описывает структуру данных товара.

Поля интерфейса:

`id: string` - уникальный ID товара;
`description: string` - описание товара;
`image: string` - URL изображения товара;
`title: string` - наименование товара;
`category: string` - категория товара;
`price: number | null` - стоимость.

#### Интерфейс IBuyer

Описывает структуру данных покупателя.

Поля интерфейса:

`payment: TPayment` - способ оплаты;
`email: string` - адрес электронной почты;
`phone: string` - номер телефона;
`address: string` - адрес доставки.

### Модели данных

#### Класс ProductCatalog

Реализует хранение и обработку товаров, доступных для покупки.

Конструктор:
`constructor(products: IProduct[])` - в конструктор передается массив товаров.

Поля класса:
`products: IProduct[]` - массив товаров.
`selectedProduct: TSelectedProduct` - товар, выбранного для подробного отображения.

Методы класса:
`setProducts(products: IProduct[]): void` - сохранение массива товаров полученного в параметрах метода;
`getProducts(): IProduct[]` - получение массива товаров из модели;
`getProductById(productId: IProduct["id"]): IProduct` - получение одного товара по его id;
`setSelectedProduct(product: IProduct): void` - сохранение товара для подробного отображения;
`getSelectedProduct(): TSelectedProduct` - получение товара для подробного отображения.

#### Класс Cart

Реализует хранение массива товаров, выбранных покупателем для покупки.

Поля класса:
`products: IProduct[]` - массив товаров, добавленных в корзину.

Методы класса:
`getProducts(): IProduct[]` - получение массива товаров, которые находятся в корзине;
`addProduct(product: IProduct): void` - добавление товара, который был получен в параметре, в массив корзины;
`removeProduct(productId: IProduct["id"]): void` - удаление товара, полученного в параметре из массива корзины;
`clearProducts(): void` - очистка корзины;
`getAllProductsCost(): number` - получение стоимости всех товаров в корзине;
`getAllProductsNumber(): number` - получение количества товаров в корзине;
`checkProductExistence(productId: IProduct["id"]): IProduct | null` - проверка наличия товара в корзине по его id, полученного в параметр метода.

#### Класс Buyer

Реализует интерфейс `IBuyer`, обеспечивает работу с информацией о покупателе и способом оплаты.

Методы класса:
`setAddress(address: IBuyer["address"]): void` - устанавливает адрес доставки;
`setPhone(phone: IBuyer["phone"]): void` - устанавливает номер телефона;
`setEmail(email: IBuyer["email"]): void` - устанавливает адрес электронной почты;
`setPayment(payment: IBuyer["payment"]): void` - устанавливает способ оплаты;
`getAddress(): IBuyer["address"]` - возвращает адрес доставки;
`getPhone(): IBuyer["phone"]` - возвращает номер телефона;
`getEmail(): IBuyer["email"]` - возвращает адрес электронной почты;
`getPayment(): IBuyer["payment"]` - возвращает способ оплаты;
`getBuyerData(): IBuyer` - возвращает всю информацию и пользователе;
`clearBuyerData(): void` - очистка данных покупателя;
`validateBuyerData(): Partial<Record<keyof IBuyer, string>>` - возвращает объект, содержащий некорректно заполненные поля с информацией об ошибке.

### Слой коммуникации

#### Класс DataFetcher

Конструктор:
`constructor(api: IApi)` - в конструктор передается объект с методами для получения и отправки данных.

Методы класса:
`fetchProducts(): Promise<IProduct[]>` - получает список товаров;
`postOrder(buyer: IBuyer, total: number, products: IProduct["id"][]): Promise<void>` - отправляет данные для оформления заказа.

### Слой представления

#### Класс ProductCardBaseView

Является базовым классом для всех типов карточек товара. Наследуется от `Component<IProduct>`.

Конструктор:
`constructor(container: HTMLElement)` - принимает DOM-элемент контейнера карточки.

Поля класса:
`_title: HTMLElement` - элемент заголовка карточки;
`_price: HTMLElement | null` - элемент цены товара.

Методы класса:
`set title(value: string): void` - устанавливает текст заголовка карточки;
`set price(value: number | null): void` - устанавливает цену товара. Если значение `null`, отображается текст "Бесценно";
`protected _getCategoryClass(category: string): string` - возвращает CSS-класс для категории товара на основе маппинга из `categoryMap`.

#### Класс ProductCardCatalogView

Реализует отображение карточки товара в каталоге. Наследуется от `ProductCardBaseView`.

Конструктор:
`constructor(container: HTMLElement, actions?: IProductCardActions)` - принимает DOM-элемент контейнера карточки и опциональный объект с обработчиками событий.

Поля класса:
`_image: HTMLImageElement` - элемент изображения товара;
`_category: HTMLElement` - элемент категории товара;
`_button: HTMLButtonElement | null` - кнопка для взаимодействия с карточкой.

Методы класса:
`set image(value: string): void` - устанавливает URL изображения товара;
`set category(value: keyof typeof categoryMap): void` - устанавливает категорию товара и соответствующий CSS-класс.

#### Интерфейс IProductCardActions

Описывает структуру обработчиков событий для карточки товара.

Поля интерфейса:
`onClick: (event: MouseEvent) => void` - обработчик клика по карточке товара.

#### Класс ModalView

Реализует отображение модального окна. Наследуется от `Component<IModalData>`.

Конструктор:
`constructor(container: HTMLElement)` - принимает DOM-элемент контейнера модального окна.

Поля класса:
`_closeButton: HTMLButtonElement` - кнопка закрытия модального окна;
`_content: HTMLElement` - контейнер для содержимого модального окна.

Методы класса:
`set content(value: HTMLElement): void` - устанавливает содержимое модального окна;
`open(): void` - открывает модальное окно;
`close(): void` - закрывает модальное окно;
`render(data: IModalData): HTMLElement` - отображает модальное окно с переданным содержимым.

#### Интерфейс IModalData

Описывает структуру данных для модального окна.

Поля интерфейса:
`content: HTMLElement` - HTML-элемент с содержимым для отображения в модальном окне.

#### Класс ProductCatalogView

Реализует отображение каталога товаров на странице. Наследуется от `Component<{ items: HTMLElement[] }>`.

Конструктор:
`constructor(container: HTMLElement)` - принимает DOM-элемент контейнера каталога.

Поля класса:
`_catalog: HTMLElement` - контейнер для отображения карточек товаров.

Методы класса:
`set items(items: HTMLElement[]): void` - устанавливает карточки товаров в каталог.

#### Класс SelectedProductCardView

Реализует отображение полной карточки товара с подробным описанием. Наследуется от `ProductCardBaseView`.

Конструктор:
`constructor(container: HTMLElement, actions?: IProductCardActions)` - принимает DOM-элемент контейнера карточки и опциональный объект с обработчиками событий.

Поля класса:
`_image: HTMLImageElement` - элемент изображения товара;
`_description: HTMLElement` - элемент описания товара;
`_category: HTMLElement` - элемент категории товара;
`_button: HTMLButtonElement | null` - кнопка для добавления товара в корзину.

Методы класса:
`set image(value: string): void` - устанавливает URL изображения товара;
`set description(value: string): void` - устанавливает текст описания товара;
`set category(value: keyof typeof categoryMap): void` - устанавливает категорию товара и соответствующий CSS-класс;
`set buttonText(value: string): void` - устанавливает текст кнопки.

#### Класс BasketInHeaderView

Реализует отображение иконки корзины и счетчика товаров в шапке сайта. Наследуется от `Component<{ counter: number }>`.

Конструктор:
`constructor(container: HTMLElement, actions: { onClick: () => void })` - принимает DOM-элемент контейнера и объект с обработчиком клика.

Поля класса:
`_button: HTMLButtonElement` - кнопка корзины;
`_counter: HTMLElement` - элемент счетчика товаров.

Методы класса:
`set counter(value: number): void` - устанавливает количество товаров в корзине.

#### Класс BasketView

Реализует отображение содержимого корзины. Наследуется от `Component<{ products: HTMLElement[]; basketPrice: number }>`.

Конструктор:
`constructor(container: HTMLElement, actions: { onClick: () => void })` - принимает DOM-элемент контейнера и объект с обработчиком клика на кнопку оформления заказа.

Поля класса:
`_list: HTMLElement` - список товаров в корзине;
`_price: HTMLElement` - элемент общей стоимости товаров;
`_button: HTMLButtonElement` - кнопка оформления заказа.

Методы класса:
`set products(products: HTMLElement[]): void` - устанавливает список товаров в корзине;
`set basketPrice(price: number): void` - устанавливает общую стоимость товаров в корзине.

#### Класс ProductInBasketCardView

Реализует отображение карточки товара в корзине. Наследуется от `Component<{ title: string; price: number | null; index: number }>`.

Конструктор:
`constructor(container: HTMLElement, actions: { onClick: () => void })` - принимает DOM-элемент контейнера и объект с обработчиком клика на кнопку удаления товара.

Поля класса:
`_index: HTMLElement` - элемент порядкового номера товара;
`_title: HTMLElement` - элемент названия товара;
`_price: HTMLElement` - элемент цены товара;
`_button: HTMLButtonElement` - кнопка удаления товара из корзины.

Методы класса:
`set index(value: number): void` - устанавливает порядковый номер товара;
`set title(value: string): void` - устанавливает название товара;
`set price(value: number | null): void` - устанавливает цену товара.

#### Класс FormView

Базовый класс для всех форм приложения. Наследуется от `Component<{ errors: string[]; isComplete: boolean }>`.

Конструктор:
`constructor(container: HTMLElement)` - принимает DOM-элемент контейнера формы.

Поля класса:
`_form: HTMLFormElement` - элемент формы;
`_submit: HTMLButtonElement` - кнопка отправки формы;
`_errors: HTMLElement` - элемент для отображения ошибок валидации.

Методы класса:
`set errors(errors: string[]): void` - устанавливает список ошибок валидации;
`set isComplete(value: boolean): void` - устанавливает доступность кнопки отправки формы.

#### Класс OrderFormView

Реализует отображение формы выбора способа оплаты и ввода адреса доставки. Наследуется от `FormView`.

Конструктор:
`constructor(container: HTMLElement, actions: IOrderFormActions)` - принимает DOM-элемент контейнера формы и объект с обработчиками событий.

Поля класса:
`_buttonCard: HTMLButtonElement` - кнопка выбора оплаты онлайн;
`_buttonCash: HTMLButtonElement` - кнопка выбора оплаты при получении;
`_addressInput: HTMLInputElement` - поле ввода адреса доставки.

Методы класса:
`set payment(value: TPayment): void` - устанавливает выбранный способ оплаты и обновляет визуальное состояние кнопок.

#### Интерфейс IOrderFormActions

Описывает структуру обработчиков событий для формы заказа.

Поля интерфейса:
`onSubmit: () => void` - обработчик отправки формы;
`setPayment: (payment: TPayment) => void` - обработчик выбора способа оплаты;
`setAddress: (address: string) => void` - обработчик изменения адреса доставки.

#### Класс ContactFormView

Реализует отображение формы ввода контактных данных (email и телефон). Наследуется от `FormView`.

Конструктор:
`constructor(container: HTMLElement, actions: IContactFormActions)` - принимает DOM-элемент контейнера формы и объект с обработчиками событий.

Поля класса:
`_emailInput: HTMLInputElement` - поле ввода email;
`_phoneInput: HTMLInputElement` - поле ввода телефона.

#### Интерфейс IContactFormActions

Описывает структуру обработчиков событий для формы контактов.

Поля интерфейса:
`onSubmit: () => void` - обработчик отправки формы;
`setEmail: (email: string) => void` - обработчик изменения email;
`setPhone: (phone: string) => void` - обработчик изменения телефона.

#### Класс OrderSuccessView

Реализует отображение экрана успешного оформления заказа. Наследуется от `Component<{ total: number }>`.

Конструктор:
`constructor(container: HTMLElement, actions: { onClick: () => void })` - принимает DOM-элемент контейнера и объект с обработчиком клика на кнопку закрытия.

Поля класса:
`_description: HTMLElement` - элемент с описанием списанной суммы;
`_button: HTMLButtonElement` - кнопка закрытия окна.

Методы класса:
`set total(value: number): void` - устанавливает общую стоимость заказа.
