# Sending email

```py
import smtplib

message = """From: From Person <from@fromdomain.com>
To: To Person <to@todomain.com>
MIME-Version: 1.0
Content-type: text/html
Subject: SMTP HTML e-mail test

This is an e-mail message to be sent in HTML format

<b>This is HTML message.</b>
<h1>This is headline.</h1>
"""

try:
   smtp = smtplib.SMTP('localhost')
   smtp.sendmail(sender, receivers, message)
   print("Successfully sent email")
except SMTPException:
   print("Error: unable to send email")
```

```py
import smtplib
from string import Template
from email.message import EmailMessage
from email.headerregistry import Address

# prepare message content from email template
with open('message.txt', 'r', encoding='utf-8') as template_file:
    template_file_content = template_file.read()
    message_template = Template(template_file_content)
    message = message_template.substitute(PERSON_NAME=name.title())

# setup the parameters of the message
msg = MIMEMultipart()
msg['From'] = 'fromemail@example.com'
msg['To'] = 'toemail@example.com'
msg['Subject']="This is TEST"
msg.set_content(message, subtype='html')

# send the email using smtp protocol
smtp = smtplib.SMTP(host='your_host_address_here', port=your_port_here)
smtp.starttls()
smtp.login('my_address@example.com', 'mypassword')
smtp.send_message(msg)
smtp.quit()
```