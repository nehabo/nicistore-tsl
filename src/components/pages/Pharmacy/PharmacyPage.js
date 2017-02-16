import React from 'react';

class Pharmacy extends React.Component {
  render() {
    return (
      <div id="page-content">
        <div className="parallax">
          <h2 className="pull-right" id="pharmacy-heading">
            <p>Now get medicines delivered to your door step.<br />
              <span style={{ color: '#337ab7' }}>At most affordable cost. Same day delivery.</span>
              <br /><br />
            </p>
            <button href="contact.html#" className="btn btn-primary btn-small btn-rounded icon shadow add-listing center-block" style={{ width: '20em' }}>
              <i className="fa fa-file-text"></i><span>Upload Prescription</span>
            </button>
          </h2>
        </div>
      </div>
    );
  }
}

export default Pharmacy;
