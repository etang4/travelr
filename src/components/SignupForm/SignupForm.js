import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import signupValidation from './signupValidation';
import * as signupActions from 'redux/modules/signup';
import Button from 'react-bootstrap/lib/Button';

function asyncValidate(data, dispatch, {isValidEmail}) {
  if (!data.email) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}
@connect(() => ({}),
  dispatch => bindActionCreators(signupActions, dispatch)
)
@reduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password', 'age', 'sex'],
  validate: signupValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class SignupForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {
      asyncValidating,
      fields: {name, email, password, age, sex},
      handleSubmit,
      } = this.props;
    const styles = require('./SignupForm.scss');
    const renderInput = (field, label, type, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <div className={'col-sm-8' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input
            type={type}
            className="form-control"
            id={field.name}
            placeholder={label}
            {...field}
          />
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name', 'text')}
          {renderInput(email, 'Email', 'email', true)}
          {renderInput(password, 'Create Password', 'password')}
          {renderInput(age, 'Age', 'number')}
          <div className="form-group">
            <div className="alignCenter">
              <input type="radio" id="sex-male" {...sex} value="male" checked={sex.value === 'male'}/>
              <label htmlFor="sex-male" className={styles.radioLabel}>Male</label>
              <input type="radio" id="sex-female" {...sex} value="female" checked={sex.value === 'female'}/>
              <label htmlFor="sex-female" className={styles.radioLabel}>Female</label>
            </div>
          </div>
          <div className="form-group">
            <div className="alignCenter">
              <Button
                bsStyle="primary"
                bsSize="large"
                block
                onClick={handleSubmit}
              >
                <i className="fa fa-pencil"/> Sign up
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
