import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';

/**
 * `contact-form`
 * contact form for web s[3~[Cite
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
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
      </style>
      <paper-card>
      <section>
      <h1>Замовлення</h1>
      Оплата: <paper-radio-group selected="small">
        <paper-radio-button name="small">Онлайн</paper-radio-button>
        <paper-radio-button name="medium">Накладним платежем</paper-radio-button>
      </paper-radio-group>
      
      <paper-input id="nameInput" label="Прізвище, ім'я, по батькові" required error-message="Заповніть, будь ласка, це поле"></paper-input>
      <paper-input id="phoneInput" label="Номер телефону" pattern="^\\d{7}(?:\\d{2})?$" required><span slot="prefix">+380 &nbsp;</span></paper-input>
      <paper-input id="addressInput" label="Місто" required></paper-input>
      <paper-input id="newPostDepartmentNumberInput" label="Номер відділення Нової Пошти" required><span slot="prefix" required>№ &nbsp;</paper-input>
            <paper-button raised on-click="_validate">ПРОДОВЖИТИ</paper-button>
      </section>
      </paper-card>

    `;
  }
    constructor() {
        super();
    }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'contact-form',
      },
    };
  }

    _validate() {
    this.$.nameInput.validate();
    this.$.phoneInput.validate();
    this.$.addressInput.validate();
    this.$.newPostDepartmentNumberInput.validate();

    console.log('asdqwezxcasdqwe', this.$.phoneInput.inputElement.querySelector('input').validity);
    }
}

window.customElements.define('contact-form', ContactForm);
