import React, { useState } from "react";
import { LOGIN } from "../../api/apiService";
import { useNavigate } from "react-router-dom";

const SectionContent = () => {
    return (
        <section className="section-content padding-y">
            {/* ============================ COMPONENT REGISTER ================================= */}
            <div className="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
                <article className="card-body">
                    <header className="mb-4">
                        <h4 className="card-title">Sign up</h4>
                    </header>
                    <form>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="" />
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label className="custom-control custom-radio custom-control-inline">
                                <input className="custom-control-input" type="radio" name="gender" value="option1" defaultChecked />
                                <span className="custom-control-label"> Male </span>
                            </label>
                            <label className="custom-control custom-radio custom-control-inline">
                                <input className="custom-control-input" type="radio" name="gender" value="option2" />
                                <span className="custom-control-label"> Female </span>
                            </label>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>City</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Country</label>
                                <select id="inputState" className="form-control">
                                    <option> Choose...</option>
                                    <option>Uzbekistan</option>
                                    <option>Russia</option>
                                    <option defaultValue="selected">United States</option>
                                    <option>India</option>
                                    <option>Afghanistan</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Create password</label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Repeat password</label>
                                <input className="form-control" type="password" />
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Register </button>
                        </div>

                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" defaultChecked />
                                <div className="custom-control-label"> I agree with <a href="#">terms and conditions</a> </div>
                            </label>
                        </div>
                    </form>
                </article>
            </div>

            <p className="text-center mt-4">Have an account? <a href="#">Log In</a></p>
            <br /><br />
            {/* ============================ COMPONENT REGISTER END ================================= */}
        </section>
    );
};

export default SectionContent;
