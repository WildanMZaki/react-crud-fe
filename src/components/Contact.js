import React, { Component } from 'react';

class Contact extends Component {
    onDelete = () => this.props.onDelete(this.props.contact.id);
    onEdit = () => this.props.onEdit(this.props.contact);

    render() {
      const { name, email, telephone_number } = this.props.contact;
      const index = this.props.index;
      return(
        <tr>
          <td>{ index+1 }</td>
          <td>{ name }</td>
          <td><a href={`mailto:${email}`}>{ email }</a></td>
          <td><a href={`https://wa.me/${telephone_number}`}>{ telephone_number }</a></td>
          <td className='d-flex justify-content-center'>
            <button type="button" className='badge bg-secondary mx-2' onClick={this.onEdit}>Edit</button>  
            <button type="button" className='badge bg-danger mx-2' onClick={this.onDelete}>Hapus</button>  
          </td>
        </tr>
      );
    }
}

export default Contact;