# Ant Design Form

Don't show error while typing
Only show errors on submitting or field is blured

## Simple login form

```jsx
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
```


## Horizontal form

- [x] validate on blur
- [x] validate on submit
- [x] server validation
- [x] custom validation

```jsx
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Form, Input, Tooltip, Icon, Select, Checkbox, Button,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log('Client validation error: ', err);
        return;
      }

      // server validation
      setTimeout(() => {
        if (values.email === 'a@m.mm') {
          form.setFields({
            email: {
              value: values.email,
              errors: [Error('email already exists')],
            },
          });
        }
      }, 1000);
    });
  }

  validatePassword = (rule, value, callback) => {
    const { form } = this.props;
    if (form.isFieldTouched('confirm')) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  validateConfirmPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          hasFeedback
          label={(
            <span>
              Email&nbsp;
              <Tooltip title="Try to input 'a@m.mm'">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ],
            validateTrigger: 'onBlur',
          })(
            <Input />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validatePassword,
            }],
          })(
            <Input type="password" />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: 'Please confirm your password!' },
              { validator: this.validateConfirmPassword },
            ],
          })(
            <Input type="password" />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Phone Number"
          hasFeedback
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />,
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            rules: [{ required: true, message: 'You have to agree with the term & condition' }],
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the
              {' '}
              <a href="">agreement</a>
            </Checkbox>,
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
```