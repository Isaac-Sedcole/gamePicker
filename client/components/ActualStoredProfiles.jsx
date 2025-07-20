import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { getAllUsers, GetSteamIdByUsername, GetOwnedGames } from '../apis/steam';
import { connect } from 'react-redux';
import { addCompareList, setShowProfiles } from '../actions/userList';
import AddPersonModal from './AddPersonModal';
import { setShowModal } from '../actions/modal';

const ActualStoredProfiles = (props) => {
  const [compareList, setCompareList] = useState([]);
  const [minProfiles, setMinProfiles] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    props.dispatch(addCompareList(compareList));
    setMinProfiles(compareList.length > 1);
  }, [compareList]);

  const loadProfiles = () => {
    getAllUsers().then(users => {
      setProfiles(users);
    });
  };

  const handleClick = () => {
    props.dispatch(setShowProfiles(!props.showProfiles));
  };

  const checkBoxHandler = (user) => {
    if (compareList.every(e => e.name !== user.name)) {
      if (user.profileLink.includes("/id/")) {
        let username = user.profileLink.split("/id/")[1].replace("/", "");
        GetSteamIdByUsername(username).then(steamIdObj => {
          GetOwnedGames(steamIdObj.response.steamid).then(allOwnedGames => {
            if (!allOwnedGames.response.games) {
              props.dispatch(setShowModal(true));
            }
          });
        });
      } else if (user.profileLink.includes("/profiles/")) {
        let id = user.profileLink.split("/profiles/")[1];
        GetOwnedGames(id).then(allOwnedGames => {
          if (!allOwnedGames.response.games) {
            props.dispatch(setShowModal(true));
          }
        });
      }
    }

    setCompareList(currentList => {
      const newArr = currentList.filter(person => person.id !== user.id);
      return newArr.length === currentList.length ? [...newArr, user] : [...newArr];
    });
  };

  return (
    <>
      <section className="profiles-section">
        <div className="profiles-header">
          <h3 className="title is-3">Stored Profiles</h3>
          <button className="button is-medium is-info is-outlined" onClick={handleClick}>
            {props.showProfiles ? 'Hide Profiles' : 'Show Profiles'}
          </button>
          {minProfiles ? (
            <Link className="button is-medium is-info is-outlined" to="/recommendedgames">
              Find games in common!
            </Link>
          ) : (
            <button className="button is-medium is-info is-outlined" disabled>
              Find games in common!
            </button>
          )}
        </div>
        {props.showProfiles && (
          <div className="profile-cards">
            {profiles.map(profile => (
              <div
                key={profile.id}
                className={`profile-card ${compareList.some(p => p.id === profile.id) ? 'selected' : ''}`}
                onClick={() => checkBoxHandler(profile)}
              >
                <p className="profile-name">{profile.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      {props.showModal && <Route path="/" component={AddPersonModal} />}
    </>
  );
};

const mapStateToProps = (globalState) => ({
  showProfiles: globalState.showProfiles,
  showModal: globalState.showModal,
});

export default connect(mapStateToProps)(ActualStoredProfiles);