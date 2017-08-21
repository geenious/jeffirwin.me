require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/sendemail', (req, res) => {

  const contents = 'Name: ' + req.body.name + '\n' + 'Message: ' + req.body.message;

  var helper = require('sendgrid').mail;
  var from_email = new helper.Email(req.body.email);
  var to_email = new helper.Email(process.env.EMAIL);
  var subject = 'From Portfolio Website';
  var content = new helper.Content('text/plain', contents);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
  res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
