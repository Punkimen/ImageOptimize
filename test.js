const crypto = require('crypto');

function generateSignature({ MerchantLogin, OutSum, InvId, Receipt, Password1 }) {
  // Преобразуем объект Receipt в строку без пробелов
  const receiptString = JSON.stringify(Receipt);
  const encodedReceipt = "%7B%22sno%22%3A%22osn%22%2C%22items%22%3A%5B%7B%22name%22%3A%22%D0%A1%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%22%2C%22quantity%22%3A1%2C%22sum%22%3A%2211.00%22%2C%22payment_method%22%3A%22full_payment%22%2C%22payment_object%22%3A%22service%22%2C%22tax%22%3A%22none%22%7D%5D%7D";

  // Формируем строку для подписи
  const signatureString = `${MerchantLogin}:${OutSum}:${InvId}:${receiptString}:${Password1}`;

  // Генерируем MD5-хеш
  return crypto.createHash('md5').update(signatureString).digest('hex');
}

const Receipt = {
  "sno": "osn",
  "items": [
    {
      "name": "Стандарт",
      "quantity": 1,
      "sum": 11,
      "payment_method": "full_payment",
      "payment_object": "service",
      "tax": "none"
    }
  ]
}

// Пример использования
const signature = generateSignature({
  MerchantLogin: 'edutainmentp25',
  InvId: 150,
  OutSum: '11.00',
  Receipt,
  Password1: "Ww1hDKra8j92sQB0bBpN"
});

console.log("SignatureValue:", signature);