import { Injectable } from '@angular/core';

// adding global namespace for Google Payments window.google
declare global {
  interface Window { google: any; }
}

@Injectable()
export class GooglePayService {
  baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
  };
  allowedCardNetworks = ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'];
  allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
  tokenizationSpecification = {
    'type': 'DIRECT',
    'parameters': {
      'protocolVersion': 'ECv1',
      'publicKey': 'BOdoXP1aiNp.....kh3JUhiSZKHYF2Y='
    }
  };
  baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: this.allowedCardAuthMethods,
      allowedCardNetworks: this.allowedCardNetworks
    }
  };
  cardPaymentMethod = Object.assign(
    {},
    this.baseCardPaymentMethod,
    { tokenizationSpecification: this.tokenizationSpecification }
  );
  paymentsClient = null;

  constructor() {
    this.doesGoogleExist();
  }

  doesGoogleExist() {
    if (window.google) {
      this.onGooglePayLoaded();
    } else {
      setTimeout(() => {
        this.doesGoogleExist();
      }, 500);
    }
  }

  onGooglePayLoaded() {
    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.isReadyToPay(this.getGoogleIsReadyToPayRequest())
    .then(function(response) {
      console.log('onGooglePayloaded', response);
    })
    .catch(function(err) {
      console.error('onGooglePayloaded', err);
    });
  }

  getGooglePaymentsClient() {
    if ( this.paymentsClient === null ) {
      this.paymentsClient = new window.google.payments.api.PaymentsClient({environment: 'TEST'});
    }
    return this.paymentsClient;
  }

  getGoogleIsReadyToPayRequest() {
    return Object.assign(
      {},
      this.baseRequest,
      { allowedPaymentMethods: [this.baseCardPaymentMethod] }
    );
  }

  onGooglePaymentButtonClicked(amount) {
    const paymentDataRequest = this.getGooglePaymentDataRequest(amount);
    paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo(amount);
    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
    .then(function(paymentData) {
      console.log('onGooglePaymentButtonClicked', paymentData);
      this.processPayment(paymentData);
    })
    .catch(function(err) {
      console.error('onGooglePaymentButtonClicked', err);
    });
  }

  getGooglePaymentDataRequest(amount) {
    let paymentDataRequest: any = Object.assign({}, this.baseRequest);
    paymentDataRequest.allowedPaymentMethods = [this.cardPaymentMethod];
    paymentDataRequest.merchantInfo = {
      // @todo a merchant ID is available for a production environment after approval by Google
      // merchantId: '01234567890123456789',
      merchantName: '123-Lottery'
    };
    return paymentDataRequest;
  }

  getGoogleTransactionInfo(amount) {
    return {
      currencyCode: 'USD',
      totalPriceStatus: 'FINAL',
      totalPrice: amount.toString()
    };
  }

  // Process payment data returned by the Google Pay API
  processPayment(paymentData) {
    console.log(paymentData);
  }
}
