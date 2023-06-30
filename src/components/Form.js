import React, { Component } from 'react';

class Form extends Component {
    state = {
      form: {
        name: '', email: '', telephone_number: '', isEdit: false
      },
      btnName: 'Tambahkan',
      btnClass: 'btn btn-primary',
      errorInputName: '',
      errorInputEmail: '',
      errorInputTelephoneNumber: '',
    }

    isEmpety(obj) {
      return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
      if (prevProps !== this.props && !this.isEmpety(this.props.contact)) {
        // When true, update condition is activated
        this.setState({
          form: {...this.props.contact, isEdit: true},
          btnName: 'Perbarui',
          btnClass: 'btn btn-warning'
        });
      }
    }    

    handleChange = event => {
      const {name, value} = event.target;
      let form = this.state.form;
      form[name] = value;
      this.setState({ form });
    }

    onFormSubmit = event => {
      // Prevent Reload
      event.preventDefault();

      // Do form validation
      if (this.formValidation()) {        
        this.props.onFormSubmit(this.state.form);
        this.resetForm();
      }      
    }

    formValidation = () => {
      const nameInp = document.getElementById('nameInp');
      const emailInp = document.getElementById('emailInp');
      const telephoneNumberInp = document.getElementById('telephoneNumberInp');

      if (nameInp.value === '') {
        nameInp.classList.add('is-invalid');
        this.setState({errorInputName: 'Tolong sertakan nama'});
        return false;
      } else {
        nameInp.classList.remove('is-invalid')
      }
      
      if (emailInp.value === '') {
        emailInp.classList.add('is-invalid');
        this.setState({errorInputEmail: 'Tolong sertakan email'});
        return false;
      } else {
        emailInp.classList.remove('is-invalid');
      }
      
      if (telephoneNumberInp.value === '') {
        telephoneNumberInp.classList.add('is-invalid');
        this.setState({errorInputTelephoneNumber: 'Tolong sertakan nomor telepon'});
        return false;
      } else {
        telephoneNumberInp.classList.remove('is-invalid');
      }      

      return true;
    }

    resetForm = () => {
      this.setState({
        form: {
          name: '', email: '', telephone_number: '', isEdit: false
        },
        btnName: 'Tambahkan',
        btnClass: 'btn btn-primary'
      });

      document.querySelector('#contactForm').reset();
    }

    render() {
        return (
            <div>
              <h1>Tambahkan Kontak</h1>
              <form action='' method='post' id='contactForm'>
                <div className='row'>
                  <div className='col-lg-3'>
                    <label htmlFor='nameInp' className='form-label'>Nama</label>
                    <input type='text' name='name' id='nameInp' placeholder='Nama Kontak' className='form-control' value={this.state.form.name} onChange={this.handleChange} required />
                    <div id="invalidNameMsg" className="invalid-feedback">
                      {this.state.errorInputName}
                    </div>
                  </div>
                  <div className='col-lg-3'>
                    <label htmlFor='emailInp' className='form-label'>Email</label>
                    <input type='email' name='email' id='emailInp' placeholder='Tuliskan Email' className='form-control' value={this.state.form.email} onChange={this.handleChange} required />
                    <div id="invalidEmailMsg" className="invalid-feedback">
                      {this.state.errorInputEmail}
                    </div>
                  </div>
                  <div className='col-lg-3'>
                    <label htmlFor='telephoneNumberInp' className='form-label'>No. Telepon</label>
                    <input type='number' name='telephone_number' id='telephoneNumberInp' placeholder='Contoh: 621234567890' className='form-control' value={this.state.form.telephone_number} onChange={this.handleChange} required />
                    <div id="invalidTelephoneNumerMsg" className="invalid-feedback">
                      {this.state.errorInputTelephoneNumber}
                    </div>
                  </div>
                  <div className='col-lg-3 d-flex align-items-end my-lg-0 my-3'>
                    <button type="submit" className={this.state.btnClass} onClick={this.onFormSubmit}>
                      {this.state.btnName}
                    </button>
                  </div>
                </div>                
              </form>
            </div>
        );
    }
}

export default Form;