import React, { Component } from 'react';
import Contact from './Contact'

class ContactList extends Component {
    onDelete = id => this.props.onDelete(id);
    onEdit = contact => this.props.onEdit(contact);

    render() {        
        const contacts = this.props.contacts;                
        return (
            <div className='data'>
              <h2>Daftar Kontak:</h2>
              <div className='row justify-content-lg-end'>
                <div className='col-lg-4'>
                  <input type="text" placeholder='Cari berdasarkan nama atau email' id='searchInp' className='form-control'/>
                </div>                
              </div>
              <table className='table table-striped table-hover text-center'>
                
                <thead>
                  <tr className='py-2'>
                    <td>No.</td>
                    <td>Nama</td>
                    <td>Email</td>
                    <td>No. Telepon</td>
                    <td>Aksi</td>
                  </tr>
                </thead>

                <tbody>
                  {         
                    contacts.map((contact, ind) => {  
                      return ( 
                        <Contact 
                          contact={contact}
                          key={contact.id}
                          index={ind}
                          onDelete={this.onDelete}
                          onEdit={this.onEdit}
                        /> );
                    })
                  }
                </tbody>

              </table>
            </div>
        );
    }
}

export default ContactList;