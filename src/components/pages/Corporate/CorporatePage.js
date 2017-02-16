/**
 * Imports
 */
import React from 'react';

class Corporate extends React.Component {
  render() {
    return (
      <div id="page-content">
        <div className="container"></div>
        <div
          className="parallax1"
          
        />
        <div style={{ backgroundColor: '#e02e61' }}>
          <section className="block">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-3">
                  <h3>Contact Information</h3>
                  <div className="box">
                    <address>
                      <strong>Location</strong>
                      <figure>Hyderabad</figure>
                      <br />
                      <strong>Phone Number</strong>
                      <figure>+91 92-468-468-75</figure>
                      <br />
                      <strong>Email</strong>
                      <figure><a href="/contact#">contactus@thesmartlabs.com</a></figure>
                      <br />
                      <strong>Customer Care</strong>
                      <figure><a href="/contact#">support@thesmartlabs.com</a></figure>
                    </address>
                  </div>
                </div>
                <div className="col-md-9 col-sm-9">
                  <h3>Form</h3>
                  <div className="form form-email inputs-underline" style={{ color: '#fff' }} id="form-hero">
                    <Formsy.Form
                      onValidSubmit={this.handleSubmit}
                      onValid={this.enableButton}
                      onInvalid={this.disableButton}
                    >
                      <div className="row">
                        <div className="col-md-4 col-sm-4">
                          <Text
                            name="name"
                            placeholder="Name"
                            value={this.props.name}
                            validations="isWords"
                            validationError="Enter your name"
                            required
                          />
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <Text
                            name="email"
                            placeholder="Email"
                            value={this.props.email}
                            validations="isEmail"
                            validationError="Enter your email"
                          />
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <Text
                            name="subject"
                            placeholder="Subject"
                            value={this.props.subject}
                            validations="isWords"
                            validationError="Enter Subject of Message"
                          />
                        </div>
                        <Text
                          name="message"
                          placeholder="Message"
                          value={this.props.message}
                        />
                        <Button
                          type="submit"
                          style={{ color: '#fff', backgroundColor: '#337ab7', borderColor: '#337ab7' }} className="btn btn-primary icon shadow pull-right"
                        >
                          Send Message<i className="fa fa-caret-right"></i>
                        </Button>
                      </div>
                    </Formsy.Form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
 }

export default Corporate;
