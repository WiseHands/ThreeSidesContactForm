import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';

class ContactForm extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        section {
        margin: 2em;
        }
        paper-button {
        display: flex;
        }
      </style>
      <paper-card>
      <section>
      <h1>Замовлення</h1>
      Оплата: <paper-radio-group id="paymentType" selected="Online">
        <paper-radio-button name="Online">Онлайн</paper-radio-button>
        <paper-radio-button name="CashOnDelivery">Накладним платежем</paper-radio-button>
      </paper-radio-group>
      
      <paper-input id="nameInput" label="Прізвище, ім'я, по батькові" required error-message="Заповніть, будь ласка, це поле"></paper-input>
      <paper-input id="phoneInput" label="Номер телефону" pattern="^\\d{7}?$" required><span slot="prefix">+380 &nbsp;</span></paper-input>
      <paper-input id="addressInput" label="Місто" required></paper-input>
      <paper-input id="newPostDepartmentNumberInput" label="Номер відділення Нової Пошти" required><span slot="prefix" required>№ &nbsp;</paper-input>
            <paper-button raised on-click="_validate">ПРОДОВЖИТИ</paper-button>
      </section>
      </paper-card>

    `;
  }
    _validate () {
    let validInputs = 0;
    const inputs = this.shadowRoot.querySelectorAll('paper-input');
    inputs.forEach((input) => {
      input.validate();
      if (input.inputElement.querySelector('input').validity.valid) {
          validInputs++;
      }
    });

    let isValid = inputs.length === validInputs;
    }
}

window.customElements.define('contact-form', ContactForm);