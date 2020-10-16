import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ContactForm extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          max-width: 600px;
          margin: 0 auto;
          display: block;
        }
        section {
        margin: 2em;
        }
        paper-button {
        display: flex;
        margin-top: 1em;
        }
        paper-spinner {
        display: flex;
        margin: 0 auto;
        }
        paper-card {
         width: 100%;
        }   
        p {
        margin-left: 1em;
        }     
      </style>
      <paper-card>
      <section hidden="[[hideForm]]">
      <h1>Замовлення</h1>
      Оплата: <paper-radio-group id="paymentType" selected="Online">
        <paper-radio-button name="Online" disabled="[[loading]]">Онлайн</paper-radio-button>
        <paper-radio-button name="CashOnDelivery"  disabled="[[loading]]">Накладним платежем</paper-radio-button>
      </paper-radio-group>
      
      <paper-input id="fullName" label="Прізвище, ім'я, по батькові" required error-message="Заповніть, будь ласка, це поле" disabled="[[loading]]"></paper-input>
      <paper-input id="phoneNumber" label="Номер телефону" pattern="^\\d{9}?$" required error-message="Заповніть, будь ласка, це поле" disabled="[[loading]]"><span slot="prefix">+380 &nbsp;</span></paper-input>
      <paper-input id="userEmail" type="email" label="E-mail" required error-message="Заповніть, будь ласка, це поле" disabled="[[loading]]"></paper-input>
      <paper-input id="address" label="Місто" required error-message="Заповніть, будь ласка, це поле" disabled="[[loading]]"></paper-input>
      <paper-input id="newPostDepartmentNumber" label="Номер відділення Нової Пошти" required error-message="Заповніть, будь ласка, це поле" disabled="[[loading]]"><span slot="prefix" required>№ &nbsp;</paper-input>
      <paper-textarea id="comment" label="Коментар" disabled="[[loading]]"></paper-textarea>
            <template is="dom-if" if="[[!loading]]"> 
                 <paper-button raised on-click="_validate">ПРОДОВЖИТИ</paper-button>
            </template>

      <template is="dom-if" if="[[loading]]">
        <paper-spinner active></paper-spinner>
       </template>

      </section>
      <p hidden="[[!showMessage]]">Ваше замовлення прийнято. Невдовзі з вами звяжуться.  <a href="/">Повернутись</a></p>
      </paper-card>
      <iron-ajax method="POST" url="https://three-sides.com/order-book" handle-as="json" content-type="application/json" on-response="_handleResponse" on-error="_handleError"></iron-ajax>
    `;
  }

    static get properties () {
        return {
            loading: {
                type: Boolean,
                value: false,
            },
            hideForm: {
                type: Boolean,
                value: false,
            },
            showMessage: {
              type: Boolean,
                value: false
            }
        };
    }
    _validate () {
      let validInputs = 0;
      const inputs = this.shadowRoot.querySelectorAll('paper-input');
      const comment = this.shadowRoot.querySelector('paper-textarea');

      inputs.values()
      inputs.forEach(input => {
        input.validate();
        if (input.inputElement.querySelector('input').validity.valid) {
            validInputs++;
        }
      });
      const isValid = inputs.length === validInputs;
      const ajax = this.shadowRoot.querySelector('iron-ajax');
      let ajaxParams = {};

      if (isValid) {
          inputs.forEach(input => {
              ajaxParams[input.id] = input.value;
          });
          ajaxParams[comment.id] = comment.value;
          ajaxParams.paymentType = this.$.paymentType.selected;
          ajax.params = ajaxParams;
          this.loading = true;
          ajax.generateRequest();
      }
    }

    _handleResponse () {
    this.hideForm = true;
        const isOnlinePayment = this.$.paymentType.selected === 'Online';
        if (isOnlinePayment) {
          window.location = 'https://secure.wayforpay.com/button/b0920bb075de9';
        } else {
          this.showMessage = true;
        }
        this.loading = false;

    }

    _handleError () {
        this.loading = false;
    }
}


window.customElements.define('contact-form', ContactForm);
