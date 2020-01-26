import React from 'react'
import { Link } from 'gatsby'
import Modal from 'react-modal';
import ProjectForm from '../../components/Project/ProjectForm'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '900px', // <-- This sets the height
    overflow: 'scroll', // <-- This tells the modal to scroll
    width: '800px'
  }
};
const Navi = (props) => {
  const { store } = props;
  var subtitle;
  const { location, title } = props
  const pathname = props.path;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }
  
  return (
    <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary">
      <div className="container">
        <div class="w-50 input-group">
          <input
            class=" form-control py-2 border-right-0 border"
            type="search"
            placeholder="Search for project, countries, donors..."
          />
          <div class="input-group-append">
            <div class="input-group-text" id="btnGroupAddon2">
              <i class="fa fa-search"></i>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse flex-grow-1 text-right">
          <ul className="navbar-nav ml-auto flex-nowrap">
            <li
              className={
                pathname === '/' ? 'nav-item active' : 'nav-item'
              }
            >
              <Link to="/" className="nav-link">
                Projects
              </Link>
            </li>
            <li
              className={
                pathname === '/profile/'
                  ? 'nav-item active'
                  : 'nav-item'
              }
            >
              <Link to="/profile/" className="nav-link">
                Tasks
              </Link>
            </li>
            <li
              className={
                pathname === '/profile/'
                  ? 'nav-item active'
                  : 'nav-item'
              }
            >
              <Link to="/profile/" className="nav-link">
                Settings
              </Link>
            </li>
            {(store.isLoggedIn ? 
            <li
              className={
                pathname === '/profile/'
                  ? 'nav-item active'
                  : 'nav-item'
              }
            >
                <a className="nav-link" onClick={openModal}>Create </a>
              
            </li> : <Link to="/app/login" className="nav-link">
                Log in
              </Link>)}
          </ul>
        </div>
        <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
         */}
         <ProjectForm />
      </Modal>
    </nav>
  )

}

export default Navi
