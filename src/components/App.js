import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import ContactList from './ContactList';

class App extends Component {
    // constructor() {
    //   super();
    //   this.state = {
    //     contacts: [],
    //     url: "http://localhost:8000/api/contacts"
    //   }
    // }

    state = {
      contacts: [],
      contact: {},
      loader: false,
      url: "http://localhost:8000/api/contacts",
      alertInfoClass: 'alert alert-info d-none',
      alertInfoMsg: ''
    };

    getContacts = async () => {
      this.setState({loader: true});
      const data = await axios.get(this.state.url);      
      const contacts = data.data.contacts;      
      this.setState({contacts: contacts});
    };

    createContact = async data => {
      this.setState({loader: true});
      const { name, email, telephone_number } = data;
      await axios.post(this.state.url, {
        name, email, telephone_number,
      });
      this.setState({
        alertInfoClass: 'alert alert-success', 
        alertInfoMsg: 'Kontak berhasil ditambahkan',
      });
      this.getContacts();
    };

    onDelete = id => this.deleteContact(id);
    
    deleteContact = async id => {
      this.setState({loader: true});
      await axios.delete(`${this.state.url}/${id}`);
      this.setState({
        alertInfoClass: 'alert alert-success', 
        alertInfoMsg: 'Kontak berhasil dihapus',
      });
      this.getContacts();
    };

    onEdit = contact => this.setState({contact: contact});

    editContact = async data => {
      const { id, name, email, telephone_number } = data;
      this.setState({ loader: true, contact: {} });
      await axios.put(`${this.state.url}/${id}`, {
        name, email, telephone_number,
      });
      this.setState({
        alertInfoClass: 'alert alert-success', 
        alertInfoMsg: 'Kontak berhasil diperbarui',
      });
      this.getContacts();
    }

    onFormSubmit = data => {
      if (data.isEdit) {
        this.editContact(data);
      } else {
        this.createContact(data);
      }
    };

    render() {
        return (
            <div>
              <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div className="container-fluid">
                    <a className="navbar-brand" href="./">Contacts App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="./">Home</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </header>

              <main className='container'>
                <section className='pt-4 pb-3'>                    
                  <Form contact={this.state.contact} onFormSubmit={this.onFormSubmit} />
                </section>

                <section className='pt-4'>
                  <div className={this.state.alertInfoClass} role='alert'>
                    {this.state.alertInfoMsg}
                  </div>
                  <ContactList 
                    contacts={this.state.contacts}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                  />
                </section>
              </main>
            </div>            
        );
    }

    componentDidMount() {
      this.getContacts();
    }
}

export default App;