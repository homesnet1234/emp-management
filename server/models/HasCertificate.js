const db = require('../db');
const moment = require('moment');

const HasCertificate = {};

HasCertificate.create = (hasCertificate, id) => (
  db.one(
    'INSERT INTO has_certificates (user_id, certificate_id, certificate_date, score, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
    [
      hasCertificate.userId,
      hasCertificate.certificateId,
      hasCertificate.certificateDate,
      hasCertificate.score,
      id,
      id
    ]
  )
);

HasCertificate.update = (hasCertificate, id) => (
  db.one(
    'UPDATE has_certificates SET certificate_id = $1, certificate_date = $2, score = $3, updated_user = $4, updated_date = $5 WHERE id = $6',
    [
      hasCertificate.certificateId,
      hasCertificate.certificateDate,
      hasCertificate.score,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      hasCertificate.id
    ]
  )
);

HasCertificate.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM has_certificates WHERE user_id = $1', [userId])
);

module.exports = HasCertificate;
