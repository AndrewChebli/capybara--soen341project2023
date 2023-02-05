import React from 'react';

function Heading() {
      return(
 <nav class="navbar navbar-expand-lg bg-danger">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">InsertLogoHere</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Option 1</a>
            </li> 
            <li class="nav-item">
              <a class="nav-link" href="#">Option 2 </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" >
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <button type="button" class="btn btn-primary btn-">Connect</button>
                </a>
                <ul class="dropdown-menu" list-style ="none">
                  <li><a class="dropdown-item" href="#">Login</a></li>
                  <li><a class="dropdown-item" href="#">Sign-up</a></li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
          );
}


export default Heading;