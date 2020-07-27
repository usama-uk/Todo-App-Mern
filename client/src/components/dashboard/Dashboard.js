import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {

  state = {
    newItem: '',
    list: []
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  addItem() {
    // create new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy of current list of items
    const list = [...this.state.list];

    // add new item to list
    list.push(newItem);

    // update state with new list and reset newItem input
    this.setState({
      list,
      newItem: ''
    });
  }

  deleteItem(id) {
    // copy of current list of items
    const list = [...this.state.list];

    // filter out item to be deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({
      list: updatedList
    });
  }

  updateInput(key, value) {
    // update react state
    this.setState({
      [key]: value
    });
  }

  render() {

    const { user } = this.props.auth;
    // console.log(user);

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            {/* <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4> */}
            <h1>To Do...</h1>
            <br />
            <input
              type='text'
              placeholder='Enter To-Do item here...'
              value={this.state.newItem}
              onChange={event => this.updateInput('newItem', event.target.value)}
            />
            <button onClick={() => this.addItem()}>Add</button>
            <br />
            <ul>
              {this.state.list.map(item => {
                return (
                  <div key={item.id} className='todo-item'>
                    <li>
                      {item.value}
                      <button
                        className='delete-button'
                        onClick={() => this.deleteItem(item.id)}>Delete
                    </button>
                    </li>
                  </div>
                );
              })}
            </ul>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>


      // <div className='todo'>
      //   <h1>To Do...</h1>
      //   <br />
      //   <input
      //     type='text'
      //     placeholder='Enter To-Do item here...'
      //     value={this.state.newItem}
      //     onChange={event => this.updateInput('newItem', event.target.value)}
      //   />
      //   <button onClick={() => this.addItem()}>Add</button>
      //   <br />
      //   <ul>
      //     {this.state.list.map(item => {
      //       return (
      //         <div key={item.id} className='todo-item'>
      //           <li>
      //             {item.value}
      //             <button
      //               className='delete-button'
      //               onClick={() => this.deleteItem(item.id)}>Delete
      //               </button>
      //           </li>
      //         </div>
      //       );
      //     })}
      //   </ul>
      // </div>
    );
  };
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);