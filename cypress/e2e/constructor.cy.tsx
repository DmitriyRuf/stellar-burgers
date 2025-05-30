import { setCookie, deleteCookie } from '../../src/utils/cookie';
import token from '../fixtures/token.json';
import addOrder from '../fixtures/addOrder.json';
import ingredients from '../fixtures/ingredients.json';

describe('Интеграционные тесты на Cypress для страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );

    cy.wait('@getIngredients');

    cy.intercept('GET', 'api/orders/all', { fixture: 'orders' }).as(
      'getOrders'
    );

    cy.wait('@getOrders');

    cy.get(`[data-cy-id=${'643d69a5c3f7b9001cfa093c'}]`).as('bun');
    cy.get(`[data-cy-id=${'643d69a5c3f7b9001cfa0941'}]`).as('main');
    cy.get(`[data-cy-id=${'643d69a5c3f7b9001cfa0943'}]`).as('sauce');
  });

  describe('Работа конструктора', () => {
    it('Проверка ингридиентов в конструкторе', () => {
      cy.get('[data-cy-type=bun]').should('exist');
      cy.get('[data-cy-type=main]').should('exist');
      cy.get('[data-cy-type=sauce]').should('exist');
    });

    it('Добавление ингредиента из списка в конструктор', () => {
      cy.get('[data-cy-item=noBunTop]').contains('Выберите булки');
      cy.get('[data-cy-item=noBunBottom]').contains('Выберите булки');
      cy.get('@bun').find('button').click();

      cy.get('[data-cy-item=addBunTop]')
        .find('div')
        .contains('Краторная булка N-200i (верх)')
        .should('exist');

      cy.get('[data-cy-item=addBunBottom]')
        .find('div')
        .contains('Краторная булка N-200i (низ)')
        .should('exist');

      cy.get('[data-cy-item=noItem]').contains('Выберите начинку');
      cy.get('@main').find('button').click();
      cy.get(`[data-cy-item=${'643d69a5c3f7b9001cfa0941'}]`).should('exist');
      cy.get('@sauce').find('button').click();
      cy.get(`[data-cy-item=${'643d69a5c3f7b9001cfa0943'}]`).should('exist');
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.get('@bun').click();
      cy.get('[data-cy-item=modalWindow]').as('modalWindow').should('exist');
      cy.get('@modalWindow').find('h3').contains('Краторная булка N-200i');
    });

    it('Открытие модального окна ингредиента с обновлением', () => {
      cy.get('@bun').click();
      cy.reload(true);
      cy.get('[data-cy-item=modalWindow]').as('modalWindow').should('exist');
      cy.get('@modalWindow').find('h3').contains('Краторная булка N-200i');
    });

    it('закрытие по клику на крестик', () => {
      cy.get('@bun').click();
      cy.get('[data-cy-item=modalWindow]').as('modalWindow').should('exist');
      cy.get('@modalWindow').find('button').click();
      cy.get('@modalWindow').should('not.exist');
    });

    it('закрытие по клику на оверлей', () => {
      cy.get('@main').click();
      cy.get('[data-cy-item=modalWindow]').as('modalWindow').should('exist');
      cy.get('[data-cy-item=overlay]').click({ force: true });
      cy.get('@modalWindow').should('not.exist');
    });

    it('закрытие по нажатию Escape', () => {
      cy.get('@sauce').click();
      cy.get('[data-cy-item=modalWindow]').as('modalWindow').should('exist');
      cy.get('body').type('{esc}');
      cy.get('@modalWindow').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.visit('/');
      //Моковые токены авторизации
      setCookie('accessToken', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);
      //Моковые данные ответа на запрос данных пользователя
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );

      cy.wait('@getUser');

      //Моковые данные ответа на запрос создания заказа
      cy.intercept('POST', 'api/orders', { fixture: 'addOrder.json' }).as(
        'getOrder'
      );
    });
    afterEach(() => {
      //Очищаем токены авторизации
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });

    it('Конструктор заказа', () => {
      //Собираем бургер
      cy.get('[data-cy-item=orderButton]').as('orderButton');
      cy.get('@orderButton').should('be.disabled');
      cy.get('@bun').find('button').click();
      cy.get('@orderButton').should('be.disabled');
      cy.get('@main').find('button').click();
      cy.get('@sauce').find('button').click();
      cy.get('@orderButton').should('be.enabled');
      //Вызываем клик по кнопке «Оформить заказ»
      cy.get('@orderButton').click();
      cy.wait('@getOrder');
      //Проверяем, что модальное окно открылось и номер заказа верный
      cy.get('[data-cy-item=modalWindow]').as('modalWindow');
      cy.get('@modalWindow').should('exist');
      cy.get('@modalWindow').find('h2').contains(addOrder.order.number);
      //Закрываем модальное окно и проверяем успешность закрытия
      cy.get('@modalWindow').find('button').click();
      cy.get('@modalWindow').should('not.exist');
      //Проверяем, что конструктор пуст
      cy.get('@orderButton').should('be.disabled');
      cy.get('[data-cy-item=noBunTop]').as('noBunTop').should('exist');
      cy.get('@noBunTop').contains('Выберите булки');
      cy.get('[data-cy-item=noBunBottom]').as('noBunBottom').should('exist');
      cy.get('@noBunBottom').contains('Выберите булки');
      cy.get('[data-cy-item=noItem]').as('noItem').should('exist');
      cy.get('@noItem').contains('Выберите начинку');
    });
  });
});
