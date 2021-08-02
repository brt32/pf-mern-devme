import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return profile.loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
        </p>
        {profile.profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.profile.experience} />
            <Education education={profile.profile.education} />

            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => dispatch(deleteAccount())}
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default Dashboard;
